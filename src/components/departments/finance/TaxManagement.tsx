import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const TaxManagement: React.FC = () => {
  const colorScheme = getColorScheme('finance');

  const taxStats = [
    { title: 'Total Tax Liability', value: '28.5M RWF', subtitle: 'This Year', color: 'red', icon: '🧾', trend: { value: '+12%', isPositive: false }, delay: 0 },
    { title: 'Tax Paid', value: '22.8M RWF', subtitle: 'This Year', color: 'green', icon: '✅', trend: { value: '+8%', isPositive: true }, delay: 100 },
    { title: 'Tax Due', value: '5.7M RWF', subtitle: 'Outstanding', color: 'orange', icon: '⚠️', trend: { value: '+15%', isPositive: false }, delay: 200 },
    { title: 'Tax Rate', value: '18%', subtitle: 'Corporate', color: 'blue', icon: '📊', trend: { value: '0%', isPositive: true }, delay: 300 }
  ];

  const taxObligations = [
    {
      id: 1,
      type: 'Corporate Income Tax',
      period: 'Q4 2024',
      amount: 8500000,
      dueDate: '2024-03-31',
      status: 'Pending',
      rate: '18%',
      taxableIncome: 47222222
    },
    {
      id: 2,
      type: 'VAT',
      period: 'February 2024',
      amount: 3200000,
      dueDate: '2024-03-15',
      status: 'Paid',
      rate: '18%',
      taxableIncome: 17777778
    },
    {
      id: 3,
      type: 'Withholding Tax',
      period: 'February 2024',
      amount: 1800000,
      dueDate: '2024-03-15',
      status: 'Paid',
      rate: '15%',
      taxableIncome: 12000000
    },
    {
      id: 4,
      type: 'Social Security',
      period: 'February 2024',
      amount: 2500000,
      dueDate: '2024-03-15',
      status: 'Paid',
      rate: '10%',
      taxableIncome: 25000000
    },
    {
      id: 5,
      type: 'Local Business Tax',
      period: 'Q1 2024',
      amount: 1200000,
      dueDate: '2024-04-30',
      status: 'Pending',
      rate: '2%',
      taxableIncome: 60000000
    }
  ];

  const taxCategories = [
    { name: 'Corporate Income Tax', amount: 8500000, percentage: 45, color: 'red' },
    { name: 'VAT', amount: 3200000, percentage: 17, color: 'blue' },
    { name: 'Withholding Tax', amount: 1800000, percentage: 10, color: 'green' },
    { name: 'Social Security', amount: 2500000, percentage: 13, color: 'purple' },
    { name: 'Local Business Tax', amount: 1200000, percentage: 6, color: 'orange' },
    { name: 'Other Taxes', amount: 1800000, percentage: 9, color: 'gray' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Tax Management Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {taxStats.map((stat, index) => (
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

      {/* Tax Obligations Table */}
      <AnimatedCard
        title="Tax Obligations"
        subtitle="Current and upcoming tax liabilities"
        color="red"
        icon="📋"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {taxObligations.map((tax, index) => (
                <tr key={tax.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{tax.type}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{tax.period}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{formatCurrency(tax.amount)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{tax.rate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{tax.dueDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(tax.status)}`}>
                      {tax.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">View</button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">Pay</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Tax Categories and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Tax Categories"
          subtitle="Breakdown by tax type"
          color="blue"
          icon="📊"
          delay={600}
        >
          <div className="space-y-3">
            {taxCategories.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{formatCurrency(category.amount)}</div>
                  <div className="text-xs text-gray-500">{category.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Quick Actions"
          subtitle="Common tax management tasks"
          color="green"
          icon="⚡"
          delay={800}
        >
          <div className="grid grid-cols-1 gap-3">
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log('Calculate tax')}
            >
              🧮 Calculate Tax
            </AnimatedButton>
            <AnimatedButton
              color="green"
              size="md"
              onClick={() => console.log('File return')}
            >
              📄 File Return
            </AnimatedButton>
            <AnimatedButton
              color="purple"
              size="md"
              onClick={() => console.log('Generate report')}
            >
              📊 Generate Report
            </AnimatedButton>
            <AnimatedButton
              color="orange"
              size="md"
              onClick={() => console.log('Pay tax')}
            >
              💰 Pay Tax
            </AnimatedButton>
          </div>
        </AnimatedCard>
      </div>

      {/* Tax Compliance */}
      <AnimatedCard
        title="Tax Compliance"
        subtitle="Compliance status and deadlines"
        color="purple"
        icon="📈"
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-sm text-green-600">Compliance Rate</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-blue-600">Pending Returns</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-purple-600">Overdue Returns</div>
          </div>
        </div>
      </AnimatedCard>

      {/* Tax Calendar */}
      <AnimatedCard
        title="Tax Calendar"
        subtitle="Important tax deadlines"
        color="orange"
        icon="📅"
        delay={1200}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-red-900">Corporate Income Tax - Q4 2024</p>
                <p className="text-xs text-red-600">Due: March 31, 2024</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-red-900">8.5M RWF</p>
              <p className="text-xs text-red-600">15 days left</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-yellow-900">Local Business Tax - Q1 2024</p>
                <p className="text-xs text-yellow-600">Due: April 30, 2024</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-yellow-900">1.2M RWF</p>
              <p className="text-xs text-yellow-600">45 days left</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-green-900">VAT - March 2024</p>
                <p className="text-xs text-green-600">Due: April 15, 2024</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-green-900">3.2M RWF</p>
              <p className="text-xs text-green-600">30 days left</p>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default TaxManagement; 