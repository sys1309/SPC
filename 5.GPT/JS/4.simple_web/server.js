const express = require('express');
const app = express();

const morgan= require('morgan')
const OpenAI = require('openai')
const port = 3000;

require('dotenv').config({path:'../../.env'})

const openai = new OpenAI({
    apikey:process.env.OPENAI_API_KEY
});

app.use(morgan('dev'));
app.use(express.static('public'));

app.post('/api/chat', (req,res)=>{
    const { question } = req.body;
    console.log(question);
    res.json({question});
})

app.post('/api/sendQuestionStream', async(req, res) => {
    const {question} = req.query;
    console.log('Received question:', question);

    //SSE 해서 설정(스트리밍 활성화)
    res.setHeader('Content-Type', 'text/event-stream');

    try{
        const response= await openai.chat.completions.create({
            model:'gpt-3.5-turbo',
            messages:[
                {role:'system', content:'You are a helpful assistant.'},
                {role:'user', content:question}
            ],
            stream: true
        });

        for await (const chunk of response) {
            const content = chunk.choices[0].delta.content ||'';
            if (content) {
                res.write(`data: ${JSON.stringfy({ content })}\n\n`)
            }
        }
    }catch {

    }
})
app.listen(port, ()=>{ㅞ
    console.log('서버레디')
})