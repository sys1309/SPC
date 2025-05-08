from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv(dotenv_path= '../../.env')

#1. 프롬프트 탬플릿 정의
template = '''
    You are a naming consultant for new companies. What is good name for a {company} that makes {product}? Give my five and only five answers.
    '''
prompt = PromptTemplate(
    input_variables=["company","product"],
    template=template
)

#2. LLM모델 설정한다
llm = OpenAI(temperature=0.9)

#3.체인 구성(입력 프롬프트 -> 모델 -> 후처리)
chain = prompt | llm |RunnableLambda(lambda x:{"response":x.strip()})

#4. 실행(위의 체인을 실행)
inputs = {"company":"High Tech Company", "product":"Web Game"}
result= chain.invoke(inputs)

#5.결과물 출력
print(f"최종결과: \n{result["response"]}")