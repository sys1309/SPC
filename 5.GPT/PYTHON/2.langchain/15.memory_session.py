from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.runnables import RunnableLambda
from langchain_core.output_parsers import CommaSeparatedListOutputParser, StrOutputParser

load_dotenv(dotenv_path='../../.env')

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.1)

prompt= ChatPromptTemplate()

chain= prompt | llm | StrOutputParser()

session_id1 = 

chain_with_memory = RunnableWithMessageHistory(
    chain,
    lambda session_id: get_session_history(session_id),
    input_message_key= "input",
    history_message_key = 
)

