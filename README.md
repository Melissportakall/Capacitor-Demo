# PhotoMap: A Capacitor Learning Journey 🚀

PhotoMap is a real-time, location-based photo sharing application built to explore and master **Capacitor** technology. This project demonstrates how web technologies (React) can seamlessly interface with native mobile hardware.

## 🎯 Project Purpose
The primary goal of this project was to learn **Capacitor** and understand its role in modern cross-platform development. It serves as a practical implementation of bridging the gap between the browser and native mobile APIs.

## 🤔 What is Capacitor?
[Capacitor](https://capacitorjs.com/) is a cross-platform native runtime that allows you to turn any web project into a native iOS or Android application. 

**Key takeaways from this project about Capacitor:**
*   **Native Bridge:** It provides a consistent JavaScript API to access native device features like the Camera, GPS, and Haptics.
*   **Web to Native:** It doesn't use "magic" to convert code; it runs your web app in a highly optimized WebView and provides the "bridge" to the native layer.
*   **Native Tooling:** Unlike older technologies, Capacitor allows you to keep the native iOS and Android projects as source artifacts, giving you full control over the native IDEs (Xcode & Android Studio).

## ✨ Features Implemented
This project utilizes several official Capacitor plugins to showcase native capabilities:

-   📸 **@capacitor/camera**: Captures high-quality photos using the device's native camera.
-   📍 **@capacitor/geolocation**: Real-time tracking of user position on a Leaflet map.
-   🔋 **@capacitor/device**: Accessing hardware metadata like battery level and device model.
-   🔔 **@capacitor/local-notifications**: Scheduling and displaying native system notifications.
-   📤 **@capacitor/share**: Utilizing the native share sheet to send photos and locations to other apps.
-   📳 **@capacitor/haptics**: Providing physical vibration feedback for user actions.
-   📂 **@capacitor/filesystem**: Temporary storage of images for sharing purposes.

## 🛠 Tech Stack
*   **Frontend:** React (Vite), Leaflet (Maps), Lucide React (Icons).
*   **Mobile:** Capacitor.
*   **Backend:** Node.js (Express) - A simple local server to store coordinates and image strings.

## 🚀 Getting Started

### Prerequisites
*   Node.js (LTS)
*   Android Studio (for Android) / Xcode (for iOS)

### Installation
1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build the web project:
    ```bash
    npm run build
    ```
4.  Sync with native platforms:
    ```bash
    npx cap sync
    ```

### Running the Server
The project includes a simple Express server to sync photos between devices:
```bash
node server.cjs
```
*Note: Update the `API_URL` in `App.jsx` to match your local IP address.*

## 📝 License
This project was created for educational purposes.
