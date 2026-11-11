# PhotoMap: Capacitor Öğrenme Projesi 🚀

PhotoMap, **Capacitor** teknolojisini keşfetmek ve öğrenmek amacıyla geliştirilmiş, gerçek zamanlı ve konum tabanlı bir fotoğraf paylaşım uygulamasıdır. Bu proje, React gibi web teknolojilerinin mobil cihaz donanımlarıyla (kamera, GPS vb.) nasıl doğrudan iletişim kurabildiğini göstermektedir.

## 🎯 Projenin Amacı
Bu projenin ana hedefi, modern hibrit uygulama geliştirme süreçlerinde **Capacitor**'ın rolünü anlamaktır. Tarayıcı ile yerel mobil API'lar arasındaki köprüyü (bridge) pratik bir uygulama üzerinden deneyimlemek için oluşturulmuştur.

## 🤔 Capacitor Nedir?
[Capacitor](https://capacitorjs.com/), herhangi bir web projesini yerel (native) bir iOS veya Android uygulamasına dönüştürmenize olanak tanıyan bir çalışma zamanı (runtime) ortamıdır.

**Bu projede Capacitor hakkında öğrenilen temel noktalar:**
*   **Native Bridge (Yerel Köprü):** Kamera, GPS ve Titreşim (Haptics) gibi özelliklere erişmek için standart bir JavaScript API'si sağlar.
*   **Web'den Native'e:** Kodu "büyülü" bir şekilde dönüştürmez; web uygulamanızı optimize edilmiş bir WebView içinde çalıştırır ve yerel katmanla haberleşmesini sağlar.
*   **Native Araçlar:** Eski teknolojilerin aksine, iOS ve Android projelerini birer "çıktı" olarak değil, kaynak kod olarak tutmanıza izin verir; böylece Xcode ve Android Studio üzerinde tam kontrol sahibi olursunuz.

## ✨ Uygulanan Özellikler
Bu proje, yerel yetenekleri sergilemek için birkaç resmi Capacitor eklentisini kullanır:

-   📸 **@capacitor/camera**: Cihazın kamerasını kullanarak fotoğraf çeker.
-   📍 **@capacitor/geolocation**: Kullanıcı konumunu harita üzerinde anlık takip eder.
-   🔋 **@capacitor/device**: Pil seviyesi ve cihaz modeli gibi donanım bilgilerine erişir.
-   🔔 **@capacitor/local-notifications**: Sistem üzerinden bildirim gönderir.
-   📤 **@capacitor/share**: Fotoğrafları ve konumları diğer uygulamalarla paylaşmak için yerel paylaşım sayfasını açar.
-   📳 **@capacitor/haptics**: Kullanıcı etkileşimlerinde fiziksel titreşim geri bildirimi sağlar.

## 🛠 Kullanılan Teknolojiler
*   **Frontend:** React (Vite), Leaflet (Haritalar), Lucide React (İkonlar).
*   **Mobil:** Capacitor.
*   **Backend:** Node.js (Express) - Koordinatları ve resim verilerini saklayan basit bir yerel sunucu.

## 🚀 Başlangıç

### Gereksinimler
*   Node.js (LTS sürümü)
*   Android Studio (Android için) / Xcode (iOS için)

### Kurulum
1. Projeyi klonlayın.
2. Bağımlılıkları yükleyin: `npm install`
3. Web projesini derleyin: `npm run build`
4. Mobil platformları senkronize edin: `npx cap sync`

### Sunucuyu Çalıştırma
Fotoğrafların cihazlar arası senkronizasyonu için basit bir Express sunucusu mevcuttur:
```bash
node server.cjs
```
*Not: `App.jsx` dosyasındaki `API_URL` değişkenini kendi yerel IP adresinizle güncellemeyi unutmayın.*

## 📝 Lisans
Bu proje tamamen eğitim amaçlı oluşturulmuştur.
