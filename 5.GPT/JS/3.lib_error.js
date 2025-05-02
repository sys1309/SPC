const {OpenAi} = require('openai')
require('dotenv').config({pata:'../env'})


const apikey= process.env.OPENAI_API_KEY
if (!apiKey) {
    console.error('API키가 올바르지 않습니다.');
    process.exit(1);
}

const openai = new OpenAI({
    apikey:apikey
})

async function getGPTresponse(userInput){
    try{
    const response= await openai.chat.completions.create({
    modle:'gpt-3.5-turbo',
    messages:[
        {role:'system', content: 'your are a highly skilled pianist'},
        {role:'user', content: userInput}
    ],                                                                        
    temperature:0.7
    })
    return response.choices[0].content;
    }catch(error) {
        if (error.status) {
            const status = error.status;
            if (status === 429){
                console.error('Error: 요청 한도 초과(크레딧 부족)');
            }else if (status === 401) {
                console.error('error:해당 키에 권한이 없습니다.')
            }else if (status ===) {
                console.error('error:해당 키에 모델을 이용할 권한이 없습니다.')
            }else {
                console.error(`error: 알 수 없느 오류입니다. ${status} - ${error.body}`)
            }
        }
}
}

async function chatWithUser(){
    const userInput = '안녕 챗봇, 나 이제 뭘 해볼까?';
    const chatGPTResponse = await getGPTresponse(userInput);
    console.log('챗봇응답:',chatGPTResponse)
}