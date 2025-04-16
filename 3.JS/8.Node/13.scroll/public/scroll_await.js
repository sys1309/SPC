console.log('코딩완료')

const Num_of_ITEMS_PER_PAGE = 10;
let start = 0;
let end = start + count;

async function loading() {
    
    const res = await fetch(`/get-items?start=${start}&end=${end}`);

    const data = await res.json();

    const myContainer = document.getElementById('scroll-container');

    data.forEach((d)=> {
        const item = document.createElement('div');
        item.textContent = d;
        item.classList.add('item')
        myContainer.appendChild(item)
    })
    //오래된 돔을 찾아서 지우기 

    //다음 로딩 준비 
    start = end;
    end += Num_of_ITEMS_PER_PAGE;
}

document.addEventListener('DOMContentLoaded',() => {
    loading();
});

window.addEventListener('scroll', ()=> {//스크롤이 마지막에 왔을때 알 수 있어야함 
    // console.log('윈도우 높이:', window.innerHeight);
    // console.log('스크롤 위치:', window.scrollY);
    const endOfscroll = (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight)
    console.log =('화면끝', endOfscroll);
    if (endOfscroll) {
        loading();
    }
})