
const express = require('express');
const app = express();
require('dotenv').config({ path: '../../.env'});
const axios = require('axios');
const path =require('path');

const conversationHistory = [];

//serve static files from the public directory
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());

//Basic route
app.get('/', (req, res) => res.send('Hello World!'));

//system: 시스템 프롬프트
//user: 사용자 질문
//assistant: 챗봇응답 
app.post('/api/chat', async (req,res)=> {
    const {userInput} = req.body;
    console.log('userInput:', userInput);
    //이전대화내용에 추가
    conversationHistory.push({role:'user', content: userInput})
    const ChatGPTResponse = await getChatGPTResponse(userInput);
    console.log('gpt answer:',ChatGPTResponse);
    console.log('-----');
    console.log('보낼전체대화내용:', conversationHistory);
    console.log('-----');
    conversationHistory.push({role:'assistant', content: ChatGPTResponse})
    res.json({'message':ChatGPTResponse})
});

const CHATGPT_URL ='https://api.openai.com/v1/chat/completions';

async function getChatGPTResponse(userInput){
    const response = axios.post(
        //url, body, header
        CHATGPT_URL,
        {
            model: 'gpt-3.5-turbo',
            messages:[
                {role:'system', content:'You are a helpful assistant. please remember our conversation history in memory and respond accordingly.'},
                {role:'user', content:userInput},
                ...conversationHistory
            ]
        },
        {
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        }
    );
    return response.data.choices[0].message.content;
}

//servr listening logic
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));