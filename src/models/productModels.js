import pool from "../config/db.js"

export const buscarProduto = async (produto) =>{
    const query = "SELECT * FROM produtos WHERE nome_produto LIKE ?"
    const produtoPesquisado = `%${produto}%`;

    const [rows] = await pool.query(query, [produtoPesquisado])

    return rows;
}

export const buscarProdutoPorId = async (id) => {
    const query = "SELECT * FROM produtos WHERE id = ?";
    
    const [rows] = await pool.query(query, [id]);
    
    return rows[0]; 
};

export const salvarProduto = async (dadosProduto) => {
    const { nome, preco, descricao, quantidade, imagem } = dadosProduto;
    
    const query = `
        INSERT INTO produtos 
        (nome_produto, preco_produto, descricao_produto, quantidade_produto, imagem_url) 
        VALUES (?, ?, ?, ?, ?)
    `;

    const caminhoCompletoImagem = `/images/${imagem}`; 

    const [resultado] = await pool.query(query, [
        nome,
        preco,
        descricao,
        quantidade,
        caminhoCompletoImagem
    ]);

    return resultado; 
};

export const deletarProduto = async (id) => {
    const query = `DELETE FROM produtos WHERE id = ?`;

    const [resultado] = await pool.query(query, [id]);

    return resultado; 
};

export const atualizarProduto = async (id, dados) => {
    const { nome, preco, quantidade, descricao } = dados;
    
    const query = `
        UPDATE produtos 
        SET nome_produto = ?, preco_produto = ?, quantidade_produto = ?, descricao_produto = ? 
        WHERE id = ?
    `;
    
    const [result] = await pool.query(query, [nome, preco, quantidade, descricao, id]);
    
    return result.affectedRows > 0;
};