from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv(dotenv_path= '../../.env')

template = "다음 문장을 한국어로 번역해줘:\n\n{sentence}"
prompt = PromptTemplate(input_variables=["sentence"], template=template)

llm = OpenAI(
    temperature=0.3,        #번역이니 창의력을 최소화
    max_tokens = 1024,
    frequency_penalty=0.5,  # 같은 단어 반복 억제
    presence_penalty=0.6    # 새로운 단어 사용 유도
    ) 

chain = prompt | llm | RunnableLambda(lambda x: {'translated':x.strip()})

result = chain.invoke({'sentence':"""
    《Steelho's Last Gallop》

    The sun was setting, and the artificial lights of the racetrack stretched the shadows long.
    Steelho stood silently at the starting line—rusted joints, scratched alloy shell, and a slowing reaction speed.
    Once, he had been called “The Lightning of Machines.”

    “This is your last race, Steelho.”
    Trainer Jin removed his helmet and wiped the sweat from his brow.
    His voice, as always, was calm, but Steelho’s emotion processors detected a subtle tremble.

    These days, robo-horses ran without human riders.
    Racing with only AI and electric muscles, this sport had become another battlefield born of human desire.

    The starting gun fired, and the horses bolted forward.
    Steelho started a half-second late.
    But he knew this race wasn’t about winning. It was about memory.

    As he rounded the first bend, he recalled his debut seventeen years ago—
    the roar of the crowd, the wind slicing across his metal limbs,
    and Jin’s tearful face holding a trophy.

    When he finally crossed the finish line, everyone stood.
    Dead last. But the applause was louder than for any winner.
    Sunlight shimmered across his silver body, and he felt the slowing pulse of his mechanical heart.

    “Well done, my friend,”
    Jin whispered. Steelho bowed his head quietly,
    and walked off the track, steady and calm. On his visor, a single word blinked:

    [STATUS: Retired]
"""})

print('한글 번역본:', result['translated'])