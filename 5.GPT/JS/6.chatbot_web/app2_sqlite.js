
const express = require('express');
const app = express();
require('dotenv').config({ path: '../../.env'});
const axios = require('axios');
const path =require('path');
const Database = require('sqlite3')

// const conversationHistory = [];

//serve static files from the public directory
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());

//sqlite db 설정
// const db = new Database(':memory:'); // 파일에 저장하지 않고 메모리에 임시저장하는 DB
const db = new Database('history.db') // 파일에 저장하기

db.exec( `
    create table if not exists conversation (
    id integer primary key autoincrement,
    role text,
    conten text)
    `
)


//Basic route
app.get('/', (req, res) => res.send('Hello World!'));

function getRecentConversation(){
    const stmt = db.preapre('select * from conversation order by id desc limit 10'); //최근 10개의 대화 내용 가져옴 
    const rows = stmt.all();
    return rows.reverse; //최근 10개 가져와서 오래된 질문을 먼저 넣기 위해서 순서 바꿈 
}

//system: 시스템 프롬프트
//user: 사용자 질문
//assistant: 챗봇응답 
app.post('/api/chat', async (req,res)=> {
    const {userInput} = req.body;
    console.log('userInput:', userInput);
    //이전대화내용에 추가
    // conversationHistory.push({role:'user', content: userInput})
    db.prepare('insert into conversation (role, content) values (?,?)').run('user', userInput);


    const previousConversation = getRecentConversation(); //최근대화 가져와서 여기에 넣어주기 
    const ChatGPTResponse = await getChatGPTResponse(userInput);
    console.log(ChatGPTResponse);
    console.log('-----');
    console.log('보낼전체대화내용:', conversationHistory);
    console.log('-----');
    res.json({'message':ChatGPTResponse})
});

const CHATGPT_URL ='https://api.openai.com/v1/chat/completions';

async function getChatGPTResponse(userInput){
    const response = axios.post(
        //url, body, header
        CHATGPT_URL,
        {
            modelL: 'gpt-3.5-turbo',
            message:[
                {role:'system', content:'You are a helpful assistant. please remember our conversation history in memory and respond accordingly.'},
                // {role:'user', content:userInput},
                ...previousConversation // db로 부터 가져와야함 select 
            ],
            temperature: 0.2//팩트 중심으로 딱딱하게 
        },
        {
            headers:{
                'Content-Type':'application/json',
                'Authurization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        }
    );
    return response.data.choices[0].message.content;
}

//servr listening logic
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));