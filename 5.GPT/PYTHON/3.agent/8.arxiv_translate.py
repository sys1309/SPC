from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain_core.runnables import RunnableLambda


load_dotenv(dotenv_path='../.env')

llm_summary = ChatOpenAI(model="gpt-4o-mini", temperature=0.3) #일반적으로 0.7, 0.2~1.0 사이로
llm_translate = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.3) #일반적으로 0.7, 0.2~1.0 사이로

tools = load_tools(['arxiv']) #많은 외부 서비스는 대부분 API키를 필요로함 (위키피디아 arxiv는 없어도 됨)

agent = initialize_agent(
    tools= tools,
    llm = llm_summary,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose= True #생각출력 프로덕션에서는 꺼야함
)

#번역 체인 만든다
#1. 프롬프트 작성
template = "다음 문장을 스페인어로 번역해줘:\n\n{text}"
prompt = ChatPromptTemplate(
    [
    SystemMessagePromptTemplate.from_template("You are a first year fresh newbie translator."),
    HumanMessagePromptTemplate.from_template(template)
    ]
)

#2. 체이닝
chain = prompt | llm_translate | RunnableLambda(lambda x: {'spanish':x.content.strip()})

#3. 검색 시킨것
result = agent.invoke({'input':'최근 프롬프트 엔지니어링 관련 논문을 찾아서 요약해줘.'}) #입력값은 input이라는 걸로 넣고
print(result['output'])

#4. 체이닝을 실행 (invoke)
result_translated = chain.invoke({'text':result['output']})

#5. 결과 출력
print(result_translated['spanish'])
