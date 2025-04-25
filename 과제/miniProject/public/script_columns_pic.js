document.addEventListener('DOMContentLoaded', async() => {
    const response = await fetch('/api/memo_pic');
    const data = await response.json();
    console.log(data);
    displayMemo([data])
})

async function uploadPost() {
    const title = document.getElementById('input-title').value;
    const content = document.getElementById('input-text').value;
    const picInput = document.getElementById('input-file').files[0];

    // console.log(picInput)

    const formData = new FormData();
    formData.append('title', title)
    formData.append('content', content)
    formData.append('pic', picInput)

    const response = await fetch('/api/memo_pic', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        const newMemo = await response.json();
        displayMemo([newMemo]);
        console.log('받은 메모',newMemo)
        clearForm();
    } else {
        alert('메모 저장 실패');
    }
    location.reload();
}

async function deletePost(title, content){
    const response = await fetch('/api/memo_pic/delete', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title,content})
    });

    if (response.ok) location.reload();
    else alert('삭제 실패!')
}

function displayMemo(memos) {
    const memoBody = document.querySelector('#card-list');
    // memoBody.innerHTML='';

    memos.forEach((memo) => {
        const row = document.createElement('div');
        console.log({memo});
        console.log(memo[0].title);
        row.innerHTML= `
            <div class="card">
                <div class = 'view-mode'>
                <img src="${memo.img_path}" alt="업로드 이미지" class="card-img" />
                <a class="card-title">${memo.title}</a>
                <p class="card-text">${memo.content}</p>
                <button type="button" onclick="enableEdit(this, '${memo.title}', '${memo.content}')" class="btn btn-info">수정</button>
                <button type="button" onclick="deletePost('${memo.title}', '${memo.content}')" class="btn btn-warning">삭제</button>
            </div>
            <div class='edit-mode' style='display:none;'>
                <input class = 'form-control edit-title' value='${memo.title}'>
                <textarea class = 'form-control edit-content'>${memo.content}</textarea>
                <button class = 'btn btn-primary' onclick = "saveEdit( this, '${memo.title}', '${memo.content}' )">저장</button>
            </div>
            </div>
            `
            
            memoBody.appendChild(row);
            // memoBody.prepend(row);
    })
}

function clearForm() {
    document.getElementById('input-title').value= '';
    document.getElementById('input-text').value= '';
}


function enableEdit(button, title, content) {
    const card = button.closest('.card');
    const viewMode = card.querySelector('.view-mode');
    const editMode = card.querySelector('.edit-mode');

    viewMode.style.display = 'none';
    editMode.style.display = 'block';
}

async function saveEdit(button, title, content) {
    const card = button.closest('.card');
    const newTitle = card.querySelector('.edit-title').value;
    const newContent = card.querySelector('.edit-content').value;

    const response = await fetch('/api/memo/update', {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            title,
            content,
            newTitle,
            newContent
        })
    })

    if (response.ok) {
        const updatedMemo = await response.json();
        displayMemo([updatedMemo]);
    }else {
        alert('수정 실패!')
    }
}