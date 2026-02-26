import React from 'react';
import Menu from './Menu';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Order = () => {
  const { items, removeItem, addItem, totalPrice, clearCart } = useCart();

  return (
    <div className="pt-4 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-orange-900">Order Online for Delivery or Pickup</h2>
            <p className="text-orange-700 text-sm">Select items from our menu below to add to your cart.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-white text-orange-600 font-medium rounded-full shadow-sm hover:bg-orange-50 transition-colors">
              Pickup
            </button>
            <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-full shadow-sm hover:bg-orange-700 transition-colors">
              Delivery
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <Menu />
          </div>

          {/* Cart Section - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif font-bold text-stone-900">Your Order</h2>
                  {items.length > 0 && (
                    <button 
                      onClick={clearCart}
                      className="text-xs text-red-500 hover:text-red-600 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-12 text-stone-400">
                    <p>Your cart is empty.</p>
                    <p className="text-sm mt-2">Add items from the menu to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      <AnimatePresence>
                        {items.map((item) => (
                          <motion.div 
                            key={item.id}
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex justify-between items-start pb-4 border-b border-stone-100 last:border-0 last:pb-0"
                          >
                            <div className="flex-1">
                              <h4 className="font-medium text-stone-900">{item.name}</h4>
                              <p className="text-sm text-stone-500">${item.price}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2 bg-stone-50 rounded-lg p-1">
                                <button 
                                  onClick={() => removeItem(item.id)} // This removes all, maybe we want decrease? For now simple remove is fine or we implement decrease in context
                                  className="p-1 hover:bg-white rounded-md text-stone-500 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => addItem(item)}
                                  className="p-1 hover:bg-white rounded-md text-stone-500 transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <div className="font-medium text-stone-900 w-12 text-right">
                                ${item.price * item.quantity}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="pt-4 border-t border-stone-100 space-y-2">
                      <div className="flex justify-between text-stone-600">
                        <span>Subtotal</span>
                        <span>${totalPrice}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>Tax (8%)</span>
                        <span>${(totalPrice * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold text-stone-900 pt-2">
                        <span>Total</span>
                        <span>${(totalPrice * 1.08).toFixed(2)}</span>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors shadow-lg shadow-stone-900/10">
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
