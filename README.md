# 🌐 NEXUS Video Downloader

> **The ultimate tool for seamless media extraction.** \> Architected for speed, privacy, and universal compatibility.

-----

## 📖 Table of Contents

  * [Overview](https://www.google.com/search?q=%23-overview)
  * [About the Author](https://www.google.com/search?q=%23-about-the-author)
  * [Key Features](https://www.google.com/search?q=%23-key-features)
  * [Tech Stack](https://www.google.com/search?q=%23-tech-stack)
  * [Installation & Setup](https://www.google.com/search?q=%23-installation--setup)
  * [Privacy Protocol](https://www.google.com/search?q=%23-privacy-protocol)
  * [License](https://www.google.com/search?q=%23-license)

-----

## 🚀 Overview

**NEXUS Downloader** is a modern, full-stack web application designed to simplify the process of downloading video and audio content from major platforms like YouTube, Facebook, Instagram, and X (Twitter).

Built with a philosophy of **"Zero-Log" privacy**, NEXUS provides a clean, distraction-free interface to extract high-fidelity media without tracking user data. It utilizes a powerful Python backend to parse streams and a reactive frontend to deliver a premium user experience.

-----

## 🤝 About the Author

This project is a proud initiative of **LAVENROY NEXUS**, a forward-thinking tech entity dedicated to open software contribution.

It was crafted by **EDT EDIRISINGHE**, the founder of LavenRoy Nexus.

> *"Perfection At Its Finest"* — EDT

-----

## ✨ Key Features

  * **Universal Compatibility**: Supports parsing from YouTube, Facebook, Instagram, Twitter/X, and more.
  * **High-Fidelity Extraction**:
      * **Video**: Download in 4K, 1080p, and 720p (MP4).
      * **Audio**: Extract HQ audio streams (MP3, 320kbps).
  * **Smart Backend Proxy**: Includes a custom Flask proxy to handle `Content-Disposition` and bypass CORS restrictions, ensuring downloads start immediately.
  * **Privacy First**: No logs, no IP tracking, and no persistent cookies.
  * **Modern UI/UX**:
      * Built with Tailwind CSS for a sleek, responsive design.
      * Animated interactions and glassmorphism effects.
      * Real-time processing feedback.

-----

## 🛠 Tech Stack

### **Frontend**

  * **React 18** (Vite): Fast, component-based UI.
  * **Tailwind CSS**: Utility-first styling with custom animations (`tailwindcss-animate`).
  * **Lucide React**: Beautiful, consistent iconography.

### **Backend**

  * **Python Flask**: Lightweight server for handling API requests.
  * **yt-dlp**: The industry-standard command-line audio/video downloader.
  * **Gunicorn**: Production-grade WSGI HTTP server.
  * **Docker**: Containerized deployment for consistency across environments.

-----

## 💻 Installation & Setup

Follow these steps to run NEXUS locally on your machine.

### Prerequisites

  * Node.js (v16+)
  * Python (v3.9+)
  * FFmpeg (Installed and added to system PATH)

### 1\. Clone the Repository

```bash
git clone https://github.com/dushan-edirisinghe/Nexus-DownLoader.git
cd Nexus-DownLoader
```

### 2\. Backend Setup

Navigate to the backend directory and set up the Python environment.

```bash
cd backend

# Create virtual environment (Optional but recommended)
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

*The backend will start at `http://localhost:5000`*

### 3\. Frontend Setup

Open a new terminal, navigate to the project root, and install dependencies.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

*The frontend will start at `http://localhost:5173` (or similar).*

### 4\. Configuration (Optional)

If you are deploying the backend to a different URL (e.g., Render, Heroku), update the environment variable in the frontend.

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://your-backend-url.com/api/extract
```

*(Defaults to localhost if not set)*

-----

## 🔒 Privacy Protocol

At **LavenRoy Nexus**, we adhere to a strict **Privacy Standard**:

1.  **No Logging**: We do not track user IPs or browser fingerprints.
2.  **Ephemeral Processing**: Video conversion happens in temporary RAM containers that are wiped instantly after download generation.
3.  **No Cookies**: We do not use persistent tracking cookies.

-----

## 🐳 Docker Deployment

You can containerize the backend using the included `Dockerfile`.

```bash
cd backend
docker build -t nexus-backend .
docker run -p 5000:5000 nexus-backend
```

-----

## 📝 License

This project is licensed under the **MIT License**.

```text
MIT License

Copyright (c) 2024 LavenRoy Nexus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```
