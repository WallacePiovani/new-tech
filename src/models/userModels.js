import pool from "../config/db.js"

export const autenticarUsuario = async(usuario) => {
    try{
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username = ?', [usuario]
        )
        return(rows[0])
    }
    catch(err){
        console.log(err)
    }
}

export const buscarProduto = async (produto) =>{
    const produtoPesquisado = `%${produto}`;
    const query = "SELECT * FROM produtos WHERE nome_produto LIKE ?"

    const [rows] = await pool.query(query, [produtoPesquisado])

    return rows;
}

export default autenticarUsuario