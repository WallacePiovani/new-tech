import pool from "../config/db.js"

export const buscarProduto = async (produto) =>{
    const query = "SELECT * FROM produtos WHERE nome_produto LIKE ?"
    const produtoPesquisado = `%${produto}%`;

    const [rows] = await pool.query(query, [produtoPesquisado])

    return rows;
}

