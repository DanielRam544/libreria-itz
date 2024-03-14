const express = require('express');
const router = express.Router();

module.exports = function(port){
    router.get('/',(req,res)=>{
        res.send('El puerto de esta app es: '+port);
    });

    return router;
}