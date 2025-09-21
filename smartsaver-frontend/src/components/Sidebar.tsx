import React from 'react';
import { 
  Home,
  CreditCard,
  TrendingUp,
  Calculator,
  BarChart3,
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'expenses', label: 'Expenses', icon: CreditCard },
    { id: 'budget', label: 'Budget', icon: BarChart3 },
    { id: 'forecast', label: 'Predictions', icon: TrendingUp },
    { id: 'whatif', label: 'What-If Analysis', icon: Calculator },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)'
        }}
      >
        <div className="sidebar-header">
          <h2 className="sidebar-title">Menu</h2>
          <button
            onClick={onClose}
            className="sidebar-close lg:hidden"
          >
            <X className="h-5 w-5 text-secondary" />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`
                  nav-item
                  ${activeTab === item.id ? 'active' : ''}
                `}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;