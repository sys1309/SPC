from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv(dotenv_path= '../../.env')

template = "다음의 글을 읽고 3문장으로 요약하시오. 각 문장은 50글자 이내로 작성하시오.: \n\n{article}"
prompt = ChatPromptTemplate.from_messages([HumanMessagePromptTemplate.from_template(template)])
llm = ChatOpenAI(mdoel="gpt-4o", temperature= 0.5) #요약이 목적이니 정확하게..

chain = prompt | llm | RunnableLambda(lambda x: {'summary': x.content.strip()})

input_text = {
    "article":"""
    《스틸호의 마지막 질주》

    해는 저물고, 인조 태양빛이 경마장의 그림자를 길게 끌어냈다.
    스틸호는 조용히 출발선에 섰다. 녹슨 관절, 긁힌 합금 껍질, 느려진 반응 속도.
    한때 그는 "기계의 번개"라 불리던 챔피언이었다.

    "스틸호, 마지막 경기야."
    조련사 진은 헬멧을 벗고 이마의 땀을 닦았다.
    그의 목소리는 언제나처럼 담담했지만, 스틸호의 정서 프로세서는 미세한 떨림을 감지했다.

    로봇말들은 인간 조종 없이 스스로 뛰었다.
    AI와 전기 근육으로만 질주하는 이 신인류의 경기는, 인간의 욕망이 만든 또 다른 전장 같았다.

    총성이 울리고, 말들이 출발했다.
    스틸호는 반 박자 늦게 달리기 시작했다.
    하지만 그는 알고 있었다. 이번엔 승부가 아니라, 기억의 문제라는 걸.

    첫 번째 곡선에서 그는 17년 전 데뷔전을 떠올렸다.
    관중들의 환호, 바람을 가르며 날아가던 그의 금속 다리,
    그리고, 트로피를 안고 울던 진의 얼굴.

    결승선을 통과하자, 모두가 일어섰다.
    순위는 꼴찌. 하지만 박수는 그 누구보다 컸다.
    은빛 몸체 위로 석양빛이 떨어지고, 그는 마지막으로 기계 심장을 느리게 고동시켰다.

    "수고했어, 친구."
    진이 말했다. 스틸호는 조용히 고개를 끄덕였다.
    그리고 차분히 트랙을 떠났다. 그의 눈에 깜빡이는 글자 하나.

    [STATUS: Retired]
    """
}

result= chain.invoke(input_text)

#5.결과물 출력
print(f"최종결과: \n{result["summary"]}")