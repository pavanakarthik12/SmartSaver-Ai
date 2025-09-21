import React from 'react';
import { ArrowRight, Shield, TrendingUp, Calculator, BarChart3, CreditCard, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const features = [
    {
      icon: CreditCard,
      title: 'Expense Tracking',
      description: 'Track your spending with intelligent categorization and real-time insights.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Budget Management',
      description: 'Set and monitor budgets with visual progress tracking and smart alerts.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: TrendingUp,
      title: 'AI Predictions',
      description: 'Get ML-powered savings forecasts and personalized financial recommendations.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Calculator,
      title: 'What-If Analysis',
      description: 'Test different budget scenarios and see their impact on your finances.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-primary text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255, 76, 76, 0.08) 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.06) 0%, transparent 50%),
                         radial-gradient(circle at 40% 60%, rgba(255, 76, 76, 0.04) 0%, transparent 50%)`
      }}></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent-red/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent-gold/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-accent-red/5 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-8 py-20">
        {/* Hero Content */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-secondary/50 border border-accent-red/30 rounded-full text-accent-red text-sm font-medium mb-8 backdrop-blur-sm glow-red">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Financial Management
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight font-heading">
            <span className="text-gradient">
              SMART
            </span>
            <span className="text-accent-red">-SAVER</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary mb-12 max-w-3xl mx-auto leading-relaxed font-body">
            Transform your financial future with intelligent expense tracking, 
            AI-powered predictions, and smart budget management that adapts to your lifestyle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-primary px-8 py-4 text-lg font-bold rounded-xl glow-red hover:glow-red">
              <span className="flex items-center">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            
            <button className="btn-secondary px-8 py-4 text-lg font-semibold rounded-xl">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group relative">
                <div className="card-elevated p-8 hover:scale-105 transition-all duration-300">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-accent mb-6 glow-red`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4 font-heading">{feature.title}</h3>
                  <p className="text-secondary leading-relaxed font-body">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="relative">
          <div className="card-elevated p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-primary mb-4 font-heading">Trusted by Thousands</h2>
              <p className="text-secondary text-lg font-body">Join the community of smart savers</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black text-accent-red mb-2 font-heading">10K+</div>
                <div className="text-secondary font-semibold font-body">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-accent-gold mb-2 font-heading">$2M+</div>
                <div className="text-secondary font-semibold font-body">Money Saved</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-green-500 mb-2 font-heading">95%</div>
                <div className="text-secondary font-semibold font-body">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center px-6 py-3 bg-secondary/50 border border-accent-red/30 rounded-full text-accent-red font-medium mb-8 backdrop-blur-sm glow-red">
            <Shield className="w-5 h-5 mr-2" />
            Secure • Private • Reliable
          </div>
          <h3 className="text-3xl font-bold text-primary mb-4 font-heading">Ready to Transform Your Finances?</h3>
          <p className="text-secondary text-lg mb-8 max-w-2xl mx-auto font-body">
            Start your journey to financial freedom with SmartSaver AI. 
            Get personalized insights, track your progress, and achieve your savings goals.
          </p>
          <button className="btn-primary px-10 py-5 text-xl font-bold rounded-3xl glow-red hover:glow-red">
            <span className="flex items-center">
              Start Your Journey
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
