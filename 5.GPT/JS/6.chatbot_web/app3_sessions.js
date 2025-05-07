
const express = require('express');
const app = express();
require('dotenv').config({ path: '../../.env'});
const axios = require('axios');
const path =require('path');
const {
    getRecentConversation,
    newSession,
    getAllSessions,
    getCurrentSession,
    getConversationBySession,
    getSessionById,
    saveMessage,
} = require('./database3')

//Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index3.html'));
});

//serve static files from the public directory
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());


//새로운 세션 생성 -api 네이밍은 좋은 스타일은 아님 
app.post('/api/new-session',(req,res)=>{
    const result = newSession();
    res.json({success: true, sessionId: result.lastInsertRowid})
});

//전체 대화내용 가져오기
app.get('/api/all-sessions', (req,res) => {
    const sessions= getAllSessions();
    res.json({ allSessions: sessions });
});

//최근 세션의 내용 다 가져오기
app.get('/api/current-session', (req,res)=>{
    const session = getCurrentSession();
    const conversationHistory = getConversationBySession(session.id);
    res.json({id:session.id, start_time:session.start_time, conversationHistory});
});

//특정 세션 대화내용 가져오기
app.get('/api/session/:sessionId', (req,res)=>{
    const sessionId= req.params.sessionId;
    const session = getSessionById(sessionId);
    const history = getConversationBySession(sessionId);

    res.json({id: session.id, start_time:session.start_time, conversationHistory:history});
})

app.post('/api/chat', async (req,res)=> {
    const {sessionId, userInput} = req.body;
    console.log('sessionid:',sessionId,'userInput:', userInput);

    const previousConversation = getRecentConversation(); //최근대화 가져와서 여기에 넣어주기 
    saveMessage('user', userInput, sessionId);

    const ChatGPTResponse = await getChatGPTResponse(previousConversation);
    console.log(ChatGPTResponse);
    console.log('-----');
    console.log('보낼전체대화내용:', previousConversation);
    console.log('-----');

    saveMessage('assistant', ChatGPTResponse, sessionId);

    res.json({'message':ChatGPTResponse});
});

const CHATGPT_URL ='https://api.openai.com/v1/chat/completions';

async function getChatGPTResponse(previousConversation){
    const response = await axios.post(
        //url, body, header
        CHATGPT_URL,
        {
            model: 'gpt-3.5-turbo',
            messages:[
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