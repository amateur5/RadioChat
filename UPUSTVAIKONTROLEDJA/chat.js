const registeredUsers = {};
let currentDJ = null; // Trenutni DJ
let currentSong = null; // Trenutna pesma

function registerUser() {
    const nik = document.getElementById('registerNik').value;
    const password = document.getElementById('registerPassword').value;

    if (registeredUsers[nik]) {
        alert('Ovaj nik je već registrovan. Izaberi drugi nik.');
        return;
    }

    registeredUsers[nik] = password;
    alert(`Uspešno si se registrovao sa nikom: ${nik}`);
    document.getElementById('registerNik').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registrationForm').style.display = 'none';
}

function loginUser() {
    const nik = document.getElementById('loginNik').value;
    const password = document.getElementById('loginPassword').value;

    if (registeredUsers[nik] && registeredUsers[nik] === password) {
        alert(`Uspešno si se prijavio kao: ${nik}`);
        // Ako je prijavljen DJ, postavi ga kao trenutnog DJ-a
        if (nik === "Radio Galaksija") { // Proveri da li je DJ
            currentDJ = nik;
        }
    } else {
        alert('Neispravni nik ili lozinka.');
    }
}

function takeOverControl(code) {
    const takeoverCode = "tvoj_tajni_kod"; // Tvoj jedinstveni kod
    if (code === takeoverCode) {
        alert(`${currentDJ} je preuzeo kontrolu nad radijom!`);
        // Dodatne funkcije za kontrolu radija ovde
    } else {
        alert('Neispravan kod za preuzimanje kontrole.');
    }
}

function updateCurrentSong(song) {
    currentSong = song;
    alert(`Trenutna pesma: ${currentSong}`);
    // Prikazivanje trenutne pesme u chatu
}
