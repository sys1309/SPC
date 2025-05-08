from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from langchain_core.runnables import RunnableLambda, RunnablePassthrough

load_dotenv(dotenv_path='../../.env')
#입력값: 주제
#-> 이 주제를 갖는 회사명을 만들고
#-> 그 회사명을 기반으로, 회사의 슬로건(캐치프레이즈)를 만들것임.

#1.기본 질의 응답 패턴
chat_prompt1 = PromptTemplate(
    input_variables = ['product'],
    template = "너는 회사이름을 전문적으로 짓는 작명가야, 다음 상품/서비스를 갖는 회사명을 지어줘. 설명 없이 한 단어로 회사명을 지어줘.\n\n상품명:{product}"
    # template = "You are a professional naming consultant. What is a good name for a company that makes {product}?"
)

chat_prompt2 = PromptTemplate(
    input_variables = ['company_name'],
    # template = "Write a catch phrase for the following company name: {company_name}"
    template = "이 회사를 잘 소개 할 수 있는 슬로건(또는 catch-phrase)를 만들어줘. 회사명: {company_name}"
)

chat_prompt3 = PromptTemplate(
    input_variables = ['company_name'],
    template = "이 회사를 소개 할 수 있는 문장 글을 작성해줘. 500글자 정도 분량으로 소개해줘. 회사명:{company_name}"
)

llm = OpenAI(model="gpt-3.5-turbo-instruct", temperature=0.9, max_tokens=1000)
# llm = ChatOpenAI(model="gpt-4o", temperature=0.9)

chain1 = (
        {'product':lambda x: x['product']}
        | RunnablePassthrough.assign(
            company_name = lambda x : llm.invoke(chat_prompt1.format(product=x['product'])).strip() 
        )
        | RunnablePassthrough.assign(
            catch_phrase = lambda x : llm.invoke(chat_prompt2.format(company_name=x['company_name'])).strip() 
        )
        | RunnablePassthrough.assign(
            description = lambda x : llm.invoke(chat_prompt3.format(company_name=x['company_name'], catch_phrase=x['catch_phrase'])).strip() 
        )
)

response1 = chain1.invoke({'product':'김치'})
print('최종 회사 이름:', response1['company_name'])
print('최종 캐치 프레이즈:', response1['catch_phrase'])
print('최종 묘사:', response1['description'])