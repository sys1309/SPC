from dotenv import load_dotenv
import os
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

load_dotenv(dotenv_path= '../../.env')

# LLM 인스턴스 생성
llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.5
)

# 프롬프트 템플릿 정의
template = ChatPromptTemplate.from_messages([
    ("system", "넌 여행 예산을 분석해주는 AI야. 한국인의 시각에서 현실적인 여행 경비를 추정해줘."),
    ("user", """
    여행 인원: {people}명  
    여행 출발지:{depart}
    여행 목적지: {destination}  
    여행 기간: {days}일  

    위 조건에 따라 예상 여행 경비를 숙박, 식비, 교통비, 기타비용으로 나누어 계산하고, 총 예산을 한화 기준으로 알려줘. 1인당이 아니라 전체 인원 기준으로 알려줘.
    그리고 예산을 계산할때 도착지와 출발지를 고려해서 한국인의 시각에서 현실적인 여행 경비를 추정해주고 산출된 예산으로 어떻게 여행할 수 있는지 간단하게 설명해주는 예산 한줄평을 작성해줘.
    (example)
    총 예상 예산: 480000원
    예산 한줄평: 2인 기준으로 평균적인 여행 경비입니다! 상황에 따라서 추가적인 비용이 발생할수도 있어요. 
    """)
])

def estimate_travel_budget(people: int, depart: str, destination: str, days: int) -> str:
    messages = template.format_messages(
        people=people,
        depart=depart,
        destination=destination,
        days=days
    )
    response = llm.invoke(messages)
    return response.content

# 테스트 실행
if __name__ == "__main__":
    result = estimate_travel_budget(people=2, depart='부산',destination="경복궁", days=3)
    print(result)


# def estimate_budget(people, depart, destination, days):
#     prompt = f"""
#     여행 인원: {people}명
#     여행 출발지: {depart}
#     여행 목적지: {destination}
#     여행 기간: {days}일

#     위 조건에 따라 예상 여행 경비를 항공권, 숙박, 식비, 교통비, 기타비용으로 나누어 상세히 설명하고, 총 예산을 한화 기준으로 대략적으로 알려줘.
#     1인당이 아니라 전체 인원 기준으로 알려줘.
#     """

#     response = client.chat.completions.create(
#         model="gpt-4",
#         messages=[
#             {"role": "system", "content": """넌 여행 예산을 분석해주는 여행 플래너야. 
#              도착지와 출발지를 고려해서 한국인의 시각에서 현실적인 여행 경비를 추정해주고 산출된 예산으로 어떻게 여행할 수 있는지 간단하게 설명해주는 예산 한줄평을 작성해줘.
#              (example)
#              총 예상 예산: 480000원
#              예산 한줄평: 2인 기준으로 평균적인 여행 경비입니다! 상황에 따라서 추가적인 비용이 발생할수도 있어요. """},
#             {"role": "user", "content": prompt}
#         ],
#         temperature=0.7,
#         max_tokens=700,
#     )