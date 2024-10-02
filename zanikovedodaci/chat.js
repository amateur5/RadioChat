let guestNumber = Math.floor(Math.random() * 1000); // Dodeli nasumični broj od 0 do 999

// Prikaži brojača u chat prozoru
displayGuestNumber(guestNumber);

function displayGuestNumber(number) {
    const guestList = document.getElementById('guestList');
    const guestElement = document.createElement('div');
    guestElement.id = 'guest-' + number;
    guestElement.innerText = 'Gosta #' + number; // Prikazuje gost kao brojača
    guestList.appendChild(guestElement);
}

function setNickname(nickname) {
    // Ukloni brojač iz liste
    const guestElement = document.getElementById('guest-' + guestNumber);
    if (guestElement) {
        guestElement.innerText = nickname; // Postavi nadimak umesto broja
        guestElement.id = 'guest-nickname-' + nickname; // Promeni id na osnovu nadimka
    }

    // Očisti input polje
    document.getElementById('nicknameInput').value = '';
}

document.getElementById("setNicknameButton").addEventListener("click", function() {
    const nickname = document.getElementById("nicknameInput").value;
    // Ovdje možeš dodati proveru da li je nadimak zauzet (server-side logika)
    setNickname(nickname);
});
