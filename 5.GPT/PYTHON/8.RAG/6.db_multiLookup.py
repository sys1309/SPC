from dotenv import load_dotenv
import os

from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOuputParser

load_dotenv()

PERSIST_DIR = './chroma_db'
COLLECTION_NAME = ['secure_coding_python', 'travel']

embeddings = OpenAIEmbeddings()

stores = {
    name: Chroma(
    collection_name = name,
    embedding_function = embeddings,
    persist_directory = PERSIST_DIR
    )
    for name in COLLECTION_NAME
}

llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template("""
다음 문서들을 참고하여 질문에 답변해주세요.
                                          
    문서들:
    {context}
                                          
    질문:
    {question}
"""
)

chain = {
    prompt  
    | llm
    | StrOuputParser()
}

def search_documents(question, k=3, target=None):
    if target:
        print(f"{target} 컬랙션에서 검색합니다.")
        return stores[target].similarity_search(question, k=k)
    else:
        print('모든 컬랙션에서 통합 검색합니다.(각 문서에서 2개씩)')
        docs = []
        for store in stores.values():
            docs.extend(store.similarity_search(question, k=2))
        return docs

def ask(question, target_collection=None):
    docs = search_documents(question, target=target_collection)
    context = "\n\n".join([doc.page_Content for doc in docs])

    response = chain.invoke({'context':context, 'question':question})

    print(f"\n[질문]:{question}")
    if target_collection:
        print(f"[대상 컬랙션]:{target_collection}")
    print(f"[참고문서]: ")



results = store._collection.get(include=['documents', 'metadatas'], limit=10)
ids = results['ids']
docs = results['documents']
metadatas = results['metadatas']

# for i, doc in enumerate(docs):
#     print(f"[문서]: {i+1}")
#     print(f"[문서ID]: {ids[i]}")
#     print(f"[내용(앞100글자)]: {doc.page_content[:100]}")
#     print(f"[메타데이터]: {doc.metadata}")

docs = store.similarity_search("시큐어 코딩", k=5)
for i, doc in enumerate(docs):
    print(f"[문서]: {i+1}")
    print(f"[문서ID]: {ids[i]}")
    print(f"[내용(앞100글자)]: {doc.page_content[:100]}")
    print(f"[메타데이터]: {doc.metadata}")
