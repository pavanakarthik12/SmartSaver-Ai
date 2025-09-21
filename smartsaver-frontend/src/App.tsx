import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatSidebar from './components/ChatSidebar';
import HeroSection from './components/HeroSection';
import Expenses from './components/Expenses';
import Budget from './components/Budget';
import Forecast from './components/Forecast';
import WhatIfAnalysis from './components/WhatIfAnalysis';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HeroSection />;
      case 'expenses':
        return <Expenses />;
      case 'budget':
        return <Budget />;
      case 'forecast':
        return <Forecast />;
      case 'whatif':
        return <WhatIfAnalysis />;
      case 'settings':
        return <Settings />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="app">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="main-layout">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          {renderContent()}
        </main>
        
        <ChatSidebar
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
        />
      </div>
      
      {/* Chat Toggle Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="chat-button"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          background: 'linear-gradient(to bottom right, #b91c1c, #7f1d1d)',
          color: 'white',
          padding: '0.75rem',
          borderRadius: '50%',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 150ms',
          zIndex: 30
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom right, #dc2626, #991b1b)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom right, #b91c1c, #7f1d1d)'}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
}

export default App;