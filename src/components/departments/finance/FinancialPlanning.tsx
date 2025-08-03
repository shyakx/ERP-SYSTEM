import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const FinancialPlanning: React.FC = () => {
  const colorScheme = getColorScheme('finance');

  const planningStats = [
    { title: 'Annual Budget', value: '280.0M RWF', subtitle: '2024', color: 'blue', icon: '📊', trend: { value: '+15%', isPositive: true }, delay: 0 },
    { title: 'Budget Used', value: '85%', subtitle: 'Of Annual', color: 'orange', icon: '📈', trend: { value: '+5%', isPositive: false }, delay: 100 },
    { title: 'Forecast Revenue', value: '320.0M RWF', subtitle: '2024', color: 'green', icon: '💰', trend: { value: '+12%', isPositive: true }, delay: 200 },
    { title: 'Growth Rate', value: '18%', subtitle: 'YoY', color: 'purple', icon: '📈', trend: { value: '+3%', isPositive: true }, delay: 300 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Financial Planning Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {planningStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            {stat.trend && (
              <div className={`flex items-center mt-2 text-xs ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.trend.isPositive ? '↗' : '↘'}</span>
                <span className="ml-1">{stat.trend.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Budget Planning */}
      <AnimatedCard
        title="Budget Planning"
        subtitle="Annual budget breakdown and tracking"
        color="blue"
        icon="📊"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Revenue Forecast</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Security Services</span>
                <span className="text-sm font-semibold">{formatCurrency(180000000)}</span>
              </div>
              <AnimatedProgressBar progress={75} color="green" height={6} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Equipment Sales</span>
                <span className="text-sm font-semibold">{formatCurrency(80000000)}</span>
              </div>
              <AnimatedProgressBar progress={60} color="blue" height={6} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Consultation</span>
                <span className="text-sm font-semibold">{formatCurrency(40000000)}</span>
              </div>
              <AnimatedProgressBar progress={85} color="purple" height={6} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Other Income</span>
                <span className="text-sm font-semibold">{formatCurrency(20000000)}</span>
              </div>
              <AnimatedProgressBar progress={45} color="orange" height={6} />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Expense Planning</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Personnel Costs</span>
                <span className="text-sm font-semibold">{formatCurrency(120000000)}</span>
              </div>
              <AnimatedProgressBar progress={80} color="red" height={6} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Equipment & Supplies</span>
                <span className="text-sm font-semibold">{formatCurrency(60000000)}</span>
              </div>
              <AnimatedProgressBar progress={75} color="blue" height={6} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Operations</span>
                <span className="text-sm font-semibold">{formatCurrency(40000000)}</span>
              </div>
              <AnimatedProgressBar progress={70} color="green" height={6} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Administrative</span>
                <span className="text-sm font-semibold">{formatCurrency(30000000)}</span>
              </div>
              <AnimatedProgressBar progress={65} color="purple" height={6} />
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Financial planning tasks"
        color="green"
        icon="⚡"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Create budget')}
          >
            📊 Create Budget
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Forecast revenue')}
          >
            📈 Forecast Revenue
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            📋 Generate Report
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Review plan')}
          >
            👁️ Review Plan
          </AnimatedButton>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default FinancialPlanning; 