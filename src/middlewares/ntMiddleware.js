import jwt from 'jsonwebtoken';

const autenticadorMiddleware = (req,res,next) => {

    //1- precisa verificar se o token de autenticação está presente no cabeçalho da requisição (O token é enviado para o cabeçalho da requisição)
    const autoHeader = req.headers['authorization'];
    const token = autoHeader && autoHeader.split(' ')[1]; 

    if(!token) return res.sendStatus(401); // isso aqui é pro caso do token não estiver cadastro ou não tiver sido enviado

    //2- se o token não estiver presente, a função deve retornar um erro de autenticação (401 Unauthorized)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);

        //3- se o token for válido, a função deve permitir que a requisição prossiga para o próximo middleware ou rota (next())
        req.user = user;
        next();
    }) 

}