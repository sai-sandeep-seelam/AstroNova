import { useState, useEffect } from 'react';
import { AlertTriangle, ChevronRight, RefreshCw } from 'lucide-react';
import { useAppStore } from '../context/store';

const CATEGORIES = [
  { id: 'decaying', label: 'Decaying', query: 'SPECIAL=DECAYING', color: '#f97316' },
  { id: 'cosmos2251', label: 'Cosmos 2251', query: 'NAME=COSMOS 2251 DEB', color: '#ef4444' },
  { id: 'fengyun1c', label: 'Fengyun 1C', query: 'NAME=FENGYUN 1C DEB', color: '#eab308' },
  { id: 'iridium33', label: 'Iridium 33', query: 'NAME=IRIDIUM 33 DEB', color: '#8b5cf6' },
];

const DebrisPanel = () => {
  const [activeTab, setActiveTab] = useState('decaying');
  const [debrisData, setDebrisData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setSelectedSatellite } = useAppStore();

  useEffect(() => {
    let isMounted = true;
    const fetchDebris = async () => {
      setLoading(true);
      setError(null);
      setDebrisData([]);
      try {
        const cat = CATEGORIES.find(c => c.id === activeTab);
        const res = await fetch(`https://celestrak.org/NORAD/elements/gp.php?${cat.query}&FORMAT=JSON`);
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        if (isMounted) {
          setDebrisData(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchDebris();
    return () => { isMounted = false; };
  }, [activeTab]);

  const focusDebris = (item) => {
    setSelectedSatellite({
      satname: item.OBJECT_NAME,
      satid: item.NORAD_CAT_ID,
      inclination: item.INCLINATION,
      ...item
    });
  };

  return (
    <div className="panel-enter" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'rgba(249,115,22,0.12)',
          border: '1px solid rgba(249,115,22,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <AlertTriangle size={16} color="#f97316" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Space Debris</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
            Celestrak GP Data
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 16 }}>
        {CATEGORIES.map(({ id, label, color }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                padding: '4px 10px',
                borderRadius: 999,
                border: `1px solid ${active ? color + '60' : 'rgba(255,255,255,0.08)'}`,
                background: active ? `${color}18` : 'rgba(255,255,255,0.04)',
                color: active ? color : 'rgba(255,255,255,0.45)',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.18s',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="panel-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', color: 'rgba(255,255,255,0.3)' }}>
            <RefreshCw size={18} className="animate-spin" />
          </div>
        ) : error ? (
          <div style={{ color: '#ef4444', fontSize: 12, textAlign: 'center' }}>Failed to load: {error}</div>
        ) : debrisData.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 12, padding: '20px 0' }}>
            No debris found
          </div>
        ) : (
          debrisData.map((item, idx) => {
            const catColor = CATEGORIES.find(c => c.id === activeTab)?.color || '#f97316';
            return (
              <DebrisCard key={item.NORAD_CAT_ID || idx} item={item} color={catColor} onFocus={() => focusDebris(item)} />
            );
          })
        )}
      </div>
    </div>
  );
};

const DebrisCard = ({ item, color, onFocus }) => (
  <div
    onClick={onFocus}
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 10,
      padding: '10px 12px',
      cursor: 'pointer',
      transition: 'all 0.18s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
      e.currentTarget.style.borderColor = `${color}40`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
    }}
  >
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
        <span style={{
          display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
          background: color, boxShadow: `0 0 4px ${color}`, flexShrink: 0,
        }} />
        <span style={{
          fontSize: 12, fontWeight: 600, color: '#e2e8f0',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {item.OBJECT_NAME}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <MiniStat label="ID" value={item.NORAD_CAT_ID} />
        <MiniStat label="PERIOD" value={`${parseFloat(item.PERIOD || 0).toFixed(1)}m`} />
      </div>
    </div>
    <ChevronRight size={14} color="rgba(255,255,255,0.2)" />
  </div>
);

const MiniStat = ({ label, value }) => (
  <div>
    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>{label} </span>
    <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: '"JetBrains Mono", monospace', fontWeight: 600 }}>{value}</span>
  </div>
);

export default DebrisPanel;
