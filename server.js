const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

// Učitaj statičke fajlove iz 'public' direktorijuma
app.use(express.static('public'));

// Kada se korisnik poveže
io.on('connection', (socket) => {
    console.log('Novi korisnik povezan');

    // Kada korisnik pošalje poruku
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Emituj poruku svim korisnicima
    });

    socket.on('disconnect', () => {
        console.log('Korisnik je isključen');
    });
});

// Pokreni server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
