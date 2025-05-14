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

#프롬프트 코드
pdf_filename = 'Python_시큐어코딩_가이드(2023년_개정본).pdf'
PERSIST_DIR = './chroma_db'
COLLECTION_NAME = 'secure_coding_python'
store = None

def create_vector_db(file_path):
    global store
    #여기 내용을 채워 넣으시오.
    loader = PyPDFLoader(pdf_filename)
    documents = loader.load()

    for doc in documents:
        doc.metadata['source'] = os.path.basename(file_path)
        if 'page' not in doc.metadata:
            doc.metadata['page'] = doc.metadata.get('page',0) +1

    text_splitter = CharacterTextSplitter(
        separator='\n\n',
        chunk_size=1000,
        chunk_overlap=200
    )
    texts = text_splitter.split_documents(documents)

    embeddings = OpenAIEmbeddings()

    if not os.path.exists(PERSIST_DIR):
        os.makedirs(PERSIST_DIR)
    
    if os.path.isdir(PERSIST_DIR) and os.listdir(PERSIST_DIR):
        store = Chroma.from_documents(
            embedding_function= embeddings,
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

#llm 설정
llm = ChatOpenAI(model='gpt-4o-mini', temperature=0.1)

retriever = store.as_retriever()

template='''
다음 내용을 참고해서 사용자의 질문에 답변하시오:
문서:
{context}

만약, 정보가 없으면 모른다고 답변하시오. 정보가 있으면 정보를 가져온 출처를 알려줘.
질문:
{question}

답변:
'''

prompt = ChatPromptTemplate.from_template(template)

#체인 
chain = (
    {'context':retriever, 'question': RunnablePassthrough()}
    | prompt
    | llm
)

def answer_question(question):
    #db로부터 검색해서 체인 invoke하는 코드까지..
    result = chain.invoke(question)

    if store in None:
        return "문서가 업로드 되지 않았습니다. 먼저 PDF를 업로드 해주세요."
    
    docs = store.similarity_search(question,k=5)
    context = '\n\n'.join([doc.page_content for doc in docs])

    if '출처:' in result.content:
        answer, sources = result.content.split('출처:',1)
    else:
        answer = result.content.strip()
        sources = '출처 정보를 찾을수 없습니다.'

    return f"질문: {question}\n응답:{result}\n출처:{sources}"

print(answer_question('시큐어 코딩에 대해서 알려줘.'))