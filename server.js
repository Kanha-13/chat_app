const express = require('express')
const app = express();

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

const http = require('http').createServer(app)

//middleware
app.use(express.static(__dirname+'/public'))

const PORT = process.env.PORT||3000;

//listner
http.listen(PORT,console.log(`listening on port ${PORT}`));

//socket
const io =require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log('connected...')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})