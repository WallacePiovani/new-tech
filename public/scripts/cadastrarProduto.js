const formCadastro = document.getElementById('form-cadastro');
const token = localStorage.getItem('token');

formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputImagem = document.getElementById('imagem'); 
    const arquivoImagem = inputImagem.files[0];

    const formData = new FormData();

    formData.append('nome', document.getElementById('nome').value);
    formData.append('preco', document.getElementById('preco').value);
    formData.append('quantidade', document.getElementById('quantidade').value);
    formData.append('descricao', document.getElementById('descricao').value);
    formData.append('imagem', arquivoImagem); 

    try {
        const response = await fetch('/api/produtos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        const dados = await response.json();

        if (!response.ok) {
            throw new Error(dados.message || 'Erro ao cadastrar produto');
        }


        alert('Produto cadastrado com sucesso!');
        formCadastro.reset();

    } catch (err) {
        alert(err.message);
    }
});