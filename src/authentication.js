/* eslint-disable indent */
const express = require('express');

const router = express.Router();

// Login mit Cookies
router.post('/login', (request, response) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Sich Einlogen'
    try {
        const { email, password } = request.body;

        // Überprüfe, ob eine Email und ein Passwort angegeben wurden
        if (email && password === 'm295') {
            // Überprüfe, ob die Email mindestens ein "@"-Symbol enthält
            if (email.includes('@')) {
                // Markiere die Session als authentifiziert und speichere die E-Mail
                request.session.authenticated = true;
                request.session.email = email;

                return response.status(201).send('Erfolgreich eingeloggt!');
            }
            // Falls die Email kein "@"-Symbol enthält
            return response.status(401).send('Ungültige Email-Adresse');
        }
        // Falls eine Email oder ein Passwort fehlt
        return response.status(401).send('Ungültige Anmeldeinformationen');
    } catch (err) {
        response.sendStatus(500).send(err);
    }
});

router.get('/verify', (request, response) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Login verifizieren'
    try {
        // Überprüfe, ob die Session als authentifiziert markiert ist und die E-Mail vorhanden ist
        if (request.session.authenticated && request.session.email) {
            return response.status(200).json(`Geschützte Ressource zugänglich für ${request.session.email}`);
        }
        return response.status(401).json('Unzureichende Berechtigungen');
    } catch (err) {
        response.sendStatus(500).send(err);
    }
});

router.delete('/logout', (request, response) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Sich Auslogen'
    try {
        // Markiere die gesamte Session als nicht authentifiziert
        request.session.authenticated = false;
        // Zerstöre die Session, um alle Session-Daten zu löschen
        request.session.destroy((err) => {
            if (err) {
                return response.status(500).send('Fehler beim Ausloggen');
            }
            // Senden Sie den Statuscode 204 (No Content) zurück, da keine Antwortdaten vorhanden sind
            return response.status(204).end();
        });
    } catch (err) {
        response.sendStatus(500).send(err);
    }
});

module.exports = router;
