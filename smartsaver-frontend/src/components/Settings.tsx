import React from 'react';
import { User, Bell, Shield, HelpCircle } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-6 w-6 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                defaultValue="User"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue="user@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="h-6 w-6 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Budget Alerts</p>
                <p className="text-sm text-gray-600">Get notified when approaching budget limits</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Spending Reports</p>
                <p className="text-sm text-gray-600">Weekly spending summary emails</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">AI Insights</p>
                <p className="text-sm text-gray-600">Smart recommendations and tips</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Privacy & Security</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-900 mb-2">Data Usage</p>
              <p className="text-sm text-gray-600 mb-3">
                Your financial data is encrypted and stored securely. We use it only to provide personalized insights and predictions.
              </p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Learn more about data privacy
              </button>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <HelpCircle className="h-6 w-6 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Help & Support</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <p className="font-medium text-gray-900">How to use SmartSaver AI</p>
              <p className="text-sm text-gray-600">Learn the basics of managing your finances</p>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <p className="font-medium text-gray-900">Understanding AI predictions</p>
              <p className="text-sm text-gray-600">How our AI analyzes your spending patterns</p>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <p className="font-medium text-gray-900">Contact Support</p>
              <p className="text-sm text-gray-600">Get help from our support team</p>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <p className="font-medium text-gray-900">Feature Requests</p>
              <p className="text-sm text-gray-600">Suggest new features or improvements</p>
            </button>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-2">SmartSaver AI</h3>
          <p className="text-sm text-gray-600 mb-2">Version 1.0.0</p>
          <p className="text-sm text-gray-600">
            Built with React, TypeScript, and powered by AI for intelligent financial management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
