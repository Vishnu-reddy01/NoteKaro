# 📝 NoteKaro — YouTube Timestamp Notes Chrome Extension

**NoteKaro** is a Chrome Extension that allows users to create notes at specific timestamps while watching YouTube videos. Each note is linked to the video and can be clicked later to jump directly to the saved timestamp.

---

## 🚀 Features

* 📝 Create notes while watching YouTube videos
* ⏱️ Automatically capture the current video timestamp
* 🔗 Associate notes with the corresponding YouTube video
* 💾 Store notes locally using Chrome Storage
* 📋 Display all saved notes for the current video
* 🎯 Click a timestamp to jump directly to that point in the video
* ⚡ Lightweight and easy to use

---

## 🛠️ Technologies Used

* **HTML** — Popup user interface
* **CSS** — Popup styling
* **JavaScript** — Application logic
* **Chrome Extension Manifest V3** — Extension configuration
* **Chrome Messaging API** — Communication between popup and content script
* **Chrome Storage API** — Local note storage
* **HTML5 Video API** — Reading and changing the YouTube video timestamp

---

## 🏗️ Project Structure

```text
NoteKaro/
│
├── manifest.json      # Chrome extension configuration
├── popup.html         # Extension popup interface
├── popup.css          # Popup styling
├── popup.js           # Note management and extension logic
└── content.js         # YouTube video interaction
```

---

## ⚙️ How It Works

```text
User opens YouTube
        ↓
YouTube video is detected
        ↓
User opens NoteKaro
        ↓
User writes a note
        ↓
Clicks "Save Note"
        ↓
popup.js requests video data
        ↓
content.js gets:
  • Current timestamp
  • YouTube URL
        ↓
Note is stored in chrome.storage.local
        ↓
Saved note appears in popup
        ↓
User clicks timestamp
        ↓
popup.js sends SEEK_VIDEO message
        ↓
content.js changes video.currentTime
        ↓
YouTube jumps to saved timestamp
```

---

## 🔄 Architecture

```text
              ┌──────────────────┐
              │    popup.html     │
              │   HTML + CSS UI   │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │     popup.js     │
              │ Application Logic│
              └────────┬─────────┘
                       │
                Chrome Messaging
                       │
                       ▼
              ┌──────────────────┐
              │    content.js    │
              │ YouTube Interaction│
              └────────┬─────────┘
                       │
                       ▼
                YouTube <video>
                       
                       │
                       ▼
              ┌──────────────────┐
              │ chrome.storage   │
              │      .local      │
              └──────────────────┘
```

---

## 💾 Data Storage

NoteKaro uses **`chrome.storage.local`** to store notes locally in the browser.

The YouTube video URL is used as the key.

Example:

```json
{
  "https://www.youtube.com/watch?v=ABC123": [
    {
      "time": 125,
      "text": "Important concept"
    },
    {
      "time": 340,
      "text": "Important example"
    }
  ]
}
```

Each note contains:

* `time` — Timestamp in seconds
* `text` — User's note

No external database or backend server is required for the current version.

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/NoteKaro.git
```

### 2. Open Chrome Extensions

Open:

```text
chrome://extensions/
```

### 3. Enable Developer Mode

Turn on **Developer mode** from the top-right corner.

### 4. Load the Extension

Click:

**Load unpacked → Select the NoteKaro project folder**

### 5. Start Using NoteKaro

Open any YouTube video, click the NoteKaro extension icon, write a note, and click **Save Note**.

---

## 🎯 Example Usage

Suppose a lecture is currently playing at:

```text
12:35
```

You write:

```text
Important explanation of normalization
```

NoteKaro stores:

```text
12:35 - Important explanation of normalization
```

Later, clicking **12:35** automatically moves the YouTube video back to that exact point.

---

## 🔐 Permissions

NoteKaro uses the following Chrome permissions:

### `activeTab`

Used to interact with the currently active YouTube tab.

### `storage`

Used to save and retrieve notes using Chrome's local storage.

---

## 📌 Project Highlights

* Built a browser extension using **Chrome Extension Manifest V3**
* Implemented communication between popup and webpage using the **Chrome Messaging API**
* Integrated the **HTML5 Video API** to capture and control video timestamps
* Implemented persistent local storage using **Chrome Storage API**
* Dynamically rendered saved notes using **JavaScript DOM manipulation**

---

## 🔮 Future Improvements

* Export notes as PDF or text
* Search within saved notes
* Delete and edit notes
* Add note categories or tags
* Sync notes across devices
* Add keyboard shortcuts
* Improve support for different YouTube page states

---

## 👨‍💻 Author

**Vishnu Reddy**

B.Tech — Computer Science & Engineering

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
