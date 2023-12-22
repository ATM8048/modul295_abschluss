const express = require('express');
const router = express.Router();
const tasks = require('./testdaten');



router.get('/', (request, response) => {
    response.json(tasks);
});

router.get('/:id', (request, response) => {

});

router.post('/', (request, response) => {

});

router.patch('/tasks/:id', (request, response) => {

});
router.delete('/tasks/:id', (request, response) => {

});

module.exports = router;
