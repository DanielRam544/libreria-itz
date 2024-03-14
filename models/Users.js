const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Función para generar una cadena aleatoria alfanumérica
const generaApiKey = () => {
    const characters = "OQWIEJQWOIEkdamsdaOFANSODnsoajfn12364584";
    let apiKey = '';
    for (let i = 0; i < 15; i++) {
        apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return apiKey;
}

// Definimos el esquema de los usuarios
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    api_key: { type: String, required: true, unique: true, default: generaApiKey }, // Llamamos a la función generaApiKey
    saldo: { type: Number, default: 5 },
});

// Middleware para generar la api_Key antes de guardar un nuevo usuario
userSchema.pre('save', function (next) {
    if (!this.api_key) {
        this.api_key = generaApiKey();
    }
    next();
});

// Definimos el modelo del usuario
const User = mongoose.model('User', userSchema);
module.exports = User;
