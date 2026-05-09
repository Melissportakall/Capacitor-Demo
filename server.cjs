const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

let photos = [];

app.get('/api/photos', (req, res) => {
  res.json(photos);
});

app.post('/api/photos', (req, res) => {
  const newPhoto = req.body;
  
  // Update photo if id already exists, otherwise push
  const index = photos.findIndex(p => p.id === newPhoto.id);
  if (index !== -1) {
    photos[index] = newPhoto;
  } else {
    photos.push(newPhoto);
  }
  
  console.log('Yeni fotoğraf kaydedildi veya güncellendi!', newPhoto.id);
  res.status(201).json(newPhoto);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sunucu çalışıyor: http://0.0.0.0:${PORT}`);
});
