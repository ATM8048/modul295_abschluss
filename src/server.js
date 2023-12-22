const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const tasks = require('./tasks');
const authentication = require('./authentication');



const app = express();
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/tasks', tasks);
app.use('/', authentication);

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint nicht gefunden' });
});
// Applikation läuft auf Port: 3000
const port = 3000;
app.listen(port, () => {
    console.log('Tasks Verwaltung App läuft auf Port 3000');
});
