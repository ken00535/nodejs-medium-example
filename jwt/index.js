const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/login', function (req, res) {
    console.log(req.body.name)
    console.log(req.body.password)
    res.status(200).send();
})
app.listen(8080);