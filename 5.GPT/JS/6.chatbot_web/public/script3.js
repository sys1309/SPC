document.addEventListener("DOMContentLoaded", async function() {
  //기본 채팅 윈도우용 돔 
  const userInputForm = document.getElementById('user-input-form');
  const userInputField = document.getElementById('user-input');
  const chatContainer = document.getElementById('chat-container');
  //세션관리용 돔 
  const sessionListContainer = document.getElementById('session-list-container');
  const currentSessionId = document.getElementById('session')

  userInputForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    submitUserInput();
  }

async function submitUserInput(){  
    const userInput = userInputField.value;
    const sessionId = currentSessionId.textContent;
    //display user input in chat container
    displayMessage(userInput, 'user');
    showLoadingIndicator();

    try{
        //send user message to /api/chat
        const response = await fetch('/api/chat', {
            method:'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ sessionId, userInput })
        });

        hideLoadingIndicator();
        const data = await response.json();

        //display chatbot response
        if (data.message) {
            displayMessage(data.message, "chatbot");
        }else {
            displayMessage('No response from chatbot', 'chatbot');
        }
    } catch (error) {
        console.error('Error', error);
        displayMessage('Error communicating with chatbot.', 'chatbot');
    }
    //Cleaer the input field
    userInputField.value= '';
  });

  function displayMessage(message, sender){
    const messageElement = document.createElement('p');
    messageElement.className= `chat-message ${sender}`
    messageElement.textContent = `${message}`;
    chatContainer.appendChild(messageElement);
    scrollToBottom();
  }

  let loadingMessageDiv = null;

  function showLoadingIndicator(){
    loadingMessageDiv = document.createElement('div');
    loadingMessageDiv.className = 'chat-message chatbot';
    loadingMessageDiv.innerHTML = `
        <div class="message-content">
            <span class="loading-dots"></span> 생각 중 ...
        </div>
    `
    chatContainer.appendChild(loadingMessageDiv);
    scrollToBottom();
}

function hideLoadingIndicator(){ //답변이 생성되면 생각중 지우기 
    if(loadingMessageDiv){
        loadingMessageDiv.remove();
        loadingMessageDiv=null;
    }
}

function scrollToBottom(){
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function appendSession(session){
    const sessionDiv= document.createElement('div');
    sessionDiv.className= 'session-item';
    sessionDiv.innerHTML= `
        <a href="#" class="session-link" data-session-id="${session.id}">
        <div class="session-id">${session.id}</div>
        <div class= "session-start-time">${session.start_time}</div>
        </a>
        `
        sessionListContainer.appendChild(sessionDiv);
}

function addSessionClickListeners(){
    const seesionLinks= document.querySelectorAll('.session-link');
    sessionLinks.forEach(link => {
        link.addEventListener('click', (event) =>{
            event.preventDefault();
            const sessionId = link.dataset.sessionId;
            if (sessionId === currentSessionId.textContent) return;//현재 이미 해당 세션이면 불러오지 않음.
            await showSession(sessionId);
        })
    })
}

function showSession(sessionId){
    const response = await fetch(`/api/sessions/${sessionId}`);
    const data = await response.json();
    chatContainer.innerHTML='';
    console.log(data);
    //새로운 대화 내용 화면에 그리기
    data.conversationhistory.forEach(item=>{
        displayMessage(item.content, item.role);
    })

    displaySessionInfo(data);
}

async function loadAllsessions(){
    const response = await fetch('/api/all-sessions');
    const data = await response.json();
    console.log(data);
    sessionListContainer.innerHTML='';
    data.allSessions.forEach(appendSession);
    addSessionClickListeners();
}

//새 세션 만들기
const newChatButton = document.getElementById('new-chat-button');
newChatButton.addEventListener('click', async function(){
    const response = await fetch('/api/new-session', {method:'POST'});
    const data = await response.json();
    if (data.success){
        loadAllsessions();
    }
})

function displaySessionInfo(sessionData){
    currentSessionId.textContent= sessionData.id;
};

async function loadChatHistoryAndSession(){
    const sessionResponse = await fetch('/api/current-session');
    const data = await response.json();

    //data.conversationHistory.forEach(appendMessage);
}
//시작 할때 세션 목록 호출
await loadAllsessions();
//시작 할때 현재 세션 대화 내용 호출
await loadChatHistoryAndSession();

});