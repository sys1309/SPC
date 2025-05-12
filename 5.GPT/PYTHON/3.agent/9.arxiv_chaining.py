from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain_core.runnables import RunnableLambda


load_dotenv(dotenv_path='../.env')

llm_summary = ChatOpenAI(model="gpt-4o-mini", temperature=0.2) #일반적으로 0.7, 0.2~1.0 사이로
llm_translate = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.2)

tools = load_tools(['arxiv']) #많은 외부 서비스는 대부분 API키를 필요로함 (위키피디아 arxiv는 없어도 됨)

agent = initialize_agent(
    tools= tools,
    llm = llm_summary,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose= True #생각출력 프로덕션에서는 꺼야함
)

#번역 체인 만든다
#1. 프롬프트 작성
template_prompt = ChatPromptTemplate.from_template("다음 문장을 한국어로 번역해줘:\n\n{text}")

#2. 체이닝
chain = template_prompt | llm_translate | RunnableLambda(lambda x: {'korean':x.content.strip()})

full_chain = (
    RunnableLambda(lambda input : {'input':input['query']}) #입력값 처리할 함수
    | RunnableLambda(agent.invoke) #요약 실행 
    | (lambda x : {'text':x['output']}) #결과 받아오는 함수
    | chain
)

#체인과 프롬프트까지 체이닝
full_chain2 = (
    RunnableLambda(lambda input : {'input':input['query']}) #입력값 처리할 함수
    | RunnableLambda(agent.invoke) #요약 실행 
    | (lambda x : {'text':x['output']}) #결과 받아오는 함수
    | ChatPromptTemplate.from_template("다음 문장을 한국어로 번역해줘:\n\n{text}") 
    | llm_translate 
    | RunnableLambda(lambda x: {'korean':x.content.strip()})
)

#3. 체이닝을 실행 
result = full_chain2.invoke({'query':'최근 프롬프트 엔지니어링 관련 논문을 찾아서 요약해줘.'})

#5. 결과 출력
print(result['korean'])