import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

const app = express()
app.use(express.json())

dotenv.config()

connectDb();

//COnfigurar cors 
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, calllback){
        console.log(origin);
        if(whiteList.includes(origin)){
            //puede consultar la api
            calllback(null, true)
        }else{
            //No está permitido
            calllback(new Error('Error de Cors'))
        }
    }
}

app.use(cors(corsOptions))

//Routing

app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)



const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})




//Socket IO
import { Server } from 'socket.io'

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,

    }
})

io.on('connection', (socket) => {
    console.log('Conectado a socket.io');

    //Definir los eventos 

    socket.on('abrirProyecto', (proyecto) => {
        socket.join(proyecto);

    })

    socket.on('nueva tarea', tarea => {
        socket.to(tarea.proyecto).emit('tarea agregada', tarea)
    })

    socket.on('eliminar tarea', tarea => {
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit('tarea eliminada', tarea)
    })

    socket.on('actualizar tarea', tarea => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('tarea actualizada', tarea)
    })

    socket.on('cambiar estado', (tarea) => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('nuevo estado', tarea)
    })
})