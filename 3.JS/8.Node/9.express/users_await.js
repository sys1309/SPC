document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById('form');
    const name = document.getElementById('username');
    const userTable = document.getElementById('userTable');

    //최초 페이지가 호출될때, 백엔드에 데이터 요청
    updateTable();

    form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const name = username.value;

        console.log('생성할 이름:',name);
        const res = await fetch('/users', {
            method: 'post',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify({name})
        })

        //미션1. 입력 끝났으면 비우기 (clear)
        username.value = ''
        updateTable();
    })

    //버튼을 만들고 콜백 함수 등록하는 함수를 만드는 중 
    function createButton(text, clickHandler){
        const button = document.createElement('button');
        button.textContent = text
        button.addEventListener('click', clickHandler);
        return button;
    }


    function updateTable(){
        userTable.innerHTML=''; //이전 내용 삭제 

        const res = await fetch('/users');
        const users = await res.json();

        for(const key in users) {
            const row= document.createElement('div');
            row.innerHTML = `
                <strong>ID</strong> ${key},
                <strong>name</strong> ${users[key]}
                `
                //버튼 만들기 함수 호출
                row.appendChild(createButton('수정',()=>editUser(key)));
                row.appendChild(createButton('삭제',()=>deleteUser(key)));

                userTable.appendChild(row);
        }}
            
    

    function editUser(userId) {
        const newName = prompt('수정할 이름을 입력하세요.'); 
        try{
        const await = fetch('/users', {
            method: 'put',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify({name : newName})
            })
            
            if(!res.ok) throw new Error('수정실패');
            alert('수정 성공');
            updateTable();
        } catch(error) {
                alert('수정 중 오류 발생');
            };

        updateTable(); //화면 갱신 
    

    function deleteUser(userId) {
        const confirmDelete = confirm('정말로 삭제 하시겠습니까ㅏ');
        if (confirmDelete){
            fetch(`users/${userId}`, {
                method: 'delete'
            })
                .then(res => {
                    if (!res.ok) throw new Error('삭제 실패');
                    alert('삭제성공');
                })
                .catch(error => {
                    console.error('삭제중 오류발생',error);
                    alert('삭제중 오류 발생');
                })
        }else {
            alert('장난 치지 마세요.. ')
        }
        updateTable();
    }

    //미션2. 입력이 끝났으면 서버에 정보를 요청해서 화면에 표시하기 
    //미션3. 사용자 목록에 '수정' '삭제'버튼 추가하기

    //미션4. 
});  