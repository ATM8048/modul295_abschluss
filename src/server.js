/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
// Hier sind die Module, die man braucht.
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const tasks = require('./tasks');
const authentication = require('./authentication');

const app = express();
// für Api Dokumentation
const swaggerDocument = require('../swagger.json');
// Für Cookie
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {},
}));
// Sachen die, die Applikation braucht.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/tasks', tasks); // alle Endpoints von Tasks
app.use('/', authentication); // alle Endpoints von Auth
// Endpoints für Dokumentation und alle andere Endpoint werden entgegengenommen
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint nicht gefunden' });
});

// Applikation läuft auf Port: 3000
const port = 3000;
app.listen(port, () => {
    console.log('Tasks Verwaltung App läuft auf Port 3000');
});
