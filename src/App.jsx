import React, { useState, useMemo } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export default function ElectricityDashboard() {
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedYear, setSelectedYear] = useState('both');

  // Real statistics from actual data analysis
  const stats2025 = {
    avgPrice: 0.2479,
    minPrice: -0.2797,
    maxPrice: 0.7679,
    totalReadings: 8757,
    negativeHours: 9
  };

  const stats2024 = {
    avgPrice: 0.2450,
    minPrice: -0.0904,
    maxPrice: 1.2031,
    totalReadings: 8746,
    negativeHours: 7
  };

  // Monthly averages from real data
  const monthlyData = [
    { month: 'Jan', avg2025: 0.2840, avg2024: 0.2465, min2025: 0.1429, max2025: 0.7679, min2024: 0.1457, max2024: 0.3284 },
    { month: 'Feb', avg2025: 0.2952, avg2024: 0.2290, min2025: 0.1478, max2025: 0.4765, min2024: 0.1516, max2024: 0.3158 },
    { month: 'Mar', avg2025: 0.2540, avg2024: 0.2288, min2025: 0.1029, max2025: 0.4366, min2024: 0.1040, max2024: 0.3455 },
    { month: 'Apr', avg2025: 0.2334, avg2024: 0.2227, min2025: -0.0837, max2025: 0.4430, min2024: 0.0004, max2024: 0.3739 },
    { month: 'May', avg2025: 0.2206, avg2024: 0.2311, min2025: -0.2797, max2025: 0.3958, min2024: -0.0904, max2024: 0.3513 },
    { month: 'Jun', avg2025: 0.2247, avg2024: 0.2320, min2025: 0.0787, max2025: 0.4892, min2024: 0.0403, max2024: 0.3975 },
    { month: 'Jul', avg2025: 0.2489, avg2024: 0.2303, min2025: 0.1405, max2025: 0.7620, min2024: -0.0281, max2024: 0.4429 },
    { month: 'Aug', avg2025: 0.2330, avg2024: 0.2449, min2025: 0.0652, max2025: 0.4734, min2024: 0.0808, max2024: 0.4882 },
    { month: 'Sep', avg2025: 0.2368, avg2024: 0.2457, min2025: 0.0663, max2025: 0.6034, min2024: 0.1029, max2024: 0.5627 },
    { month: 'Oct', avg2025: 0.2425, avg2024: 0.2576, min2025: 0.1371, max2025: 0.5892, min2024: 0.1395, max2024: 0.4691 },
    { month: 'Nov', avg2025: 0.2563, avg2024: 0.2890, min2025: 0.1480, max2025: 0.4843, min2024: 0.1484, max2024: 0.8122 },
    { month: 'Dec', avg2025: 0.2490, avg2024: 0.2822, min2025: 0.1461, max2025: 0.4534, min2024: 0.1493, max2024: 1.2031 }
  ];

  // Hourly averages from real data
  const hourlyData = [
    { hour: '00:00', price2025: 0.2456, price2024: 0.2392, label: '12 AM' },
    { hour: '01:00', price2025: 0.2414, price2024: 0.2346, label: '1 AM' },
    { hour: '02:00', price2025: 0.2383, price2024: 0.2315, label: '2 AM' },
    { hour: '03:00', price2025: 0.2376, price2024: 0.2298, label: '3 AM' },
    { hour: '04:00', price2025: 0.2410, price2024: 0.2325, label: '4 AM' },
    { hour: '05:00', price2025: 0.2522, price2024: 0.2445, label: '5 AM' },
    { hour: '06:00', price2025: 0.2652, price2024: 0.2577, label: '6 AM' },
    { hour: '07:00', price2025: 0.2707, price2024: 0.2614, label: '7 AM' },
    { hour: '08:00', price2025: 0.2601, price2024: 0.2538, label: '8 AM' },
    { hour: '09:00', price2025: 0.2374, price2024: 0.2392, label: '9 AM' },
    { hour: '10:00', price2025: 0.2187, price2024: 0.2249, label: '10 AM' },
    { hour: '11:00', price2025: 0.2032, price2024: 0.2130, label: '11 AM' },
    { hour: '12:00', price2025: 0.1949, price2024: 0.2042, label: '12 PM' },
    { hour: '13:00', price2025: 0.1945, price2024: 0.2026, label: '1 PM' },
    { hour: '14:00', price2025: 0.2058, price2024: 0.2107, label: '2 PM' },
    { hour: '15:00', price2025: 0.2232, price2024: 0.2272, label: '3 PM' },
    { hour: '16:00', price2025: 0.2510, price2024: 0.2522, label: '4 PM' },
    { hour: '17:00', price2025: 0.2835, price2024: 0.2812, label: '5 PM' },
    { hour: '18:00', price2025: 0.3057, price2024: 0.3000, label: '6 PM' },
    { hour: '19:00', price2025: 0.3064, price2024: 0.2997, label: '7 PM' },
    { hour: '20:00', price2025: 0.2892, price2024: 0.2785, label: '8 PM' },
    { hour: '21:00', price2025: 0.2722, price2024: 0.2627, label: '9 PM' },
    { hour: '22:00', price2025: 0.2602, price2024: 0.2524, label: '10 PM' },
    { hour: '23:00', price2025: 0.2520, price2024: 0.2460, label: '11 PM' }
  ];

  // Day of week data from real analysis
  const dayOfWeekData = [
    { day: 'Mon', avg2025: 0.2532, avg2024: 0.2516 },
    { day: 'Tue', avg2025: 0.2563, avg2024: 0.2543 },
    { day: 'Wed', avg2025: 0.2609, avg2024: 0.2571 },
    { day: 'Thu', avg2025: 0.2539, avg2024: 0.2562 },
    { day: 'Fri', avg2025: 0.2525, avg2024: 0.2497 },
    { day: 'Sat', avg2025: 0.2346, avg2024: 0.2300 },
    { day: 'Sun', avg2025: 0.2239, avg2024: 0.2157 }
  ];

  // Real heatmap data for 2025 (Month x Hour)
  const heatmapData2025 = [
    [0.259, 0.254, 0.247, 0.244, 0.240, 0.246, 0.264, 0.297, 0.328, 0.317, 0.296, 0.281, 0.273, 0.271, 0.278, 0.296, 0.312, 0.340, 0.338, 0.317, 0.296, 0.284, 0.275, 0.264],
    [0.275, 0.270, 0.269, 0.266, 0.267, 0.271, 0.290, 0.321, 0.341, 0.321, 0.298, 0.280, 0.271, 0.268, 0.273, 0.284, 0.303, 0.335, 0.350, 0.337, 0.317, 0.299, 0.294, 0.283],
    [0.259, 0.253, 0.250, 0.248, 0.249, 0.258, 0.280, 0.295, 0.277, 0.244, 0.214, 0.189, 0.177, 0.174, 0.189, 0.217, 0.251, 0.292, 0.332, 0.331, 0.302, 0.280, 0.272, 0.262],
    [0.244, 0.243, 0.240, 0.240, 0.248, 0.268, 0.287, 0.275, 0.240, 0.205, 0.180, 0.155, 0.140, 0.140, 0.161, 0.182, 0.221, 0.262, 0.298, 0.312, 0.286, 0.267, 0.256, 0.252],
    [0.244, 0.241, 0.238, 0.239, 0.246, 0.262, 0.265, 0.248, 0.210, 0.171, 0.153, 0.128, 0.116, 0.120, 0.139, 0.161, 0.196, 0.242, 0.274, 0.310, 0.301, 0.278, 0.259, 0.253],
    [0.250, 0.246, 0.243, 0.243, 0.247, 0.256, 0.253, 0.237, 0.206, 0.175, 0.159, 0.147, 0.139, 0.136, 0.144, 0.155, 0.190, 0.235, 0.271, 0.314, 0.322, 0.296, 0.270, 0.261],
    [0.259, 0.254, 0.250, 0.251, 0.256, 0.267, 0.267, 0.264, 0.246, 0.225, 0.212, 0.198, 0.187, 0.182, 0.192, 0.210, 0.239, 0.259, 0.286, 0.316, 0.316, 0.294, 0.275, 0.267],
    [0.247, 0.243, 0.240, 0.241, 0.249, 0.260, 0.262, 0.253, 0.229, 0.204, 0.182, 0.167, 0.157, 0.158, 0.171, 0.187, 0.221, 0.253, 0.288, 0.310, 0.289, 0.272, 0.259, 0.253],
    [0.225, 0.223, 0.222, 0.225, 0.233, 0.255, 0.283, 0.272, 0.242, 0.213, 0.190, 0.178, 0.172, 0.174, 0.186, 0.205, 0.244, 0.295, 0.348, 0.308, 0.268, 0.253, 0.239, 0.230],
    [0.220, 0.215, 0.211, 0.211, 0.215, 0.231, 0.257, 0.275, 0.264, 0.247, 0.231, 0.221, 0.215, 0.216, 0.226, 0.240, 0.268, 0.304, 0.317, 0.279, 0.255, 0.244, 0.233, 0.226],
    [0.236, 0.231, 0.227, 0.224, 0.224, 0.229, 0.240, 0.265, 0.276, 0.269, 0.258, 0.248, 0.246, 0.249, 0.257, 0.276, 0.295, 0.308, 0.297, 0.283, 0.266, 0.254, 0.250, 0.240],
    [0.232, 0.229, 0.225, 0.222, 0.222, 0.226, 0.235, 0.249, 0.265, 0.263, 0.256, 0.252, 0.249, 0.251, 0.258, 0.267, 0.277, 0.281, 0.272, 0.263, 0.255, 0.247, 0.244, 0.237]
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // FIXED: Color function - green for LOW prices, red for HIGH prices
  const getColorForPrice = (price) => {
    if (price < 0.15) return '#10b981'; // Green - very cheap
    if (price < 0.20) return '#22c55e'; // Light green - cheap  
    if (price < 0.24) return '#84cc16'; // Yellow-green - below average
    if (price < 0.28) return '#facc15'; // Yellow - average
    if (price < 0.32) return '#f97316'; // Orange - expensive
    return '#ef4444'; // Red - very expensive
  };

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
          <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 8px 0' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, fontSize: '14px', fontWeight: '600', margin: '4px 0' }}>
              {entry.name}: €{entry.value.toFixed(4)}/kWh
            </p>
          ))}
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
        
        .year-toggle {
          display: flex;
          gap: 8px;
          background: rgba(30, 41, 59, 0.8);
          padding: 4px;
          border-radius: 10px;
          border: 1px solid rgba(148, 163, 184, 0.1);
        }
        
        .year-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: #94a3b8;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          font-size: 13px;
          transition: all 0.2s ease;
        }
        
        .year-btn.active {
          background: rgba(59, 130, 246, 0.3);
          color: #f8fafc;
        }
        
        .year-btn:hover:not(.active) {
          background: rgba(148, 163, 184, 0.1);
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '48px', animation: 'slideIn 0.6s ease-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>2024 vs 2025 Electricity Price Comparison</p>
              </div>
            </div>
            
            <div className="year-toggle">
              <button className={`year-btn ${selectedYear === '2024' ? 'active' : ''}`} onClick={() => setSelectedYear('2024')}>2024</button>
              <button className={`year-btn ${selectedYear === '2025' ? 'active' : ''}`} onClick={() => setSelectedYear('2025')}>2025</button>
              <button className={`year-btn ${selectedYear === 'both' ? 'active' : ''}`} onClick={() => setSelectedYear('both')}>Compare</button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {['overview', 'patterns', 'comparison', 'heatmap'].map((view) => (
            <button
              key={view}
              className={`nav-btn ${selectedView === view ? 'active' : ''}`}
              onClick={() => setSelectedView(view)}
            >
              {view === 'overview' && '📊 Overview'}
              {view === 'patterns' && '📈 Patterns'}
              {view === 'comparison' && '⚖️ Year Comparison'}
              {view === 'heatmap' && '🗓️ Heatmap'}
            </button>
          ))}
        </div>

        {/* Key Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.1s backwards' }}>
            <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Price 2025</div>
            <div style={{ fontSize: '26px', fontWeight: '600', fontFamily: "'JetBrains Mono', monospace" }}>€{stats2025.avgPrice.toFixed(4)}</div>
            <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>+1.2% vs 2024</div>
          </div>
          
          <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.2s backwards' }}>
            <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Lowest 2025</div>
            <div style={{ fontSize: '26px', fontWeight: '600', fontFamily: "'JetBrains Mono', monospace", color: '#10b981' }}>-€{Math.abs(stats2025.minPrice).toFixed(2)}</div>
            <div className="insight-badge" style={{ marginTop: '8px' }}>✓ Got paid!</div>
          </div>
          
          <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.3s backwards' }}>
            <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Highest 2024</div>
            <div style={{ fontSize: '26px', fontWeight: '600', fontFamily: "'JetBrains Mono', monospace", color: '#ef4444' }}>€{stats2024.maxPrice.toFixed(2)}</div>
            <div className="warning-badge" style={{ marginTop: '8px' }}>⚠ Dec spike!</div>
          </div>
          
          <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.4s backwards' }}>
            <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Hours</div>
            <div style={{ fontSize: '26px', fontWeight: '600', fontFamily: "'JetBrains Mono', monospace" }}>17,503</div>
            <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>2 years of data</div>
          </div>
        </div>

        {/* Main Content Area */}
        {selectedView === 'overview' && (
          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Monthly Trend */}
            <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.5s backwards' }}>
              <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '600' }}>📅 Monthly Price Trends</h3>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="gradient2025" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gradient2024" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `€${v.toFixed(2)}`} domain={[0.2, 0.32]} />
                  <Tooltip content={<CustomTooltip />} />
                  {(selectedYear === '2025' || selectedYear === 'both') && (
                    <Area type="monotone" dataKey="avg2025" stroke="#3b82f6" fill="url(#gradient2025)" strokeWidth={3} name="2025" />
                  )}
                  {(selectedYear === '2024' || selectedYear === 'both') && (
                    <Area type="monotone" dataKey="avg2024" stroke="#f59e0b" fill="url(#gradient2024)" strokeWidth={3} name="2024" />
                  )}
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '24px', height: '4px', background: '#3b82f6', borderRadius: '2px' }} />
                  <span style={{ color: '#94a3b8', fontSize: '13px' }}>2025</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '24px', height: '4px', background: '#f59e0b', borderRadius: '2px' }} />
                  <span style={{ color: '#94a3b8', fontSize: '13px' }}>2024</span>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.6s backwards' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>🌟 Key Insights</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>2025 Winter Spike</div>
                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>Jan-Feb 2025 were 15-29% more expensive than 2024</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Solar Dip Magic</div>
                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>12-1 PM is the cheapest time (€0.19/kWh avg)</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Dec 2024 Crisis</div>
                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>Hit €1.20/kWh — the highest in both years!</div>
                  </div>
                </div>
              </div>

              <div className="stat-card" style={{ animation: 'slideIn 0.6s ease-out 0.7s backwards' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>📊 Year-over-Year</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Average Price', val2024: '€0.245', val2025: '€0.248', change: '+1.2%', up: true },
                    { label: 'Peak Price', val2024: '€1.20', val2025: '€0.77', change: '-36%', up: false },
                    { label: 'Min Price', val2024: '-€0.09', val2025: '-€0.28', change: '3x deeper', up: false },
                    { label: 'Volatility', val2024: 'High', val2025: 'Medium', change: 'Improved', up: false }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '10px' }}>
                      <span style={{ color: '#94a3b8', fontSize: '13px' }}>{item.label}</span>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', color: '#f59e0b' }}>{item.val2024}</span>
                        <span style={{ fontSize: '13px', color: '#3b82f6' }}>{item.val2025}</span>
                        <span style={{ fontSize: '12px', color: item.up ? '#ef4444' : '#10b981', fontWeight: '600' }}>{item.change}</span>
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
                <BarChart data={hourlyData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="label" stroke="#64748b" fontSize={10} interval={1} angle={-45} textAnchor="end" height={60} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `€${v.toFixed(2)}`} domain={[0.18, 0.32]} />
                  <Tooltip content={<CustomTooltip />} />
                  {(selectedYear === '2024' || selectedYear === 'both') && (
                    <Bar dataKey="price2024" name="2024" fill="#f59e0b" radius={[4, 4, 0, 0]} opacity={selectedYear === 'both' ? 0.7 : 1} />
                  )}
                  {(selectedYear === '2025' || selectedYear === 'both') && (
                    <Bar dataKey="price2025" name="2025" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={selectedYear === 'both' ? 0.7 : 1} />
                  )}
                </BarChart>
              </ResponsiveContainer>
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <span className="insight-badge">💡 Best time: 12-1 PM (solar peak) • Worst: 6-7 PM (evening demand)</span>
              </div>
            </div>

            {/* Day of Week */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div className="stat-card">
                <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '600' }}>📆 Day of Week Pattern</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dayOfWeekData} layout="vertical" barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis type="number" stroke="#64748b" fontSize={12} tickFormatter={(v) => `€${v.toFixed(2)}`} domain={[0.21, 0.27]} />
                    <YAxis type="category" dataKey="day" stroke="#64748b" fontSize={12} width={40} />
                    <Tooltip content={<CustomTooltip />} />
                    {(selectedYear === '2024' || selectedYear === 'both') && (
                      <Bar dataKey="avg2024" name="2024" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                    )}
                    {(selectedYear === '2025' || selectedYear === 'both') && (
                      <Bar dataKey="avg2025" name="2025" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                    )}
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <span className="insight-badge">💡 Sundays are 12% cheaper than Wednesdays!</span>
                </div>
              </div>

              <div className="stat-card">
                <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '600' }}>🎯 Smart Usage Tips</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>☀️</div>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>Midday Solar Window</div>
                      <div style={{ color: '#94a3b8', fontSize: '13px' }}>11AM-2PM offers 25% savings vs evening</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🌙</div>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>Night Owl Savings</div>
                      <div style={{ color: '#94a3b8', fontSize: '13px' }}>2-4 AM is the second cheapest window</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>⚠️</div>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>Danger Zone</div>
                      <div style={{ color: '#94a3b8', fontSize: '13px' }}>5-8 PM costs 57% more than midday</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'comparison' && (
          <div style={{ display: 'grid', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {/* 2024 Card */}
              <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📅</div>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>2024</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Average</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '600' }}>€0.2450</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Minimum</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '600', color: '#10b981' }}>-€0.0904</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Maximum</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '600', color: '#ef4444' }}>€1.2031</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Negative hours</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '600' }}>7</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Cheapest month</span>
                    <span style={{ fontWeight: '600' }}>April</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Most expensive</span>
                    <span style={{ fontWeight: '600' }}>November</span>
                  </div>
                </div>
              </div>

              {/* 2025 Card */}
              <div className="stat-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📅</div>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>2025</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Average</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '600' }}>€0.2479</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Minimum</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '600', color: '#10b981' }}>-€0.2797</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Maximum</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '600', color: '#ef4444' }}>€0.7679</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Negative hours</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '600' }}>9</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Cheapest month</span>
                    <span style={{ fontWeight: '600' }}>May</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Most expensive</span>
                    <span style={{ fontWeight: '600' }}>February</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Winner comparison */}
            <div className="stat-card">
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>🏆 Which Year Won?</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {[
                  { category: 'Lower Average', winner: '2024', diff: '€0.003 cheaper' },
                  { category: 'Better Minimum', winner: '2025', diff: '3x deeper negative' },
                  { category: 'Lower Maximum', winner: '2025', diff: '36% lower peak' },
                  { category: 'More Stable', winner: '2025', diff: 'Smaller range' },
                  { category: 'More Free Hours', winner: '2025', diff: '9 vs 7 hours' },
                  { category: 'Better Summer', winner: '2025', diff: 'May was cheapest' }
                ].map((item, i) => (
                  <div key={i} style={{ 
                    padding: '16px', 
                    background: item.winner === '2025' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                    borderRadius: '12px',
                    border: `1px solid ${item.winner === '2025' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                  }}>
                    <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>{item.category}</div>
                    <div style={{ fontWeight: '600', color: item.winner === '2025' ? '#3b82f6' : '#f59e0b' }}>{item.winner}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{item.diff}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'heatmap' && (
          <div className="stat-card">
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>🗓️ 2025 Price Heatmap: Hour × Month</h3>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>Green = cheap (buy!) • Red = expensive (avoid!) • Based on real hourly averages</p>
            
            <div style={{ overflowX: 'auto' }}>
              <div style={{ minWidth: '800px' }}>
                {/* Month labels */}
                <div style={{ display: 'flex', marginBottom: '8px', paddingLeft: '60px' }}>
                  {months.map(m => (
                    <div key={m} style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: '#64748b', fontWeight: '500' }}>{m}</div>
                  ))}
                </div>
                
                {/* Heatmap grid */}
                {Array.from({ length: 24 }, (_, h) => (
                  <div key={h} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                    <div style={{ width: '60px', fontSize: '11px', color: '#64748b', textAlign: 'right', paddingRight: '12px', fontFamily: "'JetBrains Mono', monospace" }}>
                      {h.toString().padStart(2, '0')}:00
                    </div>
                    {Array.from({ length: 12 }, (_, m) => {
                      const price = heatmapData2025[m][h];
                      return (
                        <div
                          key={m}
                          style={{
                            flex: 1,
                            height: '22px',
                            margin: '0 1px',
                            borderRadius: '4px',
                            background: getColorForPrice(price),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'default',
                            transition: 'transform 0.15s ease'
                          }}
                          title={`${months[m]} ${h}:00 — €${price.toFixed(3)}/kWh`}
                        >
                          <span style={{ fontSize: '9px', color: 'rgba(0,0,0,0.6)', fontWeight: '600' }}>
                            {price < 0.18 ? '€' + price.toFixed(2) : ''}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
                
                {/* Legend */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '28px', flexWrap: 'wrap' }}>
                  {[
                    { label: '<€0.15', color: '#10b981' },
                    { label: '€0.15-0.20', color: '#22c55e' },
                    { label: '€0.20-0.24', color: '#84cc16' },
                    { label: '€0.24-0.28', color: '#facc15' },
                    { label: '€0.28-0.32', color: '#f97316' },
                    { label: '>€0.32', color: '#ef4444' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '18px', height: '18px', background: item.color, borderRadius: '4px' }} />
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Key insights */}
                <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px', color: '#10b981' }}>🎯 Cheapest Zones</div>
                  <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
                    <strong>May-June, 12-2 PM</strong> — Solar peak drives prices to €0.12-0.14/kWh<br/>
                    <strong>April-August, 11 AM-3 PM</strong> — Consistent sub-€0.20 window
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '48px', textAlign: 'center', padding: '24px', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
          <p style={{ color: '#475569', fontSize: '13px', margin: 0 }}>
            Data source: Zonneplan dynamic tariffs • 17,503 hourly readings from 2024-2025
          </p>
        </div>
      </div>
    </div>
  );
}
