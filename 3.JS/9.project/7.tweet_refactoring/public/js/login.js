const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async() => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/api/login', {
        method:'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({ email, password })
    });

    if (res.ok) { //res.status_code == 200 연결 비교하거나,
        const message = await res.json()
        showFlash(data.message, 'success')
        setTimeout(() => {
            window.location.href = '/index.html'
        }, 1000)
    } else {
        const error = await res.json();
        showFlash(data.error, 'danger')
        setTimeout(() => {
            window.location.href = '/login.html'
        },1000)
    }
});

async function logout(){
    const res = await fetch('/api/logout', {method:'POST'});
    const data = await res.json();
    alert(data.message)
}
