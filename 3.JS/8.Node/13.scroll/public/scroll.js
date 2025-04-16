console.log('코딩완료')

fetch('/get-items')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        const myContainer = document.getElementById('scroll-container');
        const item = document.createElement('div');
        item.textContent = data;
        myContainer.appendChild(item)
    });


//미션1. 백엔드에 요청해서 데이터를 받아와서 화면에 랜더링한다 


