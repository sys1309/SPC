from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType
from langchain_core.runnables import RunnableLambda
from langchain_core.prompts import PromptTemplate

load_dotenv(dotenv_path='../.env')

tools = load_tools(['google-search'])

llm = OpenAI(    
    temperature=0.3,        #번역이니 창의력을 최소화
    max_tokens = 1024,
    frequency_penalty=0.5,  # 같은 단어 반복 억제
    presence_penalty=0.6
    )

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose= True, #운영할때는 끄지만 지금은 상세내역을 보기위해 
    handle_parsing_errors=True
)

result = agent.invoke({'input':'서울의 오늘 날씨는 어때?'})
print(result['output'])