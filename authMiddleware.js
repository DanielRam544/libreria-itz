const jwt = require('jsonwebtoken');

//midelware de autentificacion, utilizanso jwt
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({error: 'Acceso no autorizado'});
    jwt.verify(token, 'tu-secreta',(err, user)=>{
        if(err) return res.status(403).json({error: 'Token no valido'});
        req.user = user;
        next();
    });
}

module.exports = authenticateJWT;