import { Settings, Globe, Cloud, Route, RefreshCw, Maximize, Home, Info } from 'lucide-react';
import { useAppStore } from '../context/store';

const SettingsPanel = () => {
  const {
    showTerrain, setShowTerrain,
    showAtmosphere, setShowAtmosphere,
    showClouds, setShowClouds,
    showOrbitPaths, setShowOrbitPaths,
    satelliteRefreshInterval, setSatelliteRefreshInterval,
    viewerRef,
    cameraMode, setCameraMode,
  } = useAppStore();

  const handleCameraReset = () => {
    if (!viewerRef) return;
    const { Cartesian3, Math: CesiumMath } = window.Cesium || {};
    if (!Cartesian3) return;
    viewerRef.camera.flyTo({
      destination: Cartesian3.fromDegrees(0, 20, 22_000_000),
      orientation: { heading: 0, pitch: CesiumMath.toRadians(-30), roll: 0 },
      duration: 2.0,
    });
  };

  const handleFullscreen = () => {
    const el = document.getElementById('cesium-container');
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div className="panel-enter" style={{ padding: '0 20px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingTop: 16 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'rgba(148,163,184,0.12)',
          border: '1px solid rgba(148,163,184,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Settings size={16} color="#94a3b8" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Settings</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Globe & display options</div>
        </div>
      </div>

      {/* Globe section */}
      <SectionLabel icon={<Globe size={11} />} label="GLOBE" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        <Toggle
          label="Terrain"
          hint="3D elevation data"
          value={showTerrain}
          onChange={setShowTerrain}
          color="#00d9ff"
        />
        <Toggle
          label="Atmosphere & Glow"
          hint="Sky atmosphere, fog"
          value={showAtmosphere}
          onChange={setShowAtmosphere}
          color="#00d9ff"
        />
        <Toggle
          label="Clouds Layer"
          hint="Dynamic cloud cover"
          value={showClouds}
          onChange={setShowClouds}
          color="#00d9ff"
        />
        <Toggle
          label="Orbit Paths"
          hint="Draw satellite orbits"
          value={showOrbitPaths}
          onChange={setShowOrbitPaths}
          color="#a78bfa"
        />
      </div>

      {/* Refresh interval */}
      <SectionLabel icon={<RefreshCw size={11} />} label="SATELLITE REFRESH" />
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: '12px 14px',
        marginBottom: 18,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: '#e2e8f0' }}>Interval</span>
          <span style={{
            fontSize: 12, color: '#00d9ff',
            fontFamily: '"JetBrains Mono", monospace', fontWeight: 700,
          }}>
            {satelliteRefreshInterval}s
          </span>
        </div>
        <input
          type="range"
          min={10} max={30} step={5}
          value={satelliteRefreshInterval}
          onChange={e => setSatelliteRefreshInterval(Number(e.target.value))}
          style={{
            width: '100%', accentColor: '#00d9ff',
            cursor: 'pointer', height: 3,
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>10s</span>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>30s</span>
        </div>
      </div>

      {/* Camera controls */}
      <SectionLabel icon={<Home size={11} />} label="CAMERA" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 18 }}>
        {/* Mode toggle */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          padding: '4px',
          display: 'flex',
          gap: 4,
        }}>
          {[['earth', '🌍 Earth Mode'], ['space', '🚀 Space Mode']].map(([mode, label]) => (
            <button
              key={mode}
              onClick={() => setCameraMode(mode)}
              style={{
                flex: 1,
                padding: '7px 0',
                borderRadius: 7,
                border: 'none',
                background: cameraMode === mode
                  ? mode === 'earth' ? 'rgba(0,217,255,0.18)' : 'rgba(217,70,239,0.18)'
                  : 'transparent',
                color: cameraMode === mode
                  ? mode === 'earth' ? '#00d9ff' : '#d946ef'
                  : 'rgba(255,255,255,0.4)',
                fontSize: 11, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <CameraBtn icon={<Home size={13} />} label="Reset Camera" onClick={handleCameraReset} />
        <CameraBtn icon={<Maximize size={13} />} label="Fullscreen" onClick={handleFullscreen} />
      </div>

      {/* About */}
      <SectionLabel icon={<Info size={11} />} label="ABOUT" />
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 10,
        padding: '12px 14px',
        fontSize: 11,
        color: 'rgba(255,255,255,0.35)',
        lineHeight: 1.6,
      }}>
        <div style={{ color: '#00d9ff', fontWeight: 700, fontSize: 12, marginBottom: 6 }}>AstroNova</div>
        Real-time space situational awareness platform.<br />
        <br />
        <span style={{ opacity: 0.6 }}>Data sources:</span><br />
        • N2YO — Satellite tracking<br />
        • NASA NeoWs — Near-Earth Objects<br />
        • Astronomy API — Moon & Planets<br />
        • OpenStreetMap — Geocoding<br />
        • CesiumJS — 3D Globe
      </div>
    </div>
  );
};

const SectionLabel = ({ icon, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
    <span style={{ color: 'rgba(255,255,255,0.3)' }}>{icon}</span>
    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
      {label}
    </span>
    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)', marginLeft: 4 }} />
  </div>
);

const Toggle = ({ label, hint, value, onChange, color }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 9,
    padding: '9px 12px',
  }}>
    <div>
      <div style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 600 }}>{label}</div>
      {hint && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>{hint}</div>}
    </div>
    <button
      onClick={() => onChange(!value)}
      role="switch"
      aria-checked={value}
      style={{
        width: 36,
        height: 20,
        borderRadius: 999,
        border: 'none',
        background: value ? color : 'rgba(255,255,255,0.1)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute',
        top: 2,
        left: value ? 18 : 2,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: '#fff',
        transition: 'left 0.2s cubic-bezier(0.22,1,0.36,1)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
      }} />
    </button>
  </div>
);

const CameraBtn = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '9px 12px',
      borderRadius: 9,
      border: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(255,255,255,0.03)',
      color: 'rgba(255,255,255,0.6)',
      fontSize: 12, fontWeight: 600,
      cursor: 'pointer', transition: 'all 0.18s',
      fontFamily: 'Inter, sans-serif',
      textAlign: 'left',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
      e.currentTarget.style.color = '#e2e8f0';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
    }}
  >
    {icon}
    {label}
  </button>
);

export default SettingsPanel;
