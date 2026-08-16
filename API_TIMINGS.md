# ⏱️ AstroNova - APIs & Call Timings Reference

This document provides a complete catalogue of all internal REST API endpoints and external space data providers integrated in **AstroNova**, including execution frequencies, refresh intervals, latency expectations, and triggers.

---

## 📡 Internal Backend REST APIs

**Base URL (Development)**: `http://localhost:5000/api`  
**Base URL (Production)**: `https://astronova-api.render.com/api`

### 1. 🛰️ Satellite Endpoints (`/api/satellites`)

| Endpoint | Method | Call Timing / Trigger | Polling Interval | Source API | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/satellites/iss-position` | `GET` | Automatic background interval | **10 seconds** (`ISS_INTERVAL_MS = 10s`) | N2YO API (`/positions/25544`) | Fetches live coordinates (lat, lng, alt) for the International Space Station. |
| `/satellites/category` | `GET` | Automatic background interval & category change | **15 seconds** (Default, configurable 10s-30s in Settings) | N2YO API (`/above/{lat}/{lng}/{alt}/{radius}/{cat}`) | Fetches current positions of satellites filtered by category (`iss`, `starlink`, `gps`, `weather`, `communication`, `all`). |
| `/satellites/iss-passes` | `GET` | Location load / refresh | On Location Change | N2YO API (`/visualpasses/25544`) | Calculates upcoming visible pass opportunities for the ISS relative to user location. |
| `/satellites/positions` | `GET` | On-demand (User selection) | On Click / Double-click | N2YO API (`/positions/{id}`) | Retrieves position telemetry and trajectory data for a single satellite. |
| `/satellites/above` | `GET` | On-demand | On Request | N2YO API (`/above/{lat}/{lng}/...`) | Retrieves satellites above specified location within radius. |
| `/satellites/common` | `GET` | On-demand | On Request | N2YO API | Retrieves key common satellites overhead. |

---

### 2. 🌙 Astronomy & Ephemeris Endpoints (`/api/astronomy`)

| Endpoint | Method | Call Timing / Trigger | Polling Interval | Source API | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/astronomy/moon` | `GET` | Automatic background interval | **15 minutes** (`ASTRONOMY_INTERVAL_MS = 15m`) | AstronomyAPI (`/bodies/positions` + `/studio/moon-phase`) | Fetches moon phase, illumination percentage, rise/set times, and SVG phase image. |
| `/astronomy/bodies` | `GET` | Automatic background interval | **15 minutes** (`ASTRONOMY_INTERVAL_MS = 15m`) | AstronomyAPI (`/bodies/positions`) | Obtains live altitude, azimuth, and distance for Mercury, Venus, Mars, Jupiter, Saturn, Uranus, and Neptune. |
| `/astronomy/planet` | `GET` | On-demand (Planet details) | On Request | AstronomyAPI (`/bodies/positions`) | Obtains specific ephemeris data for a single planet. |
| `/astronomy/constellation` | `GET` | On-demand | On Request | AstronomyAPI (`/constellations/{id}`) | Retrieves star pattern and boundary details for a constellation. |

---

### 3. 🪐 NASA Endpoints (`/api/nasa`)

| Endpoint | Method | Call Timing / Trigger | Polling Interval | Source API | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/nasa/neo` | `GET` | Automatic background interval | **1 hour** (`NEO_INTERVAL_MS = 60m`) | NASA NeoWs Feed (`/neo/rest/v1/feed`) | Fetches Near-Earth Objects (asteroids) close approach data for a 7-day window. |
| `/nasa/apod` | `GET` | Initial load / Right panel view | On Mount | NASA APOD (`/planetary/apod`) | Downloads Astronomy Picture of the Day (image/video URL, title, and explanation). |
| `/nasa/hazardous-asteroids` | `GET` | On-demand | On Request | NASA NeoWs (`/browse`) | Queries asteroids flagged as potentially hazardous. |
| `/nasa/asteroid/:asteroidId` | `GET` | On-demand | On Request | NASA NeoWs (`/neo/{id}`) | Detailed orbital and size parameters for a single asteroid. |

---

### 4. 🤖 AI Assistant Endpoints (`/api/ai`)

| Endpoint | Method | Call Timing / Trigger | Polling Interval | Source API | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/ai/chat` | `POST` | User interaction | On Demand (Form Submit) | Google Gemini API (`gemini-1.5-flash`) | Processes user messages with space context and returns AI response (~1-2s latency). |
| `/ai/ask` | `POST` | User interaction | On Demand | Google Gemini API | Answers space/astronomy questions. |
| `/ai/visible-tonight` | `POST` | Panel view trigger | On Demand | Google Gemini API | Summarizes visible sky phenomena based on live user ephemeris. |
| `/ai/explain-satellite` | `POST` | Satellite popup click | On Demand | Google Gemini API | Generates 2-3 sentence overview of selected satellite. |

---

### 5. ❤️ System & Config Endpoints (`/api/health`, `/api/config`)

| Endpoint | Method | Call Timing / Trigger | Polling Interval | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/health` | `GET` | Health check / Monitoring | On Demand | Returns server operational status, system timestamp, and process uptime. |
| `/config/public` | `GET` | App Initialization | Initial Load | Returns public configuration parameters (API URL, active environment). |

---

## 🌐 External Data Providers & Network Calls

| Provider | Endpoint Base | Authentication | Timeout / Retry | Primary Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **N2YO** | `https://api.n2yo.com/rest/v1` | Query Parameter (`apiKey`) | 10,000 ms timeout | Satellite orbits & NORAD positions |
| **Astronomy API** | `https://api.astronomyapi.com/api/v2` | HTTP Basic (`appId:appSecret`) | 10,000 ms timeout | Planetary ephemeris & Moon phase rendering |
| **NASA Open APIs** | `https://api.nasa.gov` | Query Parameter (`api_key`) | 10,000 ms timeout | Asteroid close approaches (NeoWs) & APOD |
| **Google Gemini API** | `https://generativelanguage.googleapis.com` | Query Parameter (`key`) | 10,000 ms timeout | Natural language space operations assistant |
| **OpenStreetMap** | `https://nominatim.openstreetmap.org/reverse` | None (User-Agent header) | On Location Detect | Reverse geocodes Lat/Lng to City Name |
| **Cesium Ion** | `https://assets.ion.cesium.com` | Token (`defaultAccessToken`) | On Globe Render | World 3D terrain elevation and satellite imagery |

---

## ⏱️ Client Refresh Timing Summary Table

```
+-------------------------------------------------------------------+
| Component              | Trigger Mechanism       | Frequency      |
+------------------------+-------------------------+----------------+
| ISS Position Tracker   | Polling (Interval)      | Every 10 sec   |
| Satellite Categories   | Polling / State Change  | Every 15 sec   |
| Moon & Planet Ephemeris| Polling (Interval)      | Every 15 min   |
| Near-Earth Objects     | Polling (Interval)      | Every 60 min   |
| User Geolocation       | Browser Geolocation API | On App Load    |
| AI Space Assistant     | User Input (Chat)       | Instant/Demand |
+-------------------------------------------------------------------+
```
