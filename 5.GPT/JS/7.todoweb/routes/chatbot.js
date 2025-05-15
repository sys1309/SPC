const express = require('express');
const router = express.Router();
const db = require('../../models/database')
const todoModel = require('../models/todoModel')

const {OpanAI} = require('openai');

require('dotenv').config();

const openai = new OpenAI();

router.post('/api/chat', async (req,res)=>{
    const {question} = req.body;

    const reply = await requestChatGPT(question);

    let answer;

    //챗봇에게 사용자 말을 전달하고, 그거에 따른 액션을 취해서 반환하게 해야함..
    //그 액션에 따라서.. 수행할 행동은 내가 코딩해야함..
    let jsonReply = JSON.parse(reply)

    const {action, item } = jsonReply;
    console.log(`그래서 내가 할 일은: ${action}, ${item}`)

    const todos = todoModel.getAllTodos();

    switch(action) {
        case 'add':
            //구현하기
            todoModel.addTodo(item);
            answer='추가했음'
            break;
        case 'done':
            var findItem = todos.find(t=>t.text.include(item));
            todoModel.updateTodoState(id,1);
            answer = '완료 처리 했음'
            break;
        case 'delete':
            var findItem = todos.find(t => t.text.includes(item)); 아이디? 아이템?
            todoModel.deleteTodoById(findItem.id);
            answer = '삭제했음'
            break;
    }

    return res.send({ answer:`${answer}`});
});

async function requestChatGPT(userInput){
    const prompt = `
    너는 투두리스트에 대응하는 챗봇입니다.
    그래서 사용자으 질문에 따라 "add", "done", "delete", "deleteall", "alldone"의 액션을 선택할수 있어.
    답변은 아무런 설명도 없이 json으로만 답변해야해. json 태그 문법도 생략해줘.

    답변은 다음의 포맷으로 해줘: {"action":"text", "item":"text"}

    예시) 
    "모든 일정을 다 완료 처리해줘." => {"action":"alldone"}
    "숙제 완료했어" => {"action":"done", "item":"숙제"}
    `;

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