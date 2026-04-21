
const formLogin = document.getElementById('login--form')


formLogin.addEventListener('submit', async (e) =>{
    e.preventDefault();
    console.log('evento capturado!')
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value

    try{
        const response = await fetch('/api/auth/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        })
        const data = await response.json();

        if (response.ok){
            console.log('Login efetuado com sucesso!', data.message);
            localStorage.setItem('token', data.token);
            window.location.replace('/estoque.html');
        }
        else{
            alert(data.message || 'Erro ao realizar login!');
        }
    }
    catch(err){
        console.error('Erro de requisição', err)
        alert('Não foi possível conectar ao servidor');
    }



})