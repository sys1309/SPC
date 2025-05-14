#미션: 랭체인 라이브러리 왕창~
from dotenv import load_dotenv
import os

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_chroma import Chroma

from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parser import StrOutputParser

load_dotenv()

PERSIST_DIR = './chroma_db'
COLLECTION_NAME = 'secure_coding_python'
store = None

#프롬프트 코드
template='''
당신은 문서기반으로 사용자의 질문에 답변하는 챗봇입니다.
다음 문서를 참고해서 사용자의 질문에 답변하시오.
각각의 문서는 번호와 유사도를 포함하고 있습니다. 답변을 말할때 어떤 문서를 참조했는지도 알려주시오.

문서:
{context}

질문:
{question}

답변:
'''

prompt = ChatPromptTemplate.from_template(template)

#llm 설정
llm = ChatOpenAI(model='gpt-4o-mini', temperature=0.1)

output_parser = StrOutputParser()

def initialize_vector_db():
    global store

    embeddings = OpenAIEmbeddings()

    if os.path.isdir(PERSIST_DIR) and os.listdir(PERSIST_DIR):
        store = Chroma(
            collection_name=COLLECTION_NAME,
            embedding_function=embeddings,
            persist_directory= PERSIST_DIR)
        print('이전 데이터의 로딩이 완료되었습니다.')
        return store
    
def create_vector_db(file_path):
    global store
    #여기 내용을 채워 넣으시오.
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    text_splitter = CharacterTextSplitter(
        separator='\n\n',
        chunk_size=1000,
        chunk_overlap=100
    )
    texts = text_splitter.split_documents(documents)

    embeddings = OpenAIEmbeddings()

    if not os.path.exists(PERSIST_DIR):
        os.makedirs(PERSIST_DIR)
    
    #폴더도 있고,파일도 있으면 불러오기
    if os.path.isdir(PERSIST_DIR) and os.listdir(PERSIST_DIR):
        store = Chroma(
            embedding_function= embeddings,
            collection_name=COLLECTION_NAME,
            persist_directory=PERSIST_DIR)
        return store
    else: #새로 만들기
        store = Chroma.from_documents(
            texts,
            embeddings,
            collection_name=COLLECTION_NAME,
            persist_directory=PERSIST_DIR
        )
    return store

def load_vector_db():
    embeddings = OpenAIEmbeddings()
    store = Chroma(
        collection_name= COLLECTION_NAME,
        embedding_function=embeddings,
        persist_directory=PERSIST_DIR)
    return store

def check_collection_exists(persist_dir, collection_name):
    embeddings = OpenAIEmbeddings()
    store = Chroma(
        collection_name= collection_name,
        embedding_function=embeddings,
        persist_directory=PERSIST_DIR)
    results = store.get(include=[])
    return len(results['ids'])>0

if check_collection_exists(PERSIST_DIR, COLLECTION_NAME):
    print('db가 존재해서, 이전 내용 로딩중..')
    store = load_vector_db()
else:
    print('db가 없어서, 새로 생성중...')
    store=create_vector_db(pdf_filename)

def initialize_vector_db():
    global store

retriever = store.as_retriever()

#체인 
chain = (
    {'context':retriever, 'question': RunnablePassthrough()}
    | prompt
    | llm
)

def answer_question(question):
    #db로부터 검색해서 체인 invoke하는 코드까지..
    if store in None:
        return "문서가 업로드 되지 않았습니다. 먼저 PDF를 업로드 해주세요."
    
    result = chain.invoke({'context':context, 'question':question
    })

    #점수도 함께 포함해서 가져옴 
    docs_with_score = store.similarity_search_with_score(question,k=5)
    context = '\n\n'.join([doc.page_content for doc in docs_with_score])
    print(docs_with_score)

    #답변 고도화
    source_lines = []
    for doc, score in docs_with_score:
        source = os.path.basename(doc.metadata.get('source', 'unknown'))
        page = int(doc.metadata.get('page',0))+1
        score_percent = round((1-score)*100,2)
        source_lines.append(f'{score} (page {page}, 유사도 {score_percent}%)')
    
    return(
        f"질문: {question}\n"
        f"응답: {result}\n"
        f"관련문서: \n" + "\n".join()
    )

print(answer_question('시큐어 코딩에 대해서 알려줘.'))