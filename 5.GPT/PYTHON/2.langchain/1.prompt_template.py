from langchain_core.prompts import PromptTemplate

template = "회사이름을 작명하고 싶어. 나의 회사는 {product} 만드는 회사야."
prompt = PromptTemplate(
    input_variables=["product"],
    template=template
)

final_prompt = prompt.format(product='아케이드 게임')

print('최종 프롬푸트 결과:')
print(final_prompt)

print('-'*50)

test_products=[
    "모바일게임",
    "로봇 장난감",
    "인터넷 전자 상거래",
    "수능 학습집"
]

for product in test_products:
    result = prompt.format(product=product)
    print(f"[{product}] {result}\n")
