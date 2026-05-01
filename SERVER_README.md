# Yerel Sunucu (Local Server) Senkronizasyon Rehberi

Bu rehber, Capacitor uygulamanızdaki verileri (fotoğraflar, konumlar vb.) aynı ağdaki cihazlar (Mac ve iPhone) arasında senkronize etmek için kullanılır.

## 1. Hazırlık
Bilgisayarınızda (Mac) şu paketleri kurun:
```bash
npm install express cors
```

## 2. Sunucu Dosyası (server.cjs)
Proje kök dizininde `server.cjs` adında bir dosya oluşturun ve şu kodu içine yapıştırın:

```javascript
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
  photos.push(newPhoto);
  console.log('Yeni fotoğraf kaydedildi!');
  res.status(201).json(newPhoto);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
```

## 3. Bilgisayarınızın IP Adresini Bulun
Terminalde şu komutu çalıştırın:
```bash
ipconfig getifaddr en0
```
Örnek çıktı: `192.168.1.15`

## 4. App.jsx Güncellemesi
`App.jsx` içinde fetch işlemlerini bu IP adresine yönlendirin:
```javascript
const API_URL = "http://192.168.1.15:3000/api/photos";
```

## 5. Çalıştırma
Sunumu yaparken terminalden sunucuyu başlatın:
```bash
node server.cjs
```
Artık telefonunuzdan çektiğiniz her fotoğraf bu sunucuya gidecek ve bilgisayarınızdaki web sitesinde anında görünecektir.
