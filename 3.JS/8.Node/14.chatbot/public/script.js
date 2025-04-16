//미션1. 저 영역을 클릭해서 창이 나오게 한다
//미션2. X박스를 눌러서 다시 창이 닫히게 한다
//미션3. send 버튼을 통해서 사용자가 입력한 대화내용을 전송/ 엔터로도 입력되게 
//미션4. 받아온 응답을 대화창 중간에 출력

const chatbotIcon = document.getElementById('chatbotIcon');
const chatbotWindow = document.getElementById('chabotWindow');
const closeChatbot = document.getElementById('closeChatbot');
const sendMessage = document.getElementById('sendMessage');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotmessage = document.getElementById('chatbotmessage')

chatbotIcon.addEventListener('click', ()=>{
    chatbotIcon.style.display = 'none';
    chatbotWindow.style.display = 'flex';
})

closeChatbot.addEventListener('click', ()=>{
    chatbotIcon.style.display = 'flex';
    chatbotWindow.style.display = 'none';
})

async function sendMessageToserver(){
    const resp = await fetch('/api/chat', {
        method:'POST',
        header :{'Content-Type': 'application/json'},
        body: json.stringfy({"question":question}),
    });
    const result = await resp.json();

    const answer = document.createElement('div');
    answer.innerHTML = result.question;

    chatbotmessage.appendChild(answer);
}

sendMessage.addEventListener('click',()=>{
    console.log('버튼클릭');
    const question = chatbotInput.value;

    //메세지 지우기
    chatbotInput.value='';

    //화면에 메세지 추가
    const myMessage = document.createElement('div');
    chatbotmessage.innerHTML = result.question;

    chatbotmessage.appendChild(answer);
});
    //서버로 보낸다
    // fetch('/api/chat', {
    //     method:'POST',
    //     header :{'Content-Type': 'application/json'},
    //     body: json.stringfy({"question":question}),
    // })
    // .then(resp => resp.json())
    // .then(resp => console.log(resp))



chatbotInput.addEventListener('keypress', () => {
    if (e.key === 'Enter') {
        console.log('엔터키 눌렀으나 ~~~')
    }
    console.log('키보드')
})