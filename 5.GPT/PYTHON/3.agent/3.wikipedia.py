from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType
from langchain_community.tools.wikipedia.tool import WikipediaQueryRun
from langchain_community.utilities.wikipedia import WikipediaAPIWrapper

wiki = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper(lang='ko'))

load_dotenv(dotenv_path='../../.env')

llm = OpenAI(temperature=0.0, max_tokens = 1000)

# tools = load_tools(['wikipedia'])
tools = ['wiki']

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose= True #운영할때는 끄지만 지금은 상세내역을 보기위해 
)

#Chain of Thought 구체적인 논리적인 흐름을 제시 
prompt = '''
1. Find the list of public holidays in South Korea with their specific dates (month and day)
2. For each holiday, add the month number and day number, For example, January 1st, add 1+1=2
3. Tell me the sum of  these numbers
Please list each calculation step by step clearly.
'''

result = agent.invoke({'input':'대한민국의 법정 공휴일에 대해서 알려줘.'})
print(result['output'])