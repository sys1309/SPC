const express = require('express');
const router = express.Router();
const db = require('../../models/database')

const {OpanAI, default: OpenAI} = require('openai');

require('dotenv').config();

const openai = new OpenAI();

router.post('/api/chat', async (req,res)=>{
    const {question} = req.body;

    const reply = await requestChatGPT(question);

    let answer;


    let jsonReply = JSON.parse(reply)
    const {action, item } =reply;
    console.log(`그래서 내가 할 일은: ${action}, ${item}`)

    const todos = todoModel.getAllTodos();

    switch(action) {
        case 'add':
            //구현하기
            todoModel.addTodo(item);
            // db.prepare('insert into todos (text) values (?)').run(item);
            answer='추가했음'
            break;
        case 'done':
            const findItem = todos.find(t=>t.text.include(item));
            todoModel.updateTodoState(id,1);
            answer = '완료 처리 했음'
            break;
        case 'delete':
            // const findItem = todoModel.deleteTodoById(item); 아이디? 아이템?
            answer = '삭제했음'
            break;
        case 'summary':
            const doneList = todos.filter(t=>t.completed);
            const undoneList = todos.filter(t=>!t.completed);
            const summaryPrompt = buildSummaryPrompt(doneList, undoneList)
            const summaryText = await requestChatGPT(summaryPrompt)
            answer = summaryText;
            break;

        default:
            answer = '아직 구현되지 않은 기능입니다.'
    }

    return res.send({ answer:`${answer}`});
});

function buildSummaryPrompt(doneList, undoneList){
    const doneStr = doneList.length > 0
    ?doneList.map(t=>`- ${t.text}`).json('\n')
    :'없음';

    // console.log('완료목록:', doneList)
    // console.log('미완료목록:', undoneList)

    prompt=`
    당신은 사용자의 하루를 요약해주는 비서입니다. 
    다음 목록을 보고 사용자에게 동기부여가 되도록 오늘 할일을 요약해주세요.

    [완료한 일]
    ${doneStr}

    [아직 남은 일]
    ${undoneStr}
    `

    return JSON.stringify(dontList) + JSON.stringify(undoneList);
}

const summary_system_prompt =  `당신은 사용자의 하루를 요약해주는 비서입니다. 
    다음 목록을 보고 사용자에게 동기부여가 되도록 오늘 할일을 요약해주세요..`

const commandPrompt =`
    너는 투두리스트에 대응하는 챗봇입니다.
    그래서 사용자의 질문에 따라 "add", "done", "delete", "deleteall", "alldone"의 액션을 선택할수 있어.
    답변은 아무런 설명도 없이 json으로만 답변해야해. json 태그 문법도 생략해줘.

    답변은 다음의 포맷으로 해줘: {"action":"text", "item":"text"}

    예시) 
    "모든 일정을 다 완료 처리해줘." => {"action":"alldone"}
    "숙제 완료했어" => {"action":"done", "item":"숙제"}
    `;

async function requestChatGPT(prompt, userInput){

    const response = await openai.chat.completions.create({
        model:'gpt-4o-mini',
        messages:[
            {role:'system', content:'너는 투두리스트에 대응하는 챗봇입니다.'},
            {role:'user', content:userInput}
        ],
        temperature:0.2
    })

    let content = response.choices[0].message.content.trim();
    return content;

}

module.exports = router;