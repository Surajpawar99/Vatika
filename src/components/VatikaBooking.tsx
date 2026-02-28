import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Clock, Users, Phone, User, MessageSquare, 
  CheckCircle, AlertCircle, PhoneCall, Plus, Minus, 
  ChevronDown, X, Star, Gift, Cake, PartyPopper, UtensilsCrossed, 
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const VatikaBooking: React.FC = () => {
  const today = new Date();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: today.toISOString().split('T')[0],
    time: '',
    guests: '4',
    occasion: '',
    request: ''
  });

  const [selectedDate, setSelectedDate] = useState({
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Custom Time Picker State
  const [isCustomTimeOpen, setIsCustomTimeOpen] = useState(false);
  const [customTimeState, setCustomTimeState] = useState({
    hour: 7,
    minute: 30,
    period: 'PM'
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync internal date state with formData
  useEffect(() => {
    const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setFormData(prev => ({ ...prev, date: `${year}-${month}-${day}` }));
    
    if (errors.date) {
        setErrors(prev => { const n = {...prev}; delete n.date; return n; });
    }
  }, [selectedDate, errors.date]);

  // Date Helpers
  const currentYear = today.getFullYear();
  const years = [currentYear, currentYear + 1];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleDateChange = (field: 'day' | 'month' | 'year', value: number) => {
    setSelectedDate(prev => {
      const newDate = { ...prev, [field]: value };
      const maxDays = getDaysInMonth(newDate.month, newDate.year);
      if (newDate.day > maxDays) newDate.day = maxDays;

      const checkDate = new Date(newDate.year, newDate.month, newDate.day);
      const todayZero = new Date();
      todayZero.setHours(0,0,0,0);
      
      if (checkDate < todayZero) {
        return {
            day: today.getDate(),
            month: today.getMonth(),
            year: today.getFullYear()
        };
      }
      return newDate;
    });
  };

  // Time Slot Logic
  const timeSlots = [
    { label: '11:30 AM', value: '11:30 AM', hour: 11.5 },
    { label: '1:00 PM', value: '1:00 PM', hour: 13 },
    { label: '3:00 PM', value: '3:00 PM', hour: 15 },
    { label: '7:00 PM', value: '7:00 PM', hour: 19 },
    { label: '9:00 PM', value: '9:00 PM', hour: 21 }
  ];

  const isTimeSlotDisabled = (slotHour: number) => {
    const checkDate = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    const todayZero = new Date();
    todayZero.setHours(0,0,0,0);

    if (checkDate.getTime() === todayZero.getTime()) {
      const currentHour = new Date().getHours() + new Date().getMinutes() / 60;
      return slotHour < currentHour;
    }
    return false;
  };

  const handleTimeSelect = (time: string, disabled: boolean) => {
    if (disabled) return;
    setFormData(prev => ({ ...prev, time }));
    if (errors.time) {
        setErrors(prev => { const n = {...prev}; delete n.time; return n; });
    }
  };

  const handleCustomTimeConfirm = () => {
    const { hour, minute, period } = customTimeState;
    const minStr = minute.toString().padStart(2, '0');
    const timeStr = `${hour}:${minStr} ${period}`;
    
    setFormData(prev => ({ ...prev, time: timeStr }));
    if (errors.time) {
      setErrors(prev => { const n = {...prev}; delete n.time; return n; });
    }
    setIsCustomTimeOpen(false);
  };

  // Guest Logic
  const handleGuestChange = (increment: boolean) => {
    const current = parseInt(formData.guests) || 0;
    let newValue = increment ? current + 1 : current - 1;
    if (newValue < 1) newValue = 1;
    if (newValue > 50) newValue = 50;
    setFormData(prev => ({ ...prev, guests: newValue.toString() }));
    if (errors.guests) {
        setErrors(prev => { const n = {...prev}; delete n.guests; return n; });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter valid 10-digit number';
    }
    if (!formData.time) newErrors.time = 'Please select a time slot';
    if (!formData.guests || parseInt(formData.guests) < 1) {
      newErrors.guests = 'At least 1 guest required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setShowConfirmation(true);

    const message = `Hello Vatika Pure Veg,

New Table Booking Request:

Name: ${formData.name}
Phone: ${formData.phone}
Date: ${formData.date}
Time: ${formData.time}
Guests: ${formData.guests}
Occasion: ${formData.occasion || 'Not specified'}
Special Request: ${formData.request || 'None'}

Please confirm the booking.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919022960646?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
      setShowConfirmation(false);
      setFormData({
        name: '',
        phone: '',
        date: today.toISOString().split('T')[0],
        time: '',
        guests: '4',
        occasion: '',
        request: ''
      });
      setSelectedDate({
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear()
      });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const occasions = [
    { id: 'birthday', label: 'Birthday', icon: Cake },
    { id: 'anniversary', label: 'Anniversary', icon: Gift },
    { id: 'celebration', label: 'Celebration', icon: PartyPopper },
    { id: 'dinner', label: 'Family Dinner', icon: UtensilsCrossed },
  ];

  // Scroll Wheel Component
  const ScrollWheel = ({ items, value, onChange, label }: { items: (number|string)[], value: number|string, onChange: (val: any) => void, label?: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (containerRef.current) {
        const selectedIndex = items.indexOf(value);
        if (selectedIndex !== -1) {
          containerRef.current.scrollTop = selectedIndex * 40;
        }
      }
    }, [isCustomTimeOpen]);

    return (
      <div className="flex flex-col items-center">
        {label && <span className="text-xs font-bold text-stone-400 mb-2 uppercase tracking-wider">{label}</span>}
        <div className="relative h-32 w-20 overflow-hidden bg-stone-50 rounded-xl border border-stone-200">
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-stone-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-stone-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 border-y border-amber-200 bg-amber-50/50 z-0 pointer-events-none"></div>
          
          <div 
            ref={containerRef}
            className="h-full overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden py-[calc(50%-20px)]"
            onScroll={(e) => {
              // Optional: Add snap logic or sound effect here
            }}
          >
            {items.map((item) => (
              <div
                key={item}
                onClick={() => {
                  onChange(item);
                  if (containerRef.current) {
                    const idx = items.indexOf(item);
                    containerRef.current.scrollTo({ top: idx * 40, behavior: 'smooth' });
                  }
                }}
                className={`h-10 flex items-center justify-center snap-center cursor-pointer transition-colors ${
                  value === item ? 'text-amber-600 font-bold text-xl' : 'text-stone-400 text-lg'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Step Progress Logic
  const steps = [
    { id: 1, label: 'Select Date', active: true, completed: !!formData.date },
    { id: 2, label: 'Choose Time', active: !!formData.date, completed: !!formData.time },
    { id: 3, label: 'Confirm Booking', active: !!formData.time, completed: false }
  ];

  return (
    <div className="min-h-screen bg-stone-900 font-sans selection:bg-amber-500 selection:text-white pb-24 lg:pb-0">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Vatika Luxury Interior" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-stone-900"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 drop-shadow-2xl">
              Reserve Your <span className="text-amber-400">Perfect</span> Dining Experience
            </h1>
            <p className="text-lg md:text-xl text-stone-300 font-light tracking-wide mb-8 max-w-2xl mx-auto">
              Experience Authentic Veg Luxury in Parbhani
            </p>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
          </motion.div>
        </div>
      </div>

      {/* 3. PREMIUM BOOKING FORM CARD */}
      <div className="relative z-10 -mt-24 max-w-5xl mx-auto px-4 sm:px-6 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden ring-1 ring-black/5"
        >
          
          {/* 2. STEP INDICATOR */}
          <div className="bg-stone-50 border-b border-stone-200 px-6 py-4">
            <div className="flex justify-between items-center max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                    step.completed ? 'bg-green-500 text-white' : 
                    step.active ? 'bg-amber-500 text-white shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 
                    'bg-stone-200 text-stone-400'
                  }`}>
                    {step.completed ? <CheckCircle size={14} /> : step.id}
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider mt-2 font-bold ${step.active ? 'text-stone-800' : 'text-stone-400'}`}>
                    {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="absolute top-4 left-1/2 w-[calc(100vw/3-40px)] md:w-32 h-[2px] -z-10 bg-stone-200">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: step.completed ? '100%' : '0%' }}
                        className="h-full bg-green-500 transition-all duration-500"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section 1: Date & Time */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                    <Calendar size={16} className="text-amber-500" /> Select Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['day', 'month', 'year'].map((field) => (
                      <div key={field} className="relative group">
                        <select
                          value={selectedDate[field as keyof typeof selectedDate]}
                          onChange={(e) => handleDateChange(field as any, parseInt(e.target.value))}
                          className="w-full px-3 py-4 rounded-xl border border-stone-200 bg-stone-50 appearance-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none font-medium text-stone-700 transition-all cursor-pointer hover:bg-white hover:shadow-md"
                        >
                          {field === 'day' && Array.from({ length: getDaysInMonth(selectedDate.month, selectedDate.year) }, (_, i) => i + 1).map(d => (
                            <option key={d} value={d} disabled={selectedDate.year === currentYear && selectedDate.month === today.getMonth() && d < today.getDate()}>{d}</option>
                          ))}
                          {field === 'month' && months.map((m, i) => (
                            <option key={m} value={i} disabled={selectedDate.year === currentYear && i < today.getMonth()}>{m.slice(0, 3)}</option>
                          ))}
                          {field === 'year' && years.map(y => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none group-hover:text-amber-500 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                    <Clock size={16} className="text-amber-500" /> Select Time
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {timeSlots.map((slot) => {
                      const disabled = isTimeSlotDisabled(slot.hour);
                      const isSelected = formData.time === slot.value;
                      return (
                        <motion.button
                          key={slot.value}
                          type="button"
                          disabled={disabled}
                          whileHover={{ scale: disabled ? 1 : 1.05 }}
                          whileTap={{ scale: disabled ? 1 : 0.95 }}
                          onClick={() => handleTimeSelect(slot.value, disabled)}
                          className={`
                            px-5 py-3 rounded-xl text-sm font-bold transition-all border shadow-sm
                            ${isSelected 
                              ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-200' 
                              : disabled 
                                ? 'bg-stone-100 text-stone-300 border-stone-100 cursor-not-allowed'
                                : 'bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-600'
                            }
                          `}
                        >
                          {slot.label}
                        </motion.button>
                      );
                    })}
                    
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCustomTimeOpen(true)}
                      className={`
                        px-5 py-3 rounded-xl text-sm font-bold transition-all border shadow-sm flex items-center gap-2
                        ${!timeSlots.some(s => s.value === formData.time) && formData.time
                          ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-200'
                          : 'bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-600'
                        }
                      `}
                    >
                      <Clock size={14} />
                      {!timeSlots.some(s => s.value === formData.time) && formData.time ? formData.time : 'Custom'}
                    </motion.button>
                  </div>
                  {errors.time && <p className="text-xs text-red-500 flex items-center gap-1 animate-pulse"><AlertCircle size={12} /> {errors.time}</p>}
                </div>
              </div>

              <div className="h-px bg-stone-100 w-full"></div>

              {/* 5. OCCASION ICON STRIP */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                  <PartyPopper size={16} className="text-amber-500" /> Special Occasion
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {occasions.map((occ) => {
                    const Icon = occ.icon;
                    const isSelected = formData.occasion === occ.label;
                    return (
                      <motion.div
                        key={occ.id}
                        whileHover={{ y: -5 }}
                        onClick={() => setFormData(prev => ({ ...prev, occasion: occ.label }))}
                        className={`
                          cursor-pointer rounded-2xl p-4 border transition-all flex flex-col items-center gap-3 text-center
                          ${isSelected 
                            ? 'bg-amber-50 border-amber-500 shadow-md ring-1 ring-amber-500' 
                            : 'bg-white border-stone-200 hover:border-amber-300 hover:shadow-md'
                          }
                        `}
                      >
                        <div className={`p-3 rounded-full ${isSelected ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-500'}`}>
                          <Icon size={20} />
                        </div>
                        <span className={`text-sm font-bold ${isSelected ? 'text-stone-800' : 'text-stone-500'}`}>{occ.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-stone-100 w-full"></div>

              {/* Section 3: Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Guest Counter */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                    <Users size={16} className="text-amber-500" /> Number of Guests
                  </label>
                  <div className="flex items-center bg-stone-50 rounded-2xl border border-stone-200 p-2 shadow-inner">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleGuestChange(false)}
                      className="w-12 h-12 flex items-center justify-center bg-white rounded-xl text-stone-600 shadow-sm hover:text-amber-600 transition-colors"
                    >
                      <Minus size={20} />
                    </motion.button>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      min="1"
                      max="50"
                      className="flex-1 text-center bg-transparent border-none focus:ring-0 font-bold text-2xl text-stone-800"
                    />
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleGuestChange(true)}
                      className="w-12 h-12 flex items-center justify-center bg-white rounded-xl text-stone-600 shadow-sm hover:text-amber-600 transition-colors"
                    >
                      <Plus size={20} />
                    </motion.button>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                    <User size={16} className="text-amber-500" /> Contact Details
                  </label>
                  <div className="space-y-3">
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-4 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-stone-200 bg-stone-50'} focus:border-amber-500 focus:ring-4 focus:ring-amber-100 focus:outline-none transition-all font-medium`}
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={10}
                        className={`w-full pl-12 pr-4 py-4 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-stone-200 bg-stone-50'} focus:border-amber-500 focus:ring-4 focus:ring-amber-100 focus:outline-none transition-all font-medium`}
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Request */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare size={16} className="text-amber-500" /> Special Requests
                </label>
                <textarea
                  name="request"
                  value={formData.request}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 focus:outline-none transition-all bg-stone-50 resize-none font-medium"
                  placeholder="Any dietary restrictions or special arrangements?"
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xl py-5 rounded-2xl shadow-xl shadow-amber-200 hover:shadow-2xl hover:shadow-amber-300 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10">{isSubmitting ? 'Processing Request...' : 'Confirm Table Reservation'}</span>
                {!isSubmitting && <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </motion.button>
            </form>

            {/* 6. SOCIAL PROOF */}
            <div className="mt-10 pt-8 border-t border-stone-100">
              <p className="text-center text-stone-400 text-sm font-medium mb-6 uppercase tracking-widest">Trusted by Thousands of Happy Guests</p>
              <div className="grid grid-cols-3 gap-4 text-center divide-x divide-stone-100">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-lg">
                    3.9 <Star size={16} fill="currentColor" />
                  </div>
                  <p className="text-xs text-stone-500 font-medium">Google Reviews</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1 text-red-500 font-bold text-lg">
                    4.2 <Star size={16} fill="currentColor" />
                  </div>
                  <p className="text-xs text-stone-500 font-medium">Zomato Dining</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1 text-red-500 font-bold text-lg">
                    4.3 <Star size={16} fill="currentColor" />
                  </div>
                  <p className="text-xs text-stone-500 font-medium">Zomato Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 7. MOBILE OPTIMIZATION - Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-2 lg:hidden z-50 flex gap-3 h-[60px] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <a 
          href="tel:09022960646"
          className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-white font-bold text-sm rounded-lg shadow-sm hover:bg-amber-600 transition-colors"
        >
          <PhoneCall size={16} /> Call Now
        </a>
        <button 
          onClick={handleSubmit}
          className="flex-1 flex items-center justify-center gap-2 bg-stone-900 text-amber-400 font-bold text-sm rounded-lg shadow-sm hover:bg-stone-800 transition-colors"
        >
          <Calendar size={16} /> Book Table
        </button>
      </div>

      {/* Custom Time Modal */}
      <AnimatePresence>
        {isCustomTimeOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCustomTimeOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white z-50 rounded-3xl p-6 shadow-2xl border border-amber-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif font-bold text-stone-800">Select Custom Time</h3>
                <button onClick={() => setIsCustomTimeOpen(false)} className="p-2 hover:bg-stone-100 rounded-full text-stone-500 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex justify-center gap-4 mb-8">
                <ScrollWheel 
                  label="Hour"
                  items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} 
                  value={customTimeState.hour} 
                  onChange={(val) => setCustomTimeState(prev => ({ ...prev, hour: val }))} 
                />
                <div className="h-32 flex items-center text-2xl font-bold text-stone-300 pb-4">:</div>
                <ScrollWheel 
                  label="Minute"
                  items={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(m => m.toString().padStart(2, '0'))} 
                  value={customTimeState.minute.toString().padStart(2, '0')} 
                  onChange={(val) => setCustomTimeState(prev => ({ ...prev, minute: parseInt(val) }))} 
                />
                <div className="h-32 flex items-center pb-4">
                  <div className="flex flex-col gap-2">
                    {['AM', 'PM'].map((p) => (
                      <button 
                        key={p}
                        onClick={() => setCustomTimeState(prev => ({ ...prev, period: p }))}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${customTimeState.period === p ? 'bg-amber-500 text-white shadow-md scale-105' : 'bg-stone-100 text-stone-400'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={handleCustomTimeConfirm}
                className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-colors shadow-lg text-lg"
              >
                Confirm Time
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-amber-200"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">Request Received!</h3>
              <p className="text-stone-500 mb-8">Redirecting you to WhatsApp to finalize your reservation...</p>
              <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default VatikaBooking;
