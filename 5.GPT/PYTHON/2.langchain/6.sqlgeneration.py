from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv(dotenv_path= '../../.env')

template = "다음 요청에 대한 sql 쿼리문을 작성하시오. 설명없이 오지 SQL 구문 만을 작성하시오.:\n\n{query}"

prompt = PromptTemplate(input_variables=["query"], template=template)
llm = OpenAI(temperature=0.3) #쿼리문이기 때문에 창의성 낮춤

chain = prompt | llm | RunnableLambda(lambda x: {'sql': x.strip()})

example_input = {
    "query": "List the name and email of users who signed up after Jan, 1, 2024"
}

result = chain.invoke(example_input)

print(f"생성된 쿼리문:\n{result["sql"]}")