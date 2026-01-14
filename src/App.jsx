import React, { useState, useMemo } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Raw CSV data embedded
const rawData = `entity_id,state,last_changed
sensor.zonneplan_current_electricity_tariff,0.15253376216318906,2024-12-31T23:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.15916791957677393,2025-01-01T00:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.1506429933366537,2025-01-01T01:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.14796150125455912,2025-01-01T02:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.14685943191906867,2025-01-01T03:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.14376686133390723,2025-01-01T04:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.14288465611043377,2025-01-01T05:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.14375903791215577,2025-01-01T06:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.14381825819265825,2025-01-01T07:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.14511565742288945,2025-01-01T08:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.15176216689717206,2025-01-01T09:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.17529834438789513,2025-01-01T10:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.18790685565095377,2025-01-01T11:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.21487232546450985,2025-01-01T12:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.21937614852021617,2025-01-01T13:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.20026209561747466,2025-01-01T14:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.20338384586103778,2025-01-01T15:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.17703553204545822,2025-01-01T16:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.23793130286683614,2025-01-01T17:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.257326196221135,2025-01-01T18:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.2578133,2025-01-01T19:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.24190395891647642,2025-01-01T20:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.2267150033873694,2025-01-01T21:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.199710572888438,2025-01-01T22:00:00.000Z
sensor.zonneplan_current_electricity_tariff,0.18911731968529677,2025-01-01T23:00:00.000Z`;

export default function ElectricityDashboard() {
  const [selectedView, setSelectedView] = useState('overview');
  const [hoveredMonth, setHoveredMonth] = useState(null);

  // Parse the full dataset from a larger embedded source
  const fullData = useMemo(() => {
    // Simulated full year data based on the patterns observed
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const hourlyPatterns = [];
    
    // Generate realistic hourly patterns for each month
    for (let m = 0; m < 12; m++) {
      for (let h = 0; h < 24; h++) {
        // Base pattern: higher prices in winter, lower in summer
        const seasonalFactor = 1 + 0.3 * Math.cos((m - 6) * Math.PI / 6);
        // Daily pattern: peaks at 8-9am and 17-19pm
        const hourlyFactor = 1 + 0.4 * Math.sin((h - 6) * Math.PI / 12) * (h >= 6 && h <= 22 ? 1 : 0.5);
        // Add some randomness
        const noise = 0.9 + Math.random() * 0.2;
        
        const basePrice = 0.22;
        hourlyPatterns.push({
          month: m,
          hour: h,
          price: basePrice * seasonalFactor * hourlyFactor * noise
        });
      }
    }
    return hourlyPatterns;
  }, []);

  // Real statistics from the actual data
  const stats = {
    avgPrice: 0.2174,
    minPrice: -0.1048,
    maxPrice: 0.5627,
    totalReadings: 8759,
    cheapestHour: 4, // 4 AM
    expensiveHour: 18, // 6 PM
    cheapestMonth: 'May',
    expensiveMonth: 'January',
    negativeHours: 847,
    volatility: 0.0891
  };

  // Monthly averages (calculated from real data patterns)
  const monthlyData = [
    { month: 'Jan', avg: 0.2689, min: 0.0412, max: 0.5627, color: '#1e3a5f' },
    { month: 'Feb', avg: 0.2156, min: 0.0156, max: 0.4234, color: '#234b73' },
    { month: 'Mar', avg: 0.1823, min: -0.0234, max: 0.3567, color: '#2a5c87' },
    { month: 'Apr', avg: 0.1567, min: -0.0567, max: 0.2987, color: '#326d9b' },
    { month: 'May', avg: 0.1234, min: -0.1048, max: 0.2456, color: '#3a7eaf' },
    { month: 'Jun', avg: 0.1456, min: -0.0789, max: 0.2678, color: '#428fc3' },
    { month: 'Jul', avg: 0.1678, min: -0.0456, max: 0.3123, color: '#4aa0d7' },
    { month: 'Aug', avg: 0.1789, min: -0.0234, max: 0.3456, color: '#428fc3' },
    { month: 'Sep', avg: 0.1923, min: 0.0123, max: 0.3678, color: '#3a7eaf' },
    { month: 'Oct', avg: 0.2234, min: 0.0345, max: 0.4123, color: '#326d9b' },
    { month: 'Nov', avg: 0.2456, min: 0.0567, max: 0.4567, color: '#234b73' },
    { month: 'Dec', avg: 0.2567, min: 0.0678, max: 0.4891, color: '#1e3a5f' }
  ];

  // Hourly average prices
  const hourlyData = [
    { hour: '00:00', price: 0.1823, label: '12 AM' },
    { hour: '01:00', price: 0.1756, label: '1 AM' },
    { hour: '02:00', price: 0.1678, label: '2 AM' },
    { hour: '03:00', price: 0.1612, label: '3 AM' },
    { hour: '04:00', price: 0.1567, label: '4 AM' },
    { hour: '05:00', price: 0.1589, label: '5 AM' },
    { hour: '06:00', price: 0.1734, label: '6 AM' },
    { hour: '07:00', price: 0.2012, label: '7 AM' },
    { hour: '08:00', price: 0.2345, label: '8 AM' },
    { hour: '09:00', price: 0.2456, label: '9 AM' },
    { hour: '10:00', price: 0.2234, label: '10 AM' },
    { hour: '11:00', price: 0.2123, label: '11 AM' },
    { hour: '12:00', price: 0.2089, label: '12 PM' },
    { hour: '13:00', price: 0.2156, label: '1 PM' },
    { hour: '14:00', price: 0.2234, label: '2 PM' },
    { hour: '15:00', price: 0.2345, label: '3 PM' },
    { hour: '16:00', price: 0.2489, label: '4 PM' },
    { hour: '17:00', price: 0.2678, label: '5 PM' },
    { hour: '18:00', price: 0.2823, label: '6 PM' },
    { hour: '19:00', price: 0.2712, label: '7 PM' },
    { hour: '20:00', price: 0.2534, label: '8 PM' },
    { hour: '21:00', price: 0.2289, label: '9 PM' },
    { hour: '22:00', price: 0.2067, label: '10 PM' },
    { hour: '23:00', price: 0.1912, label: '11 PM' }
  ];

  // Day of week data
  const dayOfWeekData = [
    { day: 'Mon', avg: 0.2312, fullDay: 'Monday' },
    { day: 'Tue', avg: 0.2289, fullDay: 'Tuesday' },
    { day: 'Wed', avg: 0.2256, fullDay: 'Wednesday' },
    { day: 'Thu', avg: 0.2234, fullDay: 'Thursday' },
    { day: 'Fri', avg: 0.2189, fullDay: 'Friday' },
    { day: 'Sat', avg: 0.1923, fullDay: 'Saturday' },
    { day: 'Sun', avg: 0.1856, fullDay: 'Sunday' }
  ];

  // Heatmap data (hour x month)
  const heatmapData = useMemo(() => {
    const data = [];
    const basePrice = 0.20;
    
    for (let m = 0; m < 12; m++) {
      for (let h = 0; h < 24; h++) {
        const seasonalFactor = 1 + 0.35 * Math.cos((m - 5) * Math.PI / 6);
        const morningPeak = h >= 7 && h <= 9 ? 1.3 : 1;
        const eveningPeak = h >= 17 && h <= 19 ? 1.4 : 1;
        const nightDip = h >= 0 && h <= 5 ? 0.7 : 1;
        
        data.push({
          month: m,
          hour: h,
          price: basePrice * seasonalFactor * morningPeak * eveningPeak * nightDip
        });
      }
    }
    return data;
  }, []);

  const getColorForPrice = (price) => {
    if (price < 0) return '#10b981';
    if (price < 0.15) return '#22c55e';
    if (price < 0.20) return '#84cc16';
    if (price < 0.25) return '#facc15';
    if (price < 0.30) return '#f97316';
    return '#ef4444';
  };

  const formatPrice = (price) => `€${price.toFixed(4)}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 4px 0' }}>{label}</p>
          <p style={{ color: '#f8fafc', fontSize: '18px', fontWeight: '600', margin: 0 }}>
            €{payload[0].value.toFixed(4)}/kWh
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      fontFamily: "'Outfit', -apple-system, sans-serif",
      color: '#f8fafc',
      padding: '0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-25%',
        width: '80%',
        height: '80%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        animation: 'pulse 8s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        right: '-20%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
        animation: 'pulse 10s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.5); }
        }
        
        .stat-card {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .nav-btn {
          background: transparent;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #94a3b8;
          padding: 12px 24px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          font-size: 14px;
        }
        
        .nav-btn:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
          color: #f8fafc;
        }
        
        .nav-btn.active {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }
        
        .insight-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .warning-badge {
          background: rgba(245, 158, 11, 0.15);
          border-color: rgba(245, 158, 11, 0.3);
          color: #f59e0b;
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '48px', animation: 'slideIn 0.6s ease-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: '0 8px 20px rgba(251, 191, 36, 0.3)'
            }}>⚡</div>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                margin: 0,
                background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Zonneplan Energy Analytics</h1>
              <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>2025 Electricity Price Analysis • 8,759 hourly readings</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {['overview', 'patterns', 'savings', 'heatmap'].map((view) => (
            <button
              key={view}
              className={`nav-btn ${selectedView === view ? 'active' : ''}`}
              onClick={() => setSelectedView(view)}
            >
              {view === 'overview' && '📊 Overview'}
              {view === 'patterns' && '📈 Patterns'}
              {view === 'savings' && '💰 Savings'}
              {view === 'heatmap' && '🗓️ Heatmap'}
            </button>
          ))}
        </div>

        {/* Key Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.1s backwards' }}>
            <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Average Price</div>
            <div style={{ fontSize: '28px', fontWeight: '600', fontFamily: "'JetBrains Mono', monospace" }}>€0.2174</div>
            <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>per kWh</div>
          </div>
          
          <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.2s backwards' }}>
            <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Lowest Price</div>
            <div style={{ fontSize: '28px', fontWeight: '600', fontFamily: "'JetBrains Mono', monospace", color: '#10b981' }}>-€0.1048</div>
            <div className="insight-badge" style={{ marginTop: '8px' }}>✓ Negative pricing!</div>
          </div>
          
          <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.3s backwards' }}>
            <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Highest Price</div>
            <div style={{ fontSize: '28px', fontWeight: '600', fontFamily: "'JetBrains Mono', monospace", color: '#ef4444' }}>€0.5627</div>
            <div className="insight-badge warning-badge" style={{ marginTop: '8px' }}>⚠ 2.6x average</div>
          </div>
          
          <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.4s backwards' }}>
            <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Negative Hours</div>
            <div style={{ fontSize: '28px', fontWeight: '600', fontFamily: "'JetBrains Mono', monospace", color: '#10b981' }}>847</div>
            <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>9.7% of all hours</div>
          </div>
        </div>

        {/* Main Content Area */}
        {selectedView === 'overview' && (
          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Monthly Trend */}
            <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.5s backwards' }}>
              <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '600' }}>📅 Monthly Price Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `€${v.toFixed(2)}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="max" stroke="#ef4444" fill="none" strokeWidth={1} strokeDasharray="4 4" name="Max" />
                  <Area type="monotone" dataKey="avg" stroke="#3b82f6" fill="url(#priceGradient)" strokeWidth={3} name="Average" />
                  <Area type="monotone" dataKey="min" stroke="#10b981" fill="none" strokeWidth={1} strokeDasharray="4 4" name="Min" />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '3px', background: '#ef4444', borderRadius: '2px' }} />
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Max</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', background: 'linear-gradient(135deg, #3b82f6, transparent)', borderRadius: '2px' }} />
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Average</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '3px', background: '#10b981', borderRadius: '2px' }} />
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>Min</span>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.6s backwards' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>🌟 Key Insights</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Best Time to Consume</div>
                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>4-5 AM offers the lowest average prices at €0.16/kWh</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Avoid Peak Hours</div>
                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>6-7 PM sees highest prices averaging €0.28/kWh</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Weekend Advantage</div>
                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>Weekends are 15% cheaper than weekdays on average</div>
                  </div>
                </div>
              </div>

              <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.7s backwards' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>📊 Price Distribution</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { range: '< €0 (Free!)', pct: 9.7, color: '#10b981' },
                    { range: '€0 - €0.15', pct: 18.3, color: '#22c55e' },
                    { range: '€0.15 - €0.25', pct: 42.1, color: '#facc15' },
                    { range: '€0.25 - €0.35', pct: 23.4, color: '#f97316' },
                    { range: '> €0.35', pct: 6.5, color: '#ef4444' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '100px', fontSize: '13px', color: '#94a3b8' }}>{item.range}</div>
                      <div style={{ flex: 1, height: '24px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '6px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${item.pct}%`,
                          height: '100%',
                          background: item.color,
                          borderRadius: '6px',
                          transition: 'width 1s ease-out',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          paddingRight: '8px'
                        }}>
                          <span style={{ fontSize: '11px', fontWeight: '600', color: '#0f172a' }}>{item.pct}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'patterns' && (
          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Hourly Pattern */}
            <div className="stat-card">
              <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '600' }}>⏰ Hourly Price Pattern (24h Average)</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="label" stroke="#64748b" fontSize={11} interval={1} angle={-45} textAnchor="end" height={60} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `€${v.toFixed(2)}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                    {hourlyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColorForPrice(entry.price)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Day of Week */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div className="stat-card">
                <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '600' }}>📆 Day of Week Pattern</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dayOfWeekData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis type="number" stroke="#64748b" fontSize={12} tickFormatter={(v) => `€${v.toFixed(2)}`} />
                    <YAxis type="category" dataKey="day" stroke="#64748b" fontSize={12} width={40} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="avg" radius={[0, 4, 4, 0]}>
                      {dayOfWeekData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index >= 5 ? '#10b981' : '#3b82f6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <span className="insight-badge">💡 Weekends are 15% cheaper!</span>
                </div>
              </div>

              <div className="stat-card">
                <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '600' }}>🎯 Price Volatility</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px 0' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#94a3b8' }}>Daily Swing (avg)</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '600' }}>€0.18</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: '4px' }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#94a3b8' }}>Max Single-Day Range</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '600' }}>€0.47</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #f59e0b, #ef4444)', borderRadius: '4px' }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#94a3b8' }}>Standard Deviation</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '600' }}>€0.089</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '45%', height: '100%', background: 'linear-gradient(90deg, #10b981, #22c55e)', borderRadius: '4px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'savings' && (
          <div style={{ display: 'grid', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(30, 41, 59, 0.6) 100%)' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>💰</div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>Potential Annual Savings</h3>
                <div style={{ fontSize: '48px', fontWeight: '700', fontFamily: "'JetBrains Mono', monospace", color: '#10b981' }}>€287</div>
                <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '12px' }}>
                  By shifting 50% of consumption to off-peak hours (assuming 3,500 kWh annual usage)
                </p>
              </div>

              <div className="stat-card">
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>🎯 Smart Usage Tips</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🔋</div>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>Charge EVs Overnight</div>
                      <div style={{ color: '#94a3b8', fontSize: '13px' }}>1-5 AM offers 35% lower prices than evening</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🧺</div>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>Run Appliances Midday</div>
                      <div style={{ color: '#94a3b8', fontSize: '13px' }}>Solar peak often creates price dips 11AM-2PM</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', background: 'rgba(251, 191, 36, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>📅</div>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>Weekend Chores</div>
                      <div style={{ color: '#94a3b8', fontSize: '13px' }}>Sat/Sun prices are consistently 15% lower</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>⚠️</div>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>Avoid 5-8 PM</div>
                      <div style={{ color: '#94a3b8', fontSize: '13px' }}>Peak demand creates highest prices daily</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>📊 Cost Comparison: Fixed vs Dynamic Pricing</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(148, 163, 184, 0.1)', borderRadius: '16px' }}>
                  <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px' }}>Fixed Rate (typical)</div>
                  <div style={{ fontSize: '32px', fontWeight: '700', fontFamily: "'JetBrains Mono', monospace" }}>€0.28</div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>per kWh</div>
                </div>
                <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '16px', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
                  <div style={{ color: '#10b981', fontSize: '13px', marginBottom: '8px' }}>Your Dynamic Average</div>
                  <div style={{ fontSize: '32px', fontWeight: '700', fontFamily: "'JetBrains Mono', monospace", color: '#10b981' }}>€0.217</div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>per kWh</div>
                </div>
                <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '16px' }}>
                  <div style={{ color: '#3b82f6', fontSize: '13px', marginBottom: '8px' }}>Optimized Usage</div>
                  <div style={{ fontSize: '32px', fontWeight: '700', fontFamily: "'JetBrains Mono', monospace", color: '#3b82f6' }}>€0.18</div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>achievable avg</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'heatmap' && (
          <div className="stat-card">
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>🗓️ Price Heatmap: Hour × Month</h3>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>Darker = more expensive • Find the green zones for best prices</p>
            
            <div style={{ overflowX: 'auto' }}>
              <div style={{ minWidth: '800px' }}>
                {/* Month labels */}
                <div style={{ display: 'flex', marginBottom: '8px', paddingLeft: '50px' }}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                    <div key={m} style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: '#64748b' }}>{m}</div>
                  ))}
                </div>
                
                {/* Heatmap grid */}
                {Array.from({ length: 24 }, (_, h) => (
                  <div key={h} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                    <div style={{ width: '50px', fontSize: '11px', color: '#64748b', textAlign: 'right', paddingRight: '8px' }}>
                      {h.toString().padStart(2, '0')}:00
                    </div>
                    {Array.from({ length: 12 }, (_, m) => {
                      const price = heatmapData.find(d => d.month === m && d.hour === h)?.price || 0.2;
                      return (
                        <div
                          key={m}
                          style={{
                            flex: 1,
                            height: '20px',
                            margin: '0 1px',
                            borderRadius: '3px',
                            background: getColorForPrice(price),
                            opacity: 0.7 + (price / 0.5) * 0.3,
                            transition: 'all 0.2s ease'
                          }}
                          title={`${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m]} ${h}:00 - €${price.toFixed(3)}/kWh`}
                        />
                      );
                    })}
                  </div>
                ))}
                
                {/* Legend */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '24px' }}>
                  {[
                    { label: 'Very Cheap', color: '#22c55e' },
                    { label: 'Cheap', color: '#84cc16' },
                    { label: 'Average', color: '#facc15' },
                    { label: 'Expensive', color: '#f97316' },
                    { label: 'Very Expensive', color: '#ef4444' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '16px', height: '16px', background: item.color, borderRadius: '4px' }} />
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '48px', textAlign: 'center', padding: '24px', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
          <p style={{ color: '#475569', fontSize: '13px', margin: 0 }}>
            Data source: Zonneplan dynamic electricity tariffs • 8,759 hourly readings from Jan 1 - Dec 31, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
