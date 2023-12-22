const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // Passe den Pfad zu deiner API-Datei an

swaggerAutogen(outputFile, endpointsFiles)
