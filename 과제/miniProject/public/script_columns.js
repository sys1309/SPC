document.addEventListener('DOMContentLoaded', async() => {
    const response = await fetch('/api/memo');
    const data = await response.json();
    console.log('data:',data)

    displayMemo(data)
})

async function uploadPost() {
    const title = document.getElementById('input-title').value;
    const content = document.getElementById('input-text').value;

    const response = await fetch('/api/memo', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({title, content})
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
    const response = await fetch('/api/memo/delete', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title,content})
    });

    if (response.ok) location.reload();
    else alert('삭제 실패!')
}

function displayMemo(memo) {
    const memoBody = document.querySelector('#card-list');
    memoBody.innerHTML='';

    memo.forEach((txt) => {
        const row = document.createElement('div');
        row.innerHTML= `
            <div class="card">
                <div class = 'view-mode'>
                <a class="card-title">${txt.title}</a>
                <p class="card-text">${txt.content}</p>
                <button type="button" onclick="enableEdit(this, '${txt.title}', '${txt.content}')" class="btn btn-info">수정</button>
                <button type="button" onclick="deletePost('${txt.title}', '${txt.content}')" class="btn btn-warning">삭제</button>
            </div>
            <div class='edit-mode' style='display:none;'>
                <input class = 'form-control edit-title' value='${txt.title}'>
                <textarea class = 'form-control edit-content'>${txt.content}</textarea>
                <button class = 'btn btn-primary' onclick = "saveEdit( this, '${txt.title}', '${txt.content}' )">저장</button>
            </div>
            </div>
            `
            
            memoBody.appendChild(row)
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