document.addEventListener("DOMContentLoaded", function() {

    sendButton.addEventListener('click', function(){

        //simple validation check
        if (question.trim() ===""){
            alert("질문을 입력하세요.")
            return;
        }

        //send the question to the backend
        //sse 방식으로 요청..
        const eventSource = new EventSource(`/api/sendQuestionStream?question=${encodeURIComponent(question)}`)

        //응답이 오면??
        eventSource.onmessage=(event) => {
            if (event.data == '[DONE]') {
                console.log('끝')
                eventSource.close();
            }

            const response = JSON.parse(event.data.replace)
        }
    })

    function displayResponse(response){
        const chatContainer =  document.getElementById('chatContainer');
        const responseElement = document.createElement('p');
        responseElement.textContent = response;
        console.log(chatContainer);
        console.log(response);
    }

    function displayResponseStream(response) {
        const chatContainer = document.getElementById('chatContainer');
        chatContainer.textContent +=response;
        
    }
})

const sendBtn = document.getElementById('sendButton');
const sendBtnStream = document.getElementById('sendButtonStream');

async function sendMessageToSever(){
    const response= fetch('/api/chat', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({ question: currentQuestion})
    });
    
    const result = await response.json();
    return result.quesion;
}

sendBtn.addEventListener('click', sendMessageToSever)