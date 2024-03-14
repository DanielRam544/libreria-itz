const cluster = require('cluster');
const os = require('os');
const app = require('./index');
const http = require('http');
const { workerData } = require('worker_threads');

//Obtener el num de cpus de equipo
const numCPUs = os.cpus().length;
console.log('Numero de cpus: '+numCPUs);

const numWorkers = 3;//Definimos el numero de replcias

//Definimos cluster maestro

if(cluster.isMaster){
    console.log('Cluster maestro: '+process.pid+' esta en ejecucion');

    //definimos el numero de replcias
    for(let i=0; i<Math.min(numWorkers, numCPUs);i++){
        //Limitamos el numero de workers al minimo
        cluster.fork();
    }

    cluster.on('exit',(worker,code,signal)=>{
        console.log('Worker '+worker.process.pid+' fallo')
        //Se reinicia el worker en caso de falla
        cluster.fork();
    })
}else{
    //Para iniciar la aplicaicon worker
    const port = 3000 + cluster.worker.id;
    app.use('/',require('./prueba_rutas')(port));
    app.listen(port, ()=>{
        console.log('Servidor corriendo en: ' +port);
        console.log('Worker inicado con el pdi: '+process.pid);
        console.log('Worker ID: '+cluster.worker.id)
    })

}