const express = require('express');
const router = express.Router();
const tasks = require('./testdaten');
const { randomUUID } = require('node:crypto');


router.get('/', (request, response) => {
    response.json(tasks);
});

router.get('/:id', (request, response) => {
    if (tasks.find((task) => task.id === request.params.id)) {
        response.send(tasks.find((task) => task.id === request.params.id))
    } else {
        response.sendStatus(404);
    }
});

router.post('/', (request, response) => {
    const newBook = request.body;
    newBook['id'] = randomUUID();

    if (!newBook['Titel'] || !newBook['Autor']) {
        return response.status(422).send("Titel and Autor are required!");
    };

    tasks = [...tasks, newBook];
    response.status(201).send(newBook);
});

router.patch('/:id', (request, response) => {
    const keys = Object.keys(request.body);
    const oldTask = tasks.find((task) => task.id === request.params.id);
    keys.forEach((key) => oldTask[key] = request.body[key]);
    tasks = tasks.map((task) => task.id === request.params.id ? oldTask : task);
    response.send(oldTask);
});
router.delete('/:id', (request, response) => {
    const taskId = request.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);

        response.status(204).send();
    }
});

module.exports = router;
