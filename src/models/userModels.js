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

export default autenticarUsuario