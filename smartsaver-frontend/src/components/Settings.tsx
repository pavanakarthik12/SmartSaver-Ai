import React from 'react';
import { User, Bell, Shield, HelpCircle } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="p-6 bg-primary min-h-screen">
      <h1 className="text-4xl font-bold text-primary mb-8 font-heading">Settings</h1>
      
      <div className="space-y-8">
        {/* Profile Settings */}
        <div className="card-elevated p-8">
          <div className="flex items-center space-x-4 mb-6">
            <User className="h-8 w-8 text-accent-red" />
            <h2 className="text-2xl font-bold text-primary font-heading">Profile Settings</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2 font-body">Name</label>
              <input
                type="text"
                defaultValue="User"
                className="w-full p-3 border border-border-color bg-secondary text-primary rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-2 font-body">Email</label>
              <input
                type="email"
                defaultValue="user@example.com"
                className="w-full p-3 border border-border-color bg-secondary text-primary rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
              />
            </div>
            <button className="btn-primary">
              Save Changes
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card-elevated p-8">
          <div className="flex items-center space-x-4 mb-6">
            <Bell className="h-8 w-8 text-accent-red" />
            <h2 className="text-2xl font-bold text-primary font-heading">Notifications</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-tertiary/30 rounded-lg">
              <div>
                <p className="font-semibold text-primary font-body">Budget Alerts</p>
                <p className="text-sm text-secondary font-body">Get notified when approaching budget limits</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-tertiary/30 rounded-lg">
              <div>
                <p className="font-semibold text-primary font-body">Spending Reports</p>
                <p className="text-sm text-secondary font-body">Weekly spending summary emails</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-tertiary/30 rounded-lg">
              <div>
                <p className="font-semibold text-primary font-body">AI Insights</p>
                <p className="text-sm text-secondary font-body">Smart recommendations and tips</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="card-elevated p-8">
          <div className="flex items-center space-x-4 mb-6">
            <Shield className="h-8 w-8 text-accent-red" />
            <h2 className="text-2xl font-bold text-primary font-heading">Privacy & Security</h2>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-tertiary/30 rounded-lg">
              <p className="font-semibold text-primary mb-3 font-body">Data Usage</p>
              <p className="text-sm text-secondary mb-4 font-body">
                Your financial data is encrypted and stored securely. We use it only to provide personalized insights and predictions.
              </p>
              <button className="text-accent-red hover:text-red-300 text-sm font-medium font-body">
                Learn more about data privacy
              </button>
            </div>
            
            <div className="pt-6 border-t border-border-color">
              <button className="btn-secondary bg-red-600 hover:bg-red-700 text-white">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="card-elevated p-8">
          <div className="flex items-center space-x-4 mb-6">
            <HelpCircle className="h-8 w-8 text-accent-red" />
            <h2 className="text-2xl font-bold text-primary font-heading">Help & Support</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full text-left p-4 hover:bg-tertiary/30 rounded-lg transition-colors">
              <p className="font-semibold text-primary font-body">How to use SmartSaver AI</p>
              <p className="text-sm text-secondary font-body">Learn the basics of managing your finances</p>
            </button>
            
            <button className="w-full text-left p-4 hover:bg-tertiary/30 rounded-lg transition-colors">
              <p className="font-semibold text-primary font-body">Understanding AI predictions</p>
              <p className="text-sm text-secondary font-body">How our AI analyzes your spending patterns</p>
            </button>
            
            <button className="w-full text-left p-4 hover:bg-tertiary/30 rounded-lg transition-colors">
              <p className="font-semibold text-primary font-body">Contact Support</p>
              <p className="text-sm text-secondary font-body">Get help from our support team</p>
            </button>
            
            <button className="w-full text-left p-4 hover:bg-tertiary/30 rounded-lg transition-colors">
              <p className="font-semibold text-primary font-body">Feature Requests</p>
              <p className="text-sm text-secondary font-body">Suggest new features or improvements</p>
            </button>
          </div>
        </div>

        {/* App Information */}
        <div className="card p-6">
          <h3 className="font-bold text-primary mb-3 font-heading">SmartSaver AI</h3>
          <p className="text-sm text-secondary mb-2 font-body">Version 1.0.0</p>
          <p className="text-sm text-secondary font-body">
            Built with React, TypeScript, and powered by AI for intelligent financial management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;