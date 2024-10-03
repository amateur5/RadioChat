const express = require('express'); // Učitaj express
const app = express(); // Kreiraj Express aplikaciju

const PORT = process.env.PORT || 3000; // Koristi port iz okruženja, ili 3000 ako nije postavljen

// Ruta za glavni page
app.get('/', (req, res) => {
  res.send('Hello, Bun!');
});

// Ruta za "About" stranicu
app.get('/about', (req, res) => {
  res.send('About this site');
});

// Slušaj na portu
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

