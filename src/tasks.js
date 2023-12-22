/* eslint-disable indent */
const express = require('express');

const { randomUUID } = require('node:crypto');

const router = express.Router();
let tasks = require('./testdaten');

router.get('/', (request, response) => {
    try {
        if (request.session.authenticated) {
            response.json(tasks);
            // Hier wird die Antwort bereits gesendet
            // Versuche, danach keine weiteren Header zu setzen
            response.status(200); // Dies würde den Fehler auslösen
        } else {
            response.status(403).json('Keine Berechtigungen für das');
        }
    } catch (err) {
        response.status(500).json(err);
    }
});

router.get('/:id', (request, response) => {
    try {
        if (request.session.authenticated) {
            if (tasks.find((task) => task.id === request.params.id)) {
                response.send(tasks.find((task) => task.id === request.params.id));
            } else {
                response.status(404).json('Task nicht gefunden');
            }
        } else {
            response.status(403).json('Keine Berechtigungen für das');
        }
    } catch (err) {
        response.status(500).json(err);
    }
});

// eslint-disable-next-line consistent-return
router.post('/', (request, response) => {
    try {
        if (request.session.authenticated) {
            const newBook = request.body;
            newBook.id = randomUUID();

            if (!newBook.Titel || !newBook.Autor) {
                return response.status(422).send('Titel and Autor are required!');
            }
            tasks = [...tasks, newBook];
            response.status(201).send(newBook);
        } else {
            response.status(403).json('Keine Berechtigungen für das');
        }
    } catch (err) {
        response.status(500).json(err);
    }
});

router.patch('/:id', (request, response) => {
    try {
        if (request.session.authenticated) {
            const keys = Object.keys(request.body);
            const oldTask = tasks.find((task) => task.id === request.params.id);

            if ('Titel' in request.body && request.body.Titel.trim() !== '') {
                // Überprüfe, ob der Titel vorhanden und nicht leer ist
                // eslint-disable-next-line no-return-assign
                keys.forEach((key) => oldTask[key] = request.body[key]);
                // eslint-disable-next-line no-confusing-arrow
                tasks = tasks.map((task) => task.id === request.params.id ? oldTask : task);
                response.send(oldTask);
            } else {
                response.status(422).json('Der Titel darf nicht leer sein.');
            }
        } else {
            response.status(403).json('Keine Berechtigungen für das');
        }
    } catch (err) {
        response.status(500).json(err);
    }
});
router.delete('/:id', (request, response) => {
    try {
        if (request.session.authenticated) {
            const taskId = request.params.id;
            const taskIndex = tasks.findIndex((task) => task.id === taskId);

            if (taskIndex === -1) {
                response.status(404).json();
            } else {
                tasks.splice(taskIndex, 1);

                response.status(204).json();
            }
        } else {
            response.status(403).json('Keine Berechtigungen für das');
        }
    } catch (err) {
        response.status(500).json(err);
    }
});

module.exports = router;
