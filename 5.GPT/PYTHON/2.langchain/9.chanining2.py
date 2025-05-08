from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from langchain_core.runnables import RunnableLambda
from langchain_core.output_parsers import CommaSeparatedListOutputParser

load_dotenv(dotenv_path='../../.env')
#입력값: 주제

#1.기본 질의 응답 패턴
chat_prompt1 = PromptTemplate(
    input_variables = ['product'],
    template = "너는 회사이름을 전문적으로 짓는 작명가야, 다음 상품/서비스를 갖는 회사명을 지어줘. 설명 없이 한 단어로 회사명을 지어줘.\n\n상품명:{product}"
    #template = "You are a professional naming consultant. What is a good name for a company that makes {product}?"
)

chat_prompt2 = PromptTemplate(
    input_variables = ['company_name'],
    #template = "Write a catch phrase for the following company name: {company_name}"
    template = "이 회사를 잘 소개 할 수 있는 슬로건(또는 catch-phrase)를 만들어줘. 회사명: {company_name}"
)

llm = OpenAI(model="gpt-3.5-turbo-instruct", temperature=0.9)
#llm = ChatOpenAI(model="gpt-4o", temperature=0.9)

chain1 = (
        chat_prompt1 | llm | RunnableLambda(lambda x : {'company_name':x.strip()}) | 
        chat_prompt2 | llm | RunnableLambda(lambda x: {'catch_phrase':x.strip()})
        )

response1 = chain1.invoke({'product':'김치'})['catch_phrase']
print('최종 캐치 프레이즈:',response1)