const socket = io();

const djNick = 'Radio Galaksija'; // Fiksni nadimak DJ-a
let users = []; // Lista korisnika

// Prikaz liste korisnika
socket.on('userList', (userList) => {
    users = userList; // Ažuriraj listu korisnika
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // Očisti listu
    userListElement.innerHTML += `<li><strong>${djNick}</strong> (DJ)</li>`; // Dodaj DJ-a na vrh liste
    // Dodaj ostale korisnike
    users.forEach(user => {
        userListElement.innerHTML += `<li>${user}</li>`;
    });
});

// Kada se pošalje poruka
document.getElementById('send').onclick = () => {
    const messageInput = document.getElementById('message');
    const msg = { user: 'User', text: messageInput.value };
    socket.emit('sendMessage', msg);
    messageInput.value = '';
};

// Kada se primi nova poruka
socket.on('message', (msg) => {
    const chat = document.getElementById('chat');
    chat.innerHTML += `<p><strong>${msg.user}</strong>: ${msg.text}</p>`;
});

// Aktivacija Take Over
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    const secretCode = prompt('Unesi kod za Take Over:');
    if (secretCode) {
        socket.emit('takeOver', secretCode);
    }
});

// Prijavljivanje novog korisnika
socket.on('user connected', (userId) => {
    addUser(userId);
});

// Dodavanje korisnika
function addUser(userId) {
    if (!users.includes(userId)) {
        users.push(userId);
        updateUserList();
    }
}

// Ažuriranje liste korisnika
function updateUserList() {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // Očisti trenutnu listu
    userListElement.innerHTML += `<li><strong>${djNick}</strong> (DJ)</li>`; // Dodaj DJ-a na vrh
    users.forEach(user => {
        userListElement.innerHTML += `<li>${user}</li>`;
    });
}
