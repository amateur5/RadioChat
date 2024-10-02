const registeredUsers = {}; // Objekt za čuvanje registrovanih korisnika

function registerUser() {
    const nik = document.getElementById('registerNik').value;
    const password = document.getElementById('registerPassword').value;

    // Proveri da li je nik već registrovan
    if (registeredUsers[nik]) {
        alert('Ovaj nik je već registrovan. Izaberi drugi nik.');
        return;
    }

    // Registruj korisnika
    registeredUsers[nik] = password;
    alert(`Uspešno si se registrovao sa nikom: ${nik}`);

    // Očisti formu
    document.getElementById('registerNik').value = '';
    document.getElementById('registerPassword').value = '';
    // Sakrij formu nakon registracije
    document.getElementById('registrationForm').style.display = 'none';
}

function loginUser() {
    const nik = document.getElementById('loginNik').value;
    const password = document.getElementById('loginPassword').value;

    // Proveri da li je nik registrovan i lozinka tačna
    if (registeredUsers[nik] && registeredUsers[nik] === password) {
        alert(`Uspešno si se prijavio kao: ${nik}`);
        // Prikazati dodatne funkcionalnosti za DJ-a ili registrovanog korisnika
    } else {
        alert('Neispravni nik ili lozinka.');
    }
}
