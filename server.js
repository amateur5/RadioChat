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
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Drži listu korisnika
let users = [];
let djNick = "Radio Galaksija"; // Fiksni nadimak DJ-a

// Prijem poruka
io.on('connection', (socket) => {
    // Dodeljivanje broja gostima
    const userId = users.length + 1; // Dodeljuje jedinstveni ID svakom korisniku
    users.push({ id: userId, socketId: socket.id, nickname: `Guest${userId}` });

    // Obaveštava sve o novom korisniku
    io.emit('userList', users.map(user => user.nickname));

    // Kada korisnik pošalje poruku
    socket.on('sendMessage', (msg) => {
        io.emit('message', { user: msg.user, text: msg.text });
    });

    // Kada se korisnik odjavi
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('userList', users.map(user => user.nickname));
    });

    // Kada se DJ preuzme
    socket.on('takeOver', (newDj) => {
        if (newDj === 'secret-code') {
            djNick = newDj; // Dodeljuje novi nadimak
            io.emit('message', { user: 'System', text: `${djNick} je preuzeo kontrolu.` });
        }
    });
});

// Slanje liste korisnika na konekciju
io.emit('userList', users.map(user => user.nickname));

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
