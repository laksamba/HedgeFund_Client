import React from 'react';

interface FundState {
  nav: number;
  ytdReturn: number;
  sharpeRatio: number;
  topStrategy: string;
  totalInvestors: number;
  loading: boolean;
  currentInvestments: { type: string; name: string; amount: number; percentage: number }[];
  navHistory: { date: string; value: number }[];
}

const Home: React.FC = () => {
  const recentactivities = {
    recentHistory: [
      {
        id: 1,
        type: "deposit",
        amount: 5000,
        currency: "NPR",
        status: "completed",
        date: "2025-10-30T09:15:00Z",
        description: "Deposit from bank account"
      },
      {
        id: 2,
        type: "withdrawal",
        amount: 2000,
        currency: "NPR",
        status: "pending",
        date: "2025-10-29T14:40:00Z",
        description: "Withdrawal to bank account"
      },
      {
        id: 3,
        type: "investment",
        amount: 15000,
        currency: "NPR",
        status: "completed",
        date: "2025-10-28T18:25:00Z",
        description: "Invested in ABC project"
      },
      {
        id: 4,
        type: "profit",
        amount: 1200,
        currency: "NPR",
        status: "completed",
        date: "2025-10-28T20:00:00Z",
        description: "Profit from XYZ investment"
      },
      {
        id: 5,
        type: "deposit",
        amount: 10000,
        currency: "NPR",
        status: "completed",
        date: "2025-10-27T11:30:00Z",
        description: "Deposit from wallet"
      }
    ]
  };

  const initialState: FundState = {
    nav: 25000000,
    ytdReturn: 9.2,
    sharpeRatio: 1.4,
    totalInvestors: 1500,
    topStrategy: "Long/Short Equity",
    loading: false,
    currentInvestments: [
      { type: "Crypto", name: "Bitcoin", amount: 5000000, percentage: 20 },
      { type: "Stock", name: "Tesla", amount: 3000000, percentage: 12 },
      { type: "Forex", name: "EUR/USD", amount: 2000000, percentage: 8 },
      { type: "Real Assets", name: "Gold", amount: 4000000, percentage: 16 },
      { type: "Cash", name: "USD", amount: 5000000, percentage: 20 },
    ],
    navHistory: [
      { date: "Jan", value: 20000000 },
      { date: "Feb", value: 21000000 },
      { date: "Mar", value: 22000000 },
      { date: "Apr", value: 23000000 },
      { date: "May", value: 24000000 },
      { date: "Jun", value: 24500000 },
      { date: "Jul", value: 25000000 },
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600';
      case 'withdrawal':
        return 'text-red-600';
      case 'investment':
        return 'text-blue-600';
      case 'profit':
        return 'text-emerald-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg- p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Total AUM Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Total AUM</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {formatCurrency(initialState.nav)}
          </p>
          <div className="flex gap-4 mt-4 text-sm">
            <div>
              <span className="text-gray-500">YTD Return:</span>{' '}
              <span className="font-semibold text-green-600">+{initialState.ytdReturn}%</span>
            </div>
            <div>
              <span className="text-gray-500">Sharpe Ratio:</span>{' '}
              <span className="font-semibold">{initialState.sharpeRatio}</span>
            </div>
          </div>
        </div>

        {/* Fund Allocation Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Current Investments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {initialState.currentInvestments.map((investment, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {investment.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{investment.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(investment.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">{investment.percentage}%</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${investment.percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investors & Funds Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Investors</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{initialState.totalInvestors.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H9v-1c0-1.657-1.343-3-3-3H5c-1.657 0-3 1.343-3 3v1m15-3h1c1.657 0 3 1.343 3 3v1m-3-9h.01M9 9h.01" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Funds</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentactivities.recentHistory.map((activity) => (
              <div
                key={activity.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className={`text-sm font-semibold capitalize ${getTypeColor(activity.type)}`}>
                        {activity.type}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {formatCurrency(activity.amount)}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString('en-NP', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;