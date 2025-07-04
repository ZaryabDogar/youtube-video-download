## 🎧 YouTube MP3 Downloader (Node.js + yt-dlp)

This Node.js project lets you **download YouTube videos as MP3 files** using `yt-dlp` – **no ffmpeg required**.

---

### 🚀 Features

- ✅ Download MP3 audio from YouTube
- ✅ Auto-fetches video title as filename
- ✅ Lightweight and fast (no ffmpeg dependency)
- ✅ Stream output directly
- ✅ Chrome Extension compatible

---

### 📦 Requirements

- Node.js (v18+)
- yt-dlp binary (included or downloaded manually)

---

### ⚙️ Installation

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
```

---

### 🔽 Setup yt-dlp

Download the binary and give it permission (only once):

```bash
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o yt-dlp
chmod +x yt-dlp
```

> ✅ Or download manually from: [https://github.com/yt-dlp/yt-dlp/releases](https://github.com/yt-dlp/yt-dlp/releases)

Make sure `yt-dlp` is in the root of your project directory.

---

### 🏃‍♂️ Run the Server

```bash
node index.js
```

By default, the server runs on:
`http://localhost:3000`

---

### 🧪 API Usage

#### 📥 Download MP3

```http
GET /download?url=YOUTUBE_VIDEO_URL&format=mp3
```

Example:

```http
http://localhost:3000/download?url=https://www.youtube.com/watch?v=VIDEO_ID&format=mp3
```

This will stream the MP3 file directly with the correct video title as the filename.

---

### 💻 Chrome Extension (Optional)

If you're using this with a Chrome Extension, make sure to update the fetch URL in your popup script:

```js
fetch(`http://localhost:3000/download?url=${videoURL}&format=mp3`);
```

---

### 🧾 License

This project is open-source and free to use for educational purposes.

---
