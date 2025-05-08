from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType
from langchain_community.tools.wikipedia.tool import WikipediaQueryRun
from langchain_community.utilities.wikipedia import WikipediaAPIWrapper


load_dotenv(dotenv_path='../../.env')

llm = OpenAI(temperature=0.0) #agent 선택과 연동을 위해 창의적으로 하면 안되니까 명확하게 deterministic하게 

tools = load_tools(['wikipedia'])

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose= True #운영할때는 끄지만 지금은 상세내역을 보기위해 
)

result = agent.invoke({'input':'인공지능의 역사에 대해서 간략히 한국어로 설명해줘.'})
print(result['output'])