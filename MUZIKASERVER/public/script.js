const socket = io(); //

// Dodatne funkcionalnosti
document.getElementById('start-stream').addEventListener('click', () => {
    console.log('Strim je počeo!');
    socket.emit('start-stream'); // Emitujte događaj za pokretanje strima
});

document.getElementById('stop-stream').addEventListener('click', () => {
    console.log('Strim je završen!');
    socket.emit('stop-stream'); // Emitujte događaj za zaustavljanje strima
});
