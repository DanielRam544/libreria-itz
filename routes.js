const express = require('express');
const librosController = require('./controller/LibrosController');
const usersController = require('./controller/UserController')
const authenticateJWT = require('./authMiddleware');

const router = express.Router();

//Ruta para registrar usuarios
router.post('/users',async (req,res)=>{
    usersController.create(req,res);
})

//Ruta para solicitar token de autentificacion
router.post('/get-token', async(req,res)=>{
    if(Object.keys(req.query).length > 0){
        var request = req.query;
    }else if(Object.keys(req.body).length > 0){
        var request = req.body;
    }
    console.log(request);
    const {email,api_key} = request;
    try {
        const result = await usersController.authenticate(email, api_key);
        res.json(result)
    }catch (error){
        res.status(401).json({error:error.message})
    }
})

//Rutas protegidas

//rutas para el crud de libros
router.get('/libros', authenticateJWT, async(req, res)=>{
    librosController.list(req, res)
})

//ruta para obtener un libro
router.get('/libros/:id', async(req, res)=>{
    librosController.show(req, res)
})

//Ruta para insertar libros
router.post('/libros', async(req, res)=>{
    console.log('Crear libro 1');
    librosController.create(req, res)
})

//Ruta para actualizar un libro
router.put('/libros/:id', async(req, res)=>{
    librosController.update(req, res)
})

//Ruta para eliminar un libro
router.delete('/libros/:id', async(req, res)=>{
    librosController.delete(req, res)
})

router.get('/login',async (req, res)=>{
    usersController.token_login(req, res);
})

router.post('/login',async (req, res)=>{
    usersController.login(req, res);
})

router.post('/agregarSaldo', async (req, res) => {
    usersController.actualizarModalSaldoUsario(req, res)
});

router.post('/logout', async (req, res)=>{
    usersController.logout(req,res);
});

module.exports = router;