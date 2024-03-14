const http = require('http');
const httpProxy = require('http-proxy');

//Definimos instancias
const appServer=[
    {host: 'localhost', port: 3001},
    {host: 'localhost', port: 3002},
    {host: 'localhost', port: 3003},
    {host: 'localhost', port: 3004},
    {host: 'localhost', port: 3005},

]

//Creamos un proxy
const proxy = httpProxy.createProxyServer({});

//Comporbador de estado

//Funcion para comprobar el estado del servidor
function comprobarEstado(server){
    return new Promise((resolve,reject)=>{
        http.get('http://'+server.host+':'+server.port,(res)=>{
            if(res.statusCode === 200){
                resolve();
            }else{
            reject();
            }
        }).on('error',(err)=>{
            reject(err);
        })
    })
}

//Comprobar el estado de las estancias por cada intervalo
const intervalo = 5000
setInterval(eliminarInstancia,intervalo);// 5 Segundos

//Funcion para eliminar una instancia
function eliminarInstancia(){
    appServer.forEach((server,index)=>{
        comprobarEstado(server).then(()=>{
            console.log('Servidor '+server.host+':'+server.port+' en ejecucion')
        })
        .catch(()=>{
            console.log('Eliminando el servidor '+server.host+':'+server.port);
            appServer.splice(index,1);
        });
    });
}

//Crear el servidor para balancear la carga
const server = http.createServer((req,res)=>{
    //Elige aleatoriamente una constante
    const target = appServer[Math.floor(Math.random() * appServer.length)];

    //Redirije la solicitud destino
    proxy.web(req,res,{
        target:'http://'+target.host+':'+target.port
    });
})

//Manejo de errores del proxy
proxy.on('error', (err,req,res)=>{
    console.log('Proxy error: '+err);
    res.writeHead(500,{'Content-Type':'text/plain'});
    res.end('Proxy error.')
})

//Iniciamos el servidor balanceador de carga en el puerto 8000
const port = 8000;
server.listen(port, () =>{
    console.log('Balanceador de carga escuchando en el puerto: '+ port);
})