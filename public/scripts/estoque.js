const formSearch = document.getElementById('form-search');
const token = localStorage.getItem('token');

formSearch.addEventListener('submit', (e) =>{
    e.preventDefault();
    const term = document.getElementById('term-search').value;
    //console.log(term)
    fetch (`/api/produtos?term-search=${term}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res =>{
        if (!res.ok){
            return res.json().then(err =>{
                throw err;
            });
        };
        return res.json();
    })
    .then(dados => renderizarProdutos(dados))
    .catch(err =>{
        if(err.message){
            alert(err.message);
        }
        else{
            alert('Erro ao buscar produtos!');
        }
    })    
})

function renderizarProdutos(produtos){
    //console.log(produtos)
    const retornoPesquisa = document.getElementById('products-return');
    retornoPesquisa.innerHTML = ''
    produtos.forEach((produto) =>{
        const precoNumerico = Number(produto.preco_produto);

        const precoFormatado = precoNumerico.toLocaleString('pt-BR', {
            style:'currency',
            currency: 'BRL'
        })
        retornoPesquisa.innerHTML += `
            <div class="card col col-6" style="width: 18rem;">
                <img src="${produto.imagem_url}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome_produto}</h5>
                    <p>${precoFormatado}</p>
                    <p>Em estoque: ${produto.quantidade_produto}</p>
                    <a href="produtoDetalhes.html?id=${produto.id}" class="btn btn-outline-primary mb-2">Visualizar Produto</a>
                    <button class="btn btn-outline-danger btn-deletar" data-id="${produto.id}">Excluir Produto</button>
                </div>
            </div>
        `
    })

    retornoPesquisa.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-deletar')) {

        const id = parseInt(e.target.getAttribute('data-id'), 10)
        
        if (confirm("Tem certeza que deseja excluir este produto?")) {
            try {
                const response = await fetch(`/api/produtos/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                const dados = await response.json();
                if (!response.ok) throw new Error(dados.message);
                
                alert('Produto excluído!');
                e.target.closest('.card').remove(); 
                
            } catch (err) {
                alert(err.message);
            }
        }
    }
});
}