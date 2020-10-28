const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const SECRET = 'secret'

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ extended: false }));
app.post('/login', function (req, res) {
    if (req.body.user === "user" && req.body.password === "pass") {
        const token = jwt.sign({ user: req.body.user }, SECRET, { expiresIn: '1 day' })
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
    try {
        const decoded = jwt.verify(token, SECRET)
        if (decoded.user == "ken") {
            res.status(200).send({ location: '/content.html' })
        }
    } catch {
        res.status(401).send({ error: 'Please authenticate.' })
    }
})
app.listen(8080);