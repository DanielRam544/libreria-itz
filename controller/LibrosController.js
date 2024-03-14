var Libros = require('../models/Libros');
const usersController = require('./UserController');

//Definimos el crud de operaciones
exports.create = async function(req, res){
    // console.log(req.query);
    // console.log(req.body);
    // if(Object.keys(req.query).length > 0) {
    //     var request = req.query
    // } else if (Object.keys(req.body).length > 0) {
    //     var request = req.body;
    // }
    // console.log(request)
    try {
        const saldo = await usersController.validaSaldoUsuario(req);
        if(!saldo){
            return res.status(403).json({message:'Usuario sin saldo'});
        }
        var libro = new Libros(req.body);
        await libro.save();
        return res.json(libro);
    }catch(error){
        return res.status(500).json({
            message: 'Error al crear el libro',
            error:error
        })
    }
}

//Funcion para listar libros
exports.list = async function(req, res){
    try{
        const saldo = await usersController.validaSaldoUsuario(req);
        if(!saldo){
            console.log(saldo);
            return res.status(403).json({message:'Usuario sin saldo'});
        }
        const libros = await Libros.find();
        await usersController.actualizarSaldoUsario(req);
        return res.json(libros);
    }catch (error){
        return res.status(500).json({
            message: 'Error al listar los libros',
            error: error.message
        })
    }
}


exports.update = async function(req, res){
    try{
        const libroAct = await Libros.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        if (!libroAct){
            return res.status(404).json({error: 'No se encontro el libro'})
        }else{
        await usersController.actualizarSaldoUsario(req);
            return res.status(200).json({libroAct, msj: 'Libro actualizado'})
        }
    } catch (error){
        return res.status(500).json({
            message: 'Error al actualizar el libro',
            error: error
        })
    }
}

//Funcion para eliminar un libro
exports.delete = async function(req, res){
    try{
        const saldo = await usersController.validaSaldoUsuario(req);
        if(!saldo){
            return res.status(403).json({message:'Usuario sin saldo'});
        }
        const eliminarLibro = await Libros.findByIdAndDelete(req.params.id);
        if (!eliminarLibro){
            return res.status(404).json({error: 'No se encontro el libro'})
        }else {
        await usersController.actualizarSaldoUsario(req);
            return res.status(202).json({msj: 'Libro eliminado'})
        }
    }catch (error){
        return res.status(500).json({
            message: 'Error al eliminar el libro',
            error: error
        })
    }
}

//Funcion para buscar un libro por id
exports.show = async function(req, res){
    try{
        const saldo = await usersController.validaSaldoUsuario(req);
        if(!saldo){
            return res.status(403).json({message:'Usuario sin saldo'});
        }
        const libro = await Libros.findById(req.params.id);
        if (!libro){
            return res.status(404).json({error: 'No se encontro el libro'})
        }else{
        await usersController.actualizarSaldoUsario(req);
            return res.status(200).json(libro,)
        }
    } catch (error){
        return res.status(500).json({
            message: 'Error al mostrar el libro',
            error: error
        })
    }
} 