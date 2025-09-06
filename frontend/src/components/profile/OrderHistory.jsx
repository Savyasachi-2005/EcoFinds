import React from 'react';

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={order.image}
            alt={order.productName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-gray-900 truncate">
            {order.productName}
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            Order #{order.orderId} • {order.date}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-emerald-600 font-medium">₹{order.amount}</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderHistory = () => {
  // Mock data - replace with API call
  const orders = [
    {
      id: 1,
      orderId: "ORD123456",
      productName: "Antique Brass Compass",
      amount: 4500,
      date: "2025-09-01",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8"
    },
    {
      id: 2,
      orderId: "ORD123457",
      productName: "Vintage Tea Set",
      amount: 2800,
      date: "2025-09-03",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1556910096-6f0e8f453c2d"
    },
    // Add more mock orders here
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
        <div className="flex space-x-2">
          <select className="form-select rounded-md border-gray-300 text-sm focus:border-emerald-500 focus:ring-emerald-500">
            <option>All Orders</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
