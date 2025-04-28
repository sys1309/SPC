const tweetBtn = document.getElementById('tweetBtn');

tweetBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    // console.log('버튼 클릭');
    const content = document.getElementById('content').value;

    if (!content.trim()) {
        alert('내용을 입력하세요');
        return;
    }

    const res = fetch('/api/tweet', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(content)
    })

    const data = res.json();
    if(res.ok) {
        showFlash('트윗 작성 완료', 'success')
        setTimeout(() => {
            window.location.href = '/index.html'
        },1000)
    }else {
        showFlash(data.error, 'danger')
        setTimeout(() => {
            window.location.href = '/login.html'
        },1000)
    }
});