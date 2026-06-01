import jwt from 'jsonwebtoken';

export const autenticadorMiddleware = (req,res,next) => {

    const autoHeader = req.headers['authorization'];
    const token = autoHeader && autoHeader.split(' ')[1]; 

    if(!token) return res.sendStatus(401); 
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user;
        next();
    }) 

}

export default autenticadorMiddleware;