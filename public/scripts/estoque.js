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
    console.log(produtos)
    const retornoPesquisa = document.getElementById('products-return');
    retornoPesquisa.innerHTML = ''
    produtos.forEach((produto) =>{
        const precoNumerico = Number(produto.preco_produto);

        const precoFormatado = precoNumerico.toLocaleString('pt-BR', {
            style:'currency',
            currency: 'BRL'
        })
        retornoPesquisa.innerHTML += `
            <img src="${produto.imagem_url}" width="100px" "></img>
            <h3>${produto.nome_produto}</h3>
            <p>${precoFormatado}</p>
            <p>Em estoque: ${produto.quantidade_produto}</p>
        `
    })
}