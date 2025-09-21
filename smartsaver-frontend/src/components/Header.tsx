import React from 'react';
import { DollarSign, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button
            onClick={onMenuClick}
            className="menu-button"
          >
            <Menu size={24} />
          </button>
          <div className="logo-section">
            <DollarSign size={32} color="var(--accent-red)" />
            <h1 className="logo-title">SmartSaver AI</h1>
          </div>
        </div>
        <div className="header-right">
          <div className="user-avatar">
            <span className="user-initial">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;