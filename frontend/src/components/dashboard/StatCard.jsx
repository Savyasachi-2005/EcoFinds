import React from 'react';

const StatCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-emerald-500 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        {icon && <span className="text-emerald-600">{icon}</span>}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
          {trend && (
            <p className="text-sm text-gray-600">
              {trend > 0 ? (
                <span className="text-emerald-600">↑ {trend}% from last month</span>
              ) : (
                <span className="text-red-600">↓ {Math.abs(trend)}% from last month</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
