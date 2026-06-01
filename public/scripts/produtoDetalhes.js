const token = localStorage.getItem('token');
const formEdicao = document.getElementById('form-edicao');
const btnEditar = document.getElementById('btn-editar');
const btnSalvar = document.getElementById('btn-salvar');

const urlParams = new URLSearchParams(window.location.search);
const idProduto = urlParams.get('id');

const inputs = [
    document.getElementById('nome'),
    document.getElementById('preco'),   
    document.getElementById('quantidade'),
    document.getElementById('descricao')
];

async function carregarProduto() {
    if (!idProduto) {
        alert("ID do produto inválido ou não fornecido.");
        window.location.href = 'estoque.html';
        return;
    }

    try {
        const response = await fetch(`/api/produtos/${idProduto}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const produto = await response.json();

        if (!response.ok) throw new Error(produto.message);

        document.getElementById('nome').value = produto.nome_produto;
        document.getElementById('preco').value = produto.preco_produto;
        document.getElementById('quantidade').value = produto.quantidade_produto;
        document.getElementById('descricao').value = produto.descricao_produto;
        document.getElementById('preview-imagem').src = produto.imagem_url;

    } catch (err) {
        alert("Erro ao carregar produto: " + err.message);
        window.location.href = 'estoque.html';
    }
}

btnEditar.addEventListener('click', () => {
    inputs.forEach(input => input.disabled = false); 
    btnEditar.classList.add('d-none');              
    btnSalvar.classList.remove('d-none');           
});

formEdicao.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dadosAtualizados = {
        nome: document.getElementById('nome').value,
        preco: parseFloat(document.getElementById('preco').value),
        quantidade: parseInt(document.getElementById('quantidade').value),
        descricao: document.getElementById('descricao').value
    };

    try {
        const response = await fetch(`/api/produtos/${idProduto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosAtualizados)
        });

        const dados = await response.json();
        if (!response.ok) throw new Error(dados.message);

        alert('Produto atualizado com sucesso!');
        
        inputs.forEach(input => input.disabled = true);
        btnSalvar.classList.add('d-none');
        btnEditar.classList.remove('d-none');

    } catch (err) {
        alert("Erro ao atualizar produto: " + err.message);
    }
});

carregarProduto();