# Aktivitetskompassen

A location-based activity compass web application that guides groups through cultural and historical locations in Lindholmen, Gothenburg. The app combines navigation, group activities, and conversation starters to create shared experiences and foster connections between participants.

## 🎯 Purpose

Aktivitetskompassen is designed to help people get to know each other better while exploring culture and history. Whether you're meeting new people or strengthening existing relationships, this app provides a structured yet playful way to:

- Navigate to interesting locations using an interactive compass
- Engage in group activities at each destination
- Start meaningful conversations with conversation cards
- Learn about local art and cultural sites

## ✨ Features

### 🧭 Interactive Compass Navigation

- Real-time compass that points toward destinations
- Uses device orientation and geolocation APIs
- Smooth arrow animations and distance tracking
- Arrival detection

### 🎲 Interactive Elements

- **Conversation starters**: Randomly generated discussion topics
- **Group activities**: Unique exercises at each location
- **Progress tracking**: Saves progress through localStorage
- **Responsive design**: Optimized for mobile devices

## 🚀 Getting Started

### Prerequisites

- React
- npm or yarn package manager
- A modern web browser with geolocation support
- HTTPS connection (required for device orientation API)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd sammanslaget
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Usage

### Getting Started

1. **Home Page**: Read the introduction and click "Kör igång!" (Let's go!)
2. **Permissions**: Grant location and device orientation permissions when prompted
3. **Navigation**: Follow the compass arrow to reach each destination
4. **Activities**: Complete group exercises and read about each location
5. **Conversation**: Use conversation cards to spark discussions during the walk

### Device Requirements

- **Location Services**: Must be enabled for navigation
- **Device Orientation**: Required for compass functionality (iOS users will see a permission prompt)
- **HTTPS**: Required for security-sensitive APIs

## 🏗️ Technical Architecture

### Tech Stack

- **Frontend**: React with React Router
- **Styling**: CSS Modules and plain CSS
- **Build Tool**: Vite
- **Fonts**: Rubik Doodle Shadow, Inter

### Key Components

#### `Compass`

- Real-time compass using `DeviceOrientationEvent`
- Geolocation tracking with `navigator.geolocation.watchPosition`
- Smooth arrow animations using `requestAnimationFrame`
- Distance calculation using haversine formula

#### `CompassPage`

- Main navigation interface
- Permission handling for iOS devices
- Progress management with localStorage
- Conversation starter integration

#### Navigation Flow

```
Home → CompassPage → Location → (repeat for 4 destinations)
```

### Data Structure

#### Location Data (`locations.json`)

```json
{
  "name": "Artwork Name",
  "artist": "Artist Name",
  "latitude": 51.4769,
  "longitude": 0.0005,
  "exercise": {
    "title": "Activity Title",
    "instructions": "Activity instructions"
  },
  "description": "Artwork description"
}
```

## 🔧 Configuration

### Customization

- **Locations**: Edit `src/data/locations.json` to add/modify destinations
- **Conversation Starters**: Modify `src/data/conversationStarters.json`
- **Styling**: Update CSS custom properties in `src/index.css`
- **Arrival Distance**: Change the distance threshold in `Compass.jsx`

## 🌍 Localization

The app is currently in Swedish. Text strings are embedded in components but could be extracted for internationalization.

## 📋 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Test the application thoroughly
6. Submit a pull request

## 🐛 Known Issues & Browser Compatibility

### iOS Safari

- Requires explicit permission for `DeviceOrientationEvent`
- Must be served over HTTPS

### Android Chrome

- Generally works without explicit permission requests
- Some devices may have compass calibration issues

### General

- Requires strong GPS signal for accurate navigation
- Indoor usage may be limited due to GPS accuracy

## 📄 License

MIT

## 👥 Credits

Created for exploring the cultural landscape of Lindholmen, Gothenburg.

## 🆘 Support

If you encounter issues:

1. Ensure location services are enabled
2. Check that you're using HTTPS
3. Verify device orientation permissions
4. Try refreshing the page
5. Check browser console for error messages

---

_"Gemensamt i en riktning"_ - Together in one direction
