async function fetchTweets() {
    const res= await fetch('/api/tweets');
    return await res.json();
}

async function likeTweet(){
    console.log(`버튼 클릭, ${id}`)
    const res = await fetch(`/api/like/${id}`, {method: 'POST'});
    const data = await res.json();
    if (!res.ok) {
        alert(data.error);
        
    }else {
        //alert(data.message);
        //window.location.href = '/index.html',
        renderTweets();
    }
}

async function renderTweets() {
    const tweets = await fetchTweets();
    console.log(tweets);

    const tweetsDiv = document.getElementById('tweets');
    tweetsDiv.innerHTML = '';

    //여러개의 배열을 조회하면서 하나하나
    tweets.forEach(tweet => {
        const div = document.createElement('div');
        div.classname ='tweet'
        div.innerHTML = `
            <div class= "tweet-body-row">
                <p>${tweet.content}</p>
            </div>
            <div class = "tweet-author">
                <p> ${tweet.username}</p>
            </div>
            <div class = "tweet-action">
            ${tweet.liked_by_current_user ?
                `<button onclick = "unlikeTweet">좋아요 취소</button>
                <p>좋아요수: ${tweet.likes_count}</p>
            </div>
            `}
        `
        tweetsDiv.appendChild(div);
    })
}


document.addEventListener('DOMContentLoaded', renderTweets);