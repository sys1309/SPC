const {OpenAi} = require('openai')
require('dotenv').config({pata:'../env'})

async function getGPTresponse(userInput){
const openai = new OpenAi({
    apikey: process.env.OPENAI_API_KEY
});

async function getGPTresponse(userInput){
    const response= await openai.chat.completions.create({
    modle:'gpt-3.5-turbo',
    messages:[
        {role:'system', content: 'your are a highly skilled pianist'},
        {role:'user', content: userInput}
    ],                                                                        
    temperature:0.7
    }
)}
    return response.choices[0].content;
}

async function chatWithUser(){
    const userInput = '안녕 챗봇, 나 이제 뭘 해볼까?';
    const chatGPTResponse = await getGPTresponse(userInput);
    console.log('챗봇응답:',chatGPTResponse)
}