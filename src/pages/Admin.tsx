import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, ShoppingBag, Calendar, Users, Settings } from 'lucide-react';

const Admin = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Admin Dashboard</h1>
        <div className="text-sm text-stone-500">Welcome back, Admin</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { title: 'Total Orders', value: '156', icon: ShoppingBag, change: '+12%' },
          { title: 'Reservations', value: '24', icon: Calendar, change: '+5%' },
          { title: 'New Customers', value: '45', icon: Users, change: '+18%' },
          { title: 'Revenue', value: '$3,240', icon: LayoutDashboard, change: '+8%' },
        ].map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-stone-50 rounded-xl text-stone-900">
                <stat.icon size={20} />
              </div>
              <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <h3 className="text-stone-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h2 className="font-bold text-stone-900">Recent Orders</h2>
            <button className="text-sm text-orange-600 font-medium hover:text-orange-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 text-stone-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  { id: '#2345', name: 'Alice Johnson', status: 'Pending', amount: '$45.00' },
                  { id: '#2344', name: 'Bob Smith', status: 'Completed', amount: '$120.50' },
                  { id: '#2343', name: 'Charlie Brown', status: 'Processing', amount: '$32.00' },
                  { id: '#2342', name: 'Diana Prince', status: 'Completed', amount: '$85.00' },
                ].map((order, i) => (
                  <tr key={i} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-stone-600">{order.id}</td>
                    <td className="px-6 py-4 font-medium text-stone-900">{order.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-stone-600">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <h2 className="font-bold text-stone-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-stone-50 hover:bg-stone-100 rounded-xl text-left text-sm font-medium text-stone-700 transition-colors flex items-center gap-3">
              <Settings size={18} /> Update Menu Items
            </button>
            <button className="w-full py-3 px-4 bg-stone-50 hover:bg-stone-100 rounded-xl text-left text-sm font-medium text-stone-700 transition-colors flex items-center gap-3">
              <Calendar size={18} /> Manage Reservations
            </button>
            <button className="w-full py-3 px-4 bg-stone-50 hover:bg-stone-100 rounded-xl text-left text-sm font-medium text-stone-700 transition-colors flex items-center gap-3">
              <Users size={18} /> Staff Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
