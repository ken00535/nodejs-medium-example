var http = require("http");
var fs = require('fs');
var io = require('socket.io');
var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.type('text/plain');
    res.status(200).send('Hello, World.');
})
app.get('/socket.html', function (req, res) {
    var path = req.path;
    fs.readFile(__dirname + path, function (error, data) {
        if (error) {
            res.status(404).send("opps this doesn't exist");
        } else {
            res.type('text/html');
            res.status(200).send(data);
        }
    });
})

server = http.createServer(app)
server.listen(8001, () => {
    console.log('Express started')
})

var servIo = io.listen(server);
servIo.on('connection', function (socket) {
    setInterval(function () {
        socket.emit('date', { 'date': new Date() });
    }, 1000);

    socket.on('client_data', function (data) {
        console.log(data);
    });
});