const axios = require('axios')
require('dotenv').config({path:'../.env'}) // env. 파일 읽어서 메모리에 올리기

const opeanaiapikey= process.env.OPENAI_API_KEY;

// console.log(opeanaiapikey);

// const url = 'https://api.openai.com/v2/response';
const url = 'https://api.openai.com/v1/chat/completions';

async function getGPTresponse() {

    const response = await axios.post(url, {
    //본문
        "model": "gpt-3.5-turbo",
        "messages": [
            // {'role':'system', 'content':'you are a cook'}
            {'role':'system', 'content':'you are a helpful assistance'},
            {'role':'user', 'content':'수업중인데 너무 졸려 어떻게 하면 잠을 깰 수 있을까?. 한문장으로 답해줘.'}
        ],
        temperature: 1.0, //2.0에 가까워질 수록 창의성이 높아짐(무작위로 나옴)
        top_p : 0.9, //확률기반 토큰 선택 범위 
        frequency_penalty: 0.5,
        presence_penality: 0.0,
        max_tokens: 1000
    },
    {   
    //헤더
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${opeanaiapikey}`
        }
    })

    return await response.data.choices[0].message;
}

async function myFunction(){
    const ai_response = await getGPTresponse();
    console.log(ai_response)

}

myFunction();