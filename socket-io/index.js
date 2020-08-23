const http = require("http");
const io = require('socket.io');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.type('text/plain');
    res.status(200).send('Hello, World.');
})

server = http.createServer(app)
server.listen(8001, () => {
    console.log('Express started')
})

var servIo = io.listen(server);
servIo.on('connection', function (socket) {
    setInterval(function () {
        socket.emit('second', { 'second': new Date().getSeconds() });
    }, 1000);

    socket.on('client_data', function (data) {
        console.log(data);
    });
});