var socket = io.connect();

socket.on('second', function (second) {
    $('#second').text(second.second);
});

$(document).ready(function () {
    $('#text').keypress(function (e) {
        socket.emit('client_data', String.fromCharCode(e.charCode));
    });
});