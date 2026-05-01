# Map & Camera Geo-Tagging App

Bu proje, kullanıcının anlık konumunu harita üzerinde takip edebildiği ve cihaz kamerasıyla çektiği fotoğrafları haritada tam çekildiği noktada (küçük resim / thumbnail olarak) işaretleyebildiği interaktif bir uygulamadır. 

Modern **React + Vite** altyapısıyla geliştirilmiş olup, **Capacitor** sayesinde tek bir kod tabanından hem Web, hem Android, hem de iOS platformlarında yerel (native) uygulama olarak çalışabilmektedir.

## 🚀 Özellikler

- **Anlık Konum Takibi (Geolocation):** Kullanıcının konumunu yüksek doğrulukla bulur ve mavi, dalgalanan (pulse) bir gösterge ile haritada canlı olarak gösterir.
- **Kamera Entegrasyonu:** Cihazın kamerasını doğrudan uygulama içinde (overlay olarak) açar.
- **Harita Üzerinde Fotoğraf İşaretleme:** Çekilen fotoğraflar standart bir iğne (pin) yerine, doğrudan fotoğrafın kendisinin olduğu yuvarlak küçük resimler (thumbnail) olarak haritaya yerleşir.
- **Detaylı Popup'lar:** Haritadaki fotoğraflara tıklandığında çekim zamanı, enlem ve boylam gibi detaylar şık bir Flexbox arayüzünde gösterilir.
- **Premium Tasarım:** Koyu tema, Glassmorphism (buzlu cam efekti) ve akıcı animasyonlar barındırır.

## 🛠️ Kullanılan Teknolojiler (Dependencies)

- **Web (Core):** React 18, Vite 5
- **Harita:** Leaflet, React-Leaflet
- **İkonlar:** Lucide-React
- **Native Paketleyici:** Capacitor (`@capacitor/core`, `@capacitor/cli`, `@capacitor/android`, `@capacitor/ios`)

---

## 💻 Web Ortamında Çalıştırma

Projeyi standart bir web uygulaması olarak tarayıcıda test etmek için:

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

3. Tarayıcınızda `http://localhost:5173/` adresine gidin. (Uygulama sizden Konum ve Kamera erişim izinleri isteyecektir, test için izin verin).

---

## 📱 Yerel (Native) Mobil Uygulama Olarak Çalıştırma

Bu projede **Capacitor** halihazırda kuruludur. Projenizin en güncel halini mobile aktarmadan önce *her zaman* web projenizi derlemeniz (build) gerekir:

```bash
npm run build
```

*(Her kod değişikliğinden sonra mobile yansıtmak için önce `npm run build`, ardından `npx cap sync` komutlarını çalıştırmayı unutmayın.)*

### 🤖 Android İçin Kurulum ve Test

*Gereksinimler: Bilgisayarınızda [Android Studio](https://developer.android.com/studio) kurulu olmalıdır.*

1. Eğer Android platformu projeye ekli değilse ekleyin (Halihazırda ekliyse bu adımı atlayabilirsiniz):
   ```bash
   npx cap add android
   ```

2. Web tarafındaki build dosyalarınızı ve eklentileri Android projesine senkronize edin:
   ```bash
   npx cap sync android
   ```

3. Android Studio'da projeyi açın:
   ```bash
   npx cap open android
   ```

4. **İzinler (Önemli):** Android projesinin düzgün çalışması için `android/app/src/main/AndroidManifest.xml` dosyasında Kamera ve Konum izinlerinin eklendiğinden emin olun (Bu projede halihazırda eklenmiştir).

5. Android Studio açıldıktan sonra sağ alt kısımdaki Gradle senkronizasyonunun bitmesini bekleyin. Ardından üst menüden bir Emülatör (Sanal Cihaz) veya USB ile bağlı telefonunuzu seçip **yeşil Run (Oynat) butonuna** tıklayarak uygulamayı test edin.

### 🍏 iOS İçin Kurulum ve Test (Sadece Mac Cihazlar İçin)

*Gereksinimler: Bir macOS işletim sistemi ve App Store'dan [Xcode](https://developer.apple.com/xcode/) yüklü olmalıdır.*

1. iOS platformunu projeye dahil edin:
   ```bash
   npm install @capacitor/ios
   npx cap add ios
   ```

2. Dosyaları iOS projesine senkronize edin:
   ```bash
   npx cap sync ios
   ```

3. **İzinler (Önemli):** Apple'ın sıkı güvenlik kuralları gereği, Kamera ve Konum izinlerinin neden istendiğini açıkça belirtmeliyiz. Projeyi açmadan önce veya Xcode üzerinden `ios/App/App/Info.plist` dosyasına şu satırları eklemeniz gerekir:
   ```xml
   <key>NSCameraUsageDescription</key>
   <string>Haritada işaretlemek için fotoğraf çekebilmeniz adına kameranıza erişmemiz gerekiyor.</string>
   
   <key>NSLocationWhenInUseUsageDescription</key>
   <string>Bulunduğunuz konumu haritada gösterebilmek ve fotoğraflarınızı işaretleyebilmek için konum erişimine ihtiyacımız var.</string>
   ```

4. Xcode'da projeyi açın:
   ```bash
   npx cap open ios
   ```

5. Xcode açıldıktan sonra sol üst köşeden hedef cihaz olarak **iPhone 15, iPhone 16** gibi bir iOS Emülatörü seçin ve **Run (Command + R)** tuşuna basarak uygulamanızı iOS üzerinde test edin. (Eğer gerçek bir iPhone'da test edecekseniz Xcode üzerinden Apple Geliştirici Hesabınızı bağlamanız gerekebilir).
