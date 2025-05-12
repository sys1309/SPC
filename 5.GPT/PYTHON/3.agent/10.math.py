from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType


load_dotenv(dotenv_path='../.env')

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3) 

tools = load_tools(['llm-math'], llm = llm) #많은 외부 서비스는 대부분 API키를 필요로함 (위키피디아 arxiv는 없어도 됨)

agent = initialize_agent(
    tools= tools,
    llm = llm,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose= True #생각출력 프로덕션에서는 꺼야함
)

# result = agent.invoke('123 * (4+5)는 얼마야?')
question = '''
길이가 15m인 기차의 최고속력은 시속 200km이다. 기차가 출발한 후 10초 후에 최고 속력에 도달한다고 가정할때, 터널 입구에서 출발해 길이가 757미터인 터널을 지날때, 기차가 완전히 터널을 통과하는데 걸리는 시간은?
'''
result = agent.invoke(question)
print(result['output'])