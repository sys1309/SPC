import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain.chains import LLMMathChain
from langchain.tools import tool
from langchain_experimental.plan_and_execute import PlanAndExecute, load_agent_executor, load_chat_planner


load_dotenv(dotenv_path='../.env')

#나만의 도구 정의하기
#flask에서 라우터 정의하던거 @app 데코레이터
#나만의 툴도... @tool 이라는 데코레이터로 정의.. 함수 안의 주석도 의미가 있는 주석임.. 이 함수의 역할을 자연어로 정의 한것. 
@tool
def get_current_weather(location:str) -> str:
    """특정 위치의 현재 날짜 정보를 가져옵니다."""
    weather_data = {
        "서울":"맑음, 기온 22도",
        "부산":"흐림, 기온 18도",
        "제주":"비, 기온 15도",
    }
    return weather_data.get(location, f"{location}의 날씨 정보가 없습니다.")


@tool
def get_population(city:str)-> str:
    """특정 도시의 인구 정보를 가져옵니다."""
    #가상 데이터 
    population_data = {
        "서울":"약 970만명",
        "부산":"약 410만명",
        "대구":"약 850만명",
        "인천":"약 240만명",
    }
    return population_data.get(city, f"{city}의 인구 정보가 없습니다.")


#도구 일단 담아주기..
tools = [get_current_weather, get_population]

llm = ChatOpenAI(model="gpt-4o-mini", temperature = 0) #agent와 연동할때는 창의력을 낮게해서 예측 가능한 

#에이전트 초기화
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

result = agent.invoke({'input':'제주의 날씨는 어때? 그리고 인구는 몇 명이야?'})
print('최종결과:', result)