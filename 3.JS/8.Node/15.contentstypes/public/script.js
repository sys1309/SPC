console.log('js로딩')

document.getElementById('jsonSendBtn').addEventListener('click', async() => {
    const data = document.getElementById('jsonInput').value;
    const res = await fetch('/submit/json', {
        method:'POST',
        headers: {'Content=Type':'application/json'},
        body: data
    });

    //미션2. response의 바디를 프론트엔드에 출력하시오 
    //const reply = await res.text();
    const reply = await res.json();
    // const replyobject = JSON.parse(reply);
    //console.log(replyobject) // 문자열을 객체로 

    const output = document.getElementById('output');
    //output.innerText = replyObject;
    output.innerText= JSON.stringify(reply);
})

document.getElementById('formSubmit').addEventListener('click', async(ev) => {
    ev.preventDefault();

    const name = document.getElementById('formName').value;
    const age = document.getElementById('formAge').value;

    //json으로 변환해서 보내기
    // const jsonData = {
    //     name: name,
    //     age: age
    // }

    // const res = await fetch('/submit-form', {
    //     method:'POST',
    //     headers: {'Content-Type':'application/json'},
    //     body: JSON.stringify(jsonData)
    // })

    const params = new URLSearchParams();
    params.append('name',name);
    params.append('age',age);

    const res = await fetch('/submit-form', {
        method: 'POST',
        headers : {'Content-Type' : 'application/json'}
    })
})

document.getElementById('sendTextBtn')/addEventListener('click', async() => {
    const text = document.getElementById('textInput').value;

    const res = await fetch('/submit-text', {
        method:'POST',
        headers : {'Content-Type' : 'text/plain'},
        body: text
    });
    //console.log('문자 보내기 버튼 클릭')
})