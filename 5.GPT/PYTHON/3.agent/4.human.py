from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType

load_dotenv(dotenv_path='../../.env')

llm = OpenAI(temperature=0.2)

tools = load_tools(['human'])

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose= True #운영할때는 끄지만 지금은 상세내역을 보기위해 
)

result = agent.invoke({'input':'나는 몇살일까?'})
print(result)