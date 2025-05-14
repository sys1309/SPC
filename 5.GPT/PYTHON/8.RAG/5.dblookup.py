from dotenv import load_dotenv
import os

from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

load_dotenv()

PERSIST_DIR = './chroma_db'
COLLECTION_NAME = 'secure_coding_python'

embeddings = OpenAIEmbeddings()

store = Chroma(
    collection_name = COLLECTION_NAME,
    embedding_function = embeddings,
    persist_directory = PERSIST_DIR
)

count = store._collection.count()
print(f"저장된 문서 개수:{count}")

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
    print(f"[문서ID]: {doc.id}")
    print(f"[내용(앞100글자)]: {doc.page_content}")
    print(f"[메타데이터]: {doc.metadata}")
