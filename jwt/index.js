const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const SECRET = 'secret'

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/login', function (req, res) {
    if (req.body.name === "ken") {
        const token = jwt.sign({ user: req.body.name }, SECRET, { expiresIn: '1 day' })
        res.redirect('../login')
        res.status(201).send({ token })
    } else {
        res.status(200).send("Fail");
    }
})
app.get('/content', function (req, res) {
    const auth = req.header('Authorization')
    if (typeof auth === "undefined") {
        res.status(401).send({ error: 'Please authenticate.' })
        return
    }
    token = auth.replace('Bearer ', '')
    const decoded = jwt.verify(token, SECRET)
    if (decoded.user == "ken") {
        res.status(200).send("this is your content")
        return
    }
    res.status(401).send({ error: 'Please authenticate.' })
})
app.listen(8080);