const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');
const {SwaggerTheme} = require('swagger-themes')


require('./db');

const routes = require('./routes')

//iniciamos el servidor
const app = express();
const port = 3000;

//Motor de plantillas ejs
app.use(bodyParser.urlencoded({extended:true}));
const path = require('path');
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

//Limitar las conexiones por tiempo determinado
const limiter = rateLimit({
    windowMs: 1*60*1000,
    max: 100,
    message: 'Limite de intentos.',
});

app.use(limiter);

//parseamos a formato json los datos que nos llegan
app.use(bodyParser.json());

app.use(limiter);

app.use(bodyParser.json({limit:'50kb'}));

app.use(routes)

//iniciamos el servidor
// app.listen(port, () => {
//     console.log(`Server corriendo en el ${port}`);
// });

const theme = new SwaggerTheme();

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Servicio REST de Libros ITZ',
            description: 'API REST para administrar libros',
            version: '1.0.0',
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: 'Pon el token de seguridad en la solicitud',
            },
        },
        swagger_ui: {
            theme: 'dark', 
        },
    },
    apis: ['doc.js'],
};

const options = {
    explorer: true,
    customCss: theme.getBuffer('dark'), 
};


//INICIAMOS LA DOCUMENTACION DE NUESTRO SERVICIO
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/libreria-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));


// //INICIAMOS EL SERVIDOR
// app.listen(port, () => {
//     console.log(`Server corriendo en el ${port}`);
// });

//Exportamos la app para que pueda ser utilizada
module.exports = app;