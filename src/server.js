const express = require('express');
const bodyParser = require('body-parser');

const tasks = require('./tasks');
const authentication = require('./authentication');
const app = express();

app.use('/tasks', tasks);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Applikation läuft auf Port: 3000
const port = 3000;
app.listen(port, () => {
    console.log('Tasks Verwaltung App läuft auf Port 3000');
});
