// Uključujemo Express
const express = require('express');

// Kreiramo instancu Express aplikacije
const app = express();

// Postavljamo port na koji će server slušati
const PORT = process.env.PORT || 3000;

// Middleware za parsiranje JSON podataka
app.use(express.json());

// Osnovna ruta koja vraća poruku
app.get('/', (req, res) => {
    res.send('Dobrodošli na RadioChat server!');
});

// Startujemo server
app.listen(PORT, () => {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
});
