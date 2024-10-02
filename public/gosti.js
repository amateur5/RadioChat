const socket = io(); // Povezivanje na server

let isBold = false;
let isItalic = false;
let textColor = '#ffffff'; // Default bela boja
let guestColor = {}; // Objekat koji čuva boju svakog gosta
let guestCounter = 1; // Brojač gostiju

let guestId = `guest-${guestCounter}`; // Definiši guestId globalno

// Automatsko odjavljivanje kada korisnik napusti stranicu
window.addEventListener('beforeunload', function() {
    socket.emit('user left', guestId);
});

// Dodavanje event listener-a za bold
document.getElementById('boldBtn').addEventListener('click', function () {
    isBold = !isBold;
    this.style.backgroundColor = isBold ? '#666' : 'black';
    document.getElementById('messageText').style.fontWeight = isBold ? 'bold' : 'normal';
});

// Dodavanje event listener-a za italic
document.getElementById('italicBtn').addEventListener('click', function () {
    isItalic = !isItalic;
    this.style.backgroundColor = isItalic ? '#666' : 'black';
    document.getElementById('messageText').style.fontStyle = isItalic ? 'italic' : 'normal';
});

// Dodavanje event listener-a za color
document.getElementById('colorBtn').addEventListener('click', function () {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('colorPicker').style.display = 'flex';
});

// Potvrđivanje boje
function confirmColor() {
    textColor = document.getElementById('colorInput').value;
    document.getElementById('messageText').style.color = textColor;
    guestColor[`guest-${guestCounter}`] = textColor; // Čuva boju za trenutnog gosta
    document.getElementById(`guest-${guestCounter}`).style.color = textColor; // Ažurira boju gosta na listi
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('colorPicker').style.display = 'none';
}

// Slanje poruka
document.getElementById('messageText').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Funkcija za slanje poruka
function sendMessage() {
    const messageText = document.getElementById('messageText').value;
    if (!messageText) return;

    const timeString = new Date().toLocaleTimeString();
    const color = textColor || '#ffffff'; // Postavljanje izabrane boje ili default boje
    let newMessage = `<p style="color: ${color}; font-weight: ${isBold ? 'bold' : 'normal'}; font-style: ${isItalic ? 'italic' : 'normal'};">${guestId.replace('-', ' ')} (${timeString}): ${messageText}</p>`;

    socket.emit('chat message', newMessage); // Emituj poruku serveru

    document.getElementById('messageText').value = ''; // Očisti input polje
}

// Kada server pošalje poruku
socket.on('chat message', function(msg) {
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML += msg;
    messageArea.scrollTop = messageArea.scrollHeight; // Automatski skroluj do dna
});

// Prikaz forme za login
function showLoginForm() {
    const username = prompt('Unesite vaš nik ili broj gosta:');
    if (username) {
        guestCounter++;
        const guestList = document.getElementById('guestList');
        const newGuest = document.createElement('div');
        newGuest.classList.add('guest');
        newGuest.id = `guest-${guestCounter}`;
        newGuest.textContent = username;
        guestList.appendChild(newGuest);
        guestId = `guest-${guestCounter}`; // Ažuriraj guestId
    }
}

// Uklanjanje korisnika sa klijenta
socket.on('user left', function(guestId) {
    const guestElement = document.getElementById(guestId);
    if (guestElement) {
        guestElement.remove(); // Ukloni element iz DOM-a
    }
});
