# AstroNova 🚀🌍

<div align="center">

### Real-Time Space Awareness Platform

Track satellites, explore astronomy, monitor asteroids, and interact with an AI-powered space assistant — all from a single mission-control dashboard.

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![CesiumJS](https://img.shields.io/badge/CesiumJS-3D%20Globe-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

[Live Demo](#) • [Presentation](#) • [Report](#)

</div>

---

## 📖 Overview

AstroNova is a full-stack space intelligence platform that combines real-time satellite tracking, astronomy visualization, asteroid monitoring, and AI-powered explanations into a single interactive experience.

Built using React, CesiumJS, Node.js, and multiple space-data APIs, AstroNova delivers a professional mission-control style dashboard that allows users to explore Earth, track satellites, monitor celestial bodies, and understand what is happening in space around them.

---

## ✨ Features

### 🌎 Interactive 3D Earth

* Realistic 3D Earth powered by CesiumJS
* Dynamic Earth rotation
* Smooth camera navigation
* Immersive starfield environment

### 📍 Locate Me

* Browser geolocation support
* Automatic Earth navigation to user location
* Location marker with accuracy radius
* Latitude, longitude, and city information

### 🛰️ Live Satellite Tracking

* International Space Station (ISS) tracking
* Starlink constellation monitoring
* GPS satellite visualization
* Live telemetry updates
* Automatic refresh every 30 seconds

### 🛤️ Orbit Visualization

* ISS orbit rendering
* Starlink orbit paths
* Future trajectory projections
* Global orbit wrapping

### ☁️ Satellites Above You

* Satellites currently overhead
* Satellite altitude information
* Satellite category identification
* Interactive details panel

### 🌠 ISS Visibility Predictions

* Next visible ISS pass
* Start and end times
* Duration estimates
* Visibility quality indicators

### 🌙 Astronomy Dashboard

* Moon phase tracking
* Moon distance and altitude
* Planet visibility information
* Constellation details
* Sky object positioning

### 🔭 Sky View Mode

* Ground-level viewing perspective
* Sky-oriented camera mode
* Moon, planets, and satellite visibility
* Immersive astronomy experience

### ☄️ NASA Integration

* Near-Earth Object tracking
* Asteroid monitoring
* Risk assessment indicators
* Astronomy Picture of the Day (APOD)

### 🤖 AI Space Assistant

* Powered by Google Gemini
* Astronomy explanations
* Satellite information
* Visibility assistance
* Context-aware responses

### 🎨 Modern UI/UX

* Dark space-inspired theme
* Glassmorphism interface
* Neon highlights
* Fully responsive layout
* Mission-control dashboard design

---

## 🏗️ System Architecture

```text
┌──────────────────────────┐
│      React Frontend      │
│  CesiumJS + TailwindCSS  │
└─────────────┬────────────┘
              │
              ▼
┌──────────────────────────┐
│   Node.js + Express API  │
└─────────────┬────────────┘
              │
 ┌────────────┼─────────────┐
 ▼            ▼             ▼
N2YO        NASA      AstronomyAPI
API         API           API
              │
              ▼
         Gemini AI
```

---


## 🛠️ Technology Stack

### Frontend

* React 18
* Vite
* Tailwind CSS
* CesiumJS
* Zustand
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* Axios
* CORS
* dotenv

### APIs & Services

* N2YO API
* NASA Open APIs
* AstronomyAPI
* Google Gemini API
* Cesium Ion

---

## 📂 Project Structure

```bash
AstroNova/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── utils/
│   └── package.json
│
├── screenshots/
│
└── README.md
```

---

## 📋 Prerequisites

* Node.js >= 18
* npm or yarn
* Modern browser with WebGL support

### Required API Keys

* N2YO API
* NASA API
* Astronomy API
* Google Gemini API
* Cesium Ion Token

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/your-username/AstroNova.git

cd AstroNova
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000

N2YO_API_KEY=your_key

NASA_API_KEY=your_key

ASTRONOMY_APP_ID=your_id

ASTRONOMY_APP_SECRET=your_secret

GEMINI_API_KEY=your_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api

VITE_CESIUM_ION_TOKEN=your_token
```

---

## 🌍 Deployment

### Frontend

* Vercel

### Backend

* Render

---

## 🎯 Future Improvements

* Additional satellite constellations
* Space weather monitoring
* Meteor shower predictions
* Historical satellite replay
* AR sky visualization
* Multi-language support
* User accounts and saved observations

---

## 🏆 Project Highlights

* Real-time satellite intelligence
* Interactive 3D Earth visualization
* AI-powered astronomy assistant
* NASA and N2YO integrations
* Full-stack architecture
* Responsive modern UI

---

## 📜 License

This project is licensed under the MIT License.

---

<div align="center">

Made with ❤️ by Team AstroNova 🚀

</div>
