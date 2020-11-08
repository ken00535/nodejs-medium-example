const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const SECRET = 'secret'

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    const auth = req.header('Authorization')
    if (typeof auth === "undefined") {
        res.render('index', { username: "" });
        return
    }
    token = auth.replace('Bearer ', '')
    try {
        const decoded = jwt.verify(token, SECRET)
        if (decoded.user == "user") {
            res.render('index', {
                username: decoded.user
            });
        }
    } catch {
        res.status(401).render('index', {});
    }
})

app.post('/login', function (req, res) {
    if (req.body.username === "user" && req.body.password === "pass") {
        const token = jwt.sign({ user: req.body.username }, SECRET, { expiresIn: '1 day' })
        res.json({
            token
        });
    } else {
        res.redirect('/');
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
        if (decoded.user == "user") {
            res.status(200).send({ data: 'Welcome!' })
        }
    } catch {
        res.status(401).send({ error: 'Please authenticate.' })
    }
})

app.listen(8080);