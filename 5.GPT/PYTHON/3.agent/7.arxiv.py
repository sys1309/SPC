from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType

load_dotenv(dotenv_path='../.env')

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3) #일반적으로 0.7, 0.2~1.0 사이로

tools = load_tools(['arxiv']) #많은 외부 서비스는 대부분 API키를 필요로함 (위키피디아 arxiv는 없어도 됨)

agent = initialize_agent(
    tools= tools,
    llm = llm,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose= True #생각출력 프로덕션에서는 꺼야함
)

result = agent.invoke({'input':'최근 프롬프트 엔지니어링 관련 논문을 찾아서 요약해줘.'}) #입력값은 input이라는 걸로 넣고

print(result['output'])