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
    .then(res => res.json())
    .then(dados => renderizarProdutos(dados))
    .catch(err => console.error("Erro no teste", err))

})

    function renderizarProdutos(produtos){
        //console.log(produtos)
        const retornoPesquisa = document.getElementById('products-return');
        retornoPesquisa.innerHTML = ''
        produtos.forEach((produto) =>{
            retornoPesquisa.innerHTML += `
                <img src="${produto.imagem_url}" width="100px" "></img>
                <h3>${produto.nome_produto}</h3>
                <p>${produto.preco_produto}</p>
            `
        })

    }