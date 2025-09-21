# SmartSaver AI Frontend

A modern React frontend for the SmartSaver AI financial management system.

## Features

- **Dashboard**: Overview of budgets, expenses, and AI predictions
- **Expense Management**: Add, view, and categorize expenses with visual charts
- **Budget Management**: Edit budgets with real-time progress tracking
- **AI Predictions**: ML-powered savings forecasts and insights
- **What-If Analysis**: Interactive tool to test budget scenarios
- **Stock Market**: Real-time stock data and price charts
- **AI Chat**: Intelligent financial assistant for personalized advice
- **Settings**: User preferences and notification controls

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- Axios for API calls
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- SmartSaver AI Backend running on http://localhost:8000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend Integration

Make sure your SmartSaver AI backend is running on port 8000. The frontend will automatically connect to:
- `http://localhost:8000/expenses/` - Expense data
- `http://localhost:8000/budget/` - Budget data  
- `http://localhost:8000/forecast/` - AI predictions
- `http://localhost:8000/whatif/` - What-if analysis
- `http://localhost:8000/chat/` - AI chat
- `http://localhost:8000/stocks/` - Stock data

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with navigation
│   ├── Sidebar.tsx     # Main navigation sidebar
│   ├── Dashboard.tsx   # Dashboard overview
│   ├── Expenses.tsx    # Expense management
│   ├── Budget.tsx      # Budget management
│   ├── Forecast.tsx    # AI predictions
│   ├── WhatIfAnalysis.tsx # What-if scenarios
│   ├── Stocks.tsx      # Stock market data
│   ├── ChatSidebar.tsx # AI chat interface
│   └── Settings.tsx    # User settings
├── services/
│   └── api.ts          # API service layer
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── index.css           # Global styles with Tailwind
```

## Features Overview

### Dashboard
- Key metrics cards (total budget, spent, predicted savings)
- Budget progress bars with color-coded status
- Real-time data from backend APIs

### Expense Management
- Add new expenses with category selection
- Visual charts (pie chart, bar chart)
- Expense list with delete functionality
- Real-time updates

### Budget Management
- Edit budget amounts inline
- Progress tracking with visual indicators
- Over-budget warnings
- Real-time calculations

### AI Predictions
- ML-powered savings forecasts
- Category-wise predictions
- Visual charts and insights
- AI recommendations

### What-If Analysis
- Interactive budget adjustment tool
- Real-time scenario comparison
- Visual charts showing changes
- Impact analysis

### Stock Market
- Real-time stock prices
- Price trend charts
- Performance metrics
- Market summary

### AI Chat
- Intelligent financial assistant
- Suggested questions
- Real-time responses
- Chat history

## Responsive Design

The app is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)  
- Mobile (320px - 767px)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

The app uses:
- TypeScript for type safety
- Tailwind CSS for styling
- Functional components with hooks
- Axios for HTTP requests
- Recharts for data visualization

## Production Build

To create a production build:

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the SmartSaver AI system.