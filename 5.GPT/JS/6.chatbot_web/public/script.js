document.addEventListener("DOMContentLoaded", function() {
  const userInputForm = document.getElementById('user-input-form');
  const userInputField = document.getElementById('user-input');
  const chatContainer = document.getElementById('chat-container');

  userInputForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const userInput = userInputField.value;

    //display user input in chat container
    displayMessage(userInput, 'user');
    showLoadingIndicator();

    try{
        //send user message to /api/chat
        const response = await fetch('/api/chat', {
            method:'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ userInput })
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
    `;
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

});