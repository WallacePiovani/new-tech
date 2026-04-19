import * as userModels from '../models/userModels.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const controllerLoginAuth = async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    try{
        const result = await userModels.autenticarUsuario(username);
        if(!result){
            return res.status(401).json({message:'Usuário ou senha invalida!'});
        };
        const senhaValida = await bcrypt.compare(password, result.password_hash);
        
        if(!senhaValida){
            return res.status(401).json({message:'Usuário ou senha invalida!'});
        }

        const payload = {
            id: result.id,
            username: result.username
        };

        const secret = process.env.JWT_SECRET;
        const options = {expiresIn: '1h'}
        const token = jwt.sign(payload,secret,options)

        return res.status(200).json({
            message: 'Login efetuado com sucesso!',
            token: token
        })

    }
    catch(err){
        console.log(err)
    }
}