const express = require('express');
const router = express.Router();
let tasks = require('./testdaten');
const { randomUUID } = require('node:crypto');


router.get('/', (request, response) => {

    try {
        if (request.session.authenticated) {
            response.json(tasks);
            // Hier wird die Antwort bereits gesendet
            // Versuche, danach keine weiteren Header zu setzen
            response.status(200); // Dies würde den Fehler auslösen
        } else {
            response.status(403).json("Keine Berechtigungen für das");
        }
    } catch (err) {
        response.status(500).json(err);
    }

});

router.get('/:id', (request, response) => {
    try {
        if (request.session.authenticated) {
            if (tasks.find((task) => task.id === request.params.id)) {
                response.send(tasks.find((task) => task.id === request.params.id))
            } else {
                response.status(404);
            }
        } else {
            response.status(403).json("Keine Berechtigungen für das");
        }
    } catch (err) {
        response.status(500).json(err);
    }

});

router.post('/', (request, response) => {
    try {
        if (request.session.authenticated) {
            let newBook = request.body;
            newBook['id'] = randomUUID();

            if (!newBook['Titel'] || !newBook['Autor']) {
                return response.status(422).send("Titel and Autor are required!");
            };

            tasks = [...tasks, newBook];
            response.status(201).send(newBook);
        } else {
            response.status(403).json("Keine Berechtigungen für das");
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
            keys.forEach((key) => oldTask[key] = request.body[key]);
            tasks = tasks.map((task) => task.id === request.params.id ? oldTask : task);
            response.send(oldTask);
        } else {
            response.status(403).json("Keine Berechtigungen für das");
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

            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);

                response.status(204).json();
            }
        } else {
            response.status(403).json("Keine Berechtigungen für das");
        }
    } catch (err) {
        response.status(500).json(err);
    }

});

module.exports = router;
