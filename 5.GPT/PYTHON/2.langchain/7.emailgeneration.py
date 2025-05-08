from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv(dotenv_path= '../../.env')

template = "회사의 공식 이메일을 작성하고자 합니다. 수신자 {recipient}에게 다음 주제 {topic}에 대한 미팅 요청을 하는 메일입니다."

prompt = PromptTemplate(input_variables=["query"], template=template)
llm = OpenAI(temperature=0.6, max_tokens= 1024) #쿼리문이기 때문에 창의성 낮춤

chain = prompt | llm | RunnableLambda(lambda x: {'email': x.strip()})

example_input = {
    "recipient": "개발팀", "topic":"신규 서비스 런칭"
}
result = chain.invoke(example_input)

print(f"생성된 이메일:\n{result["email"]}")

print('-'*50)

recipients = [
    "개발팀",
    "마케팅팀",
    "인사팀",
    "총무팀",
    "재무팀"
]

topics = [
    "너희의 많은 버그로 인한 사용자 불만",
    "버그로 줄어드는 사용자를 다시 붙잡기 위한 전략",
    "버그를 만드는 개발자를 해고하기 위한 전략",
    "해고 이후 직원들의 동기부여를 위한 다과파티",
    "주주들에게 보내는 서한"
]

for recipient, topic in zip(recipients, topics):
    print(f"\nTo: {recipient} | Topic: {topic}")
    result = chain.invoke({'recipient': recipient, 'topic':{topic}})
    print(result['email'])
    print('+-'*50)



# for index, topic in enumerate(topics):
#     print(f"\nTo: {recipients[index]} | Topic: {topic}")
#     result = chain.invoke({'recipient': {recipients[index]}, 'topic':{topic}})
#     print(result['email'])
#     print('+-'*50)