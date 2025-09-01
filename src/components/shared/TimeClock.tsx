import React, { useState, useEffect } from 'react';
import { Clock, LogIn, LogOut, Calendar, User, MapPin, CheckCircle, AlertCircle, Play, Pause, RotateCcw, TrendingUp, Activity } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AnimatedCard from './AnimatedCard';
import { AnimatedButton } from './AnimatedCard';

interface TimeEntry {
  id: string;
  userId: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  totalHours: string;
  location: string;
  status: 'present' | 'absent' | 'late' | 'on-leave';
}

const TimeClock: React.FC = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayEntry, setTodayEntry] = useState<TimeEntry | null>(null);
  const [isClockingIn, setIsClockingIn] = useState(false);
  const [isClockingOut, setIsClockingOut] = useState(false);
  const [location, setLocation] = useState('Kigali Office');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isHoveringClock, setIsHoveringClock] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Mock data for today's entry
  const mockTodayEntry: TimeEntry = {
    id: '1',
    userId: user?.id || 'user-1',
    date: new Date().toISOString().split('T')[0],
    clockIn: '08:00 AM',
    clockOut: null,
    totalHours: '0h 0m',
    location: 'Kigali Office',
    status: 'present'
  };

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Load today's entry
    setTodayEntry(mockTodayEntry);

    return () => clearInterval(timer);
  }, []);

  const handleClockIn = async () => {
    setIsClockingIn(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newEntry: TimeEntry = {
      ...mockTodayEntry,
      clockIn: currentTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      status: 'present'
    };
    
    setTodayEntry(newEntry);
    setIsClockingIn(false);
    setSuccessMessage('Successfully clocked in! 🎉');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleClockOut = async () => {
    setIsClockingOut(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (todayEntry) {
      const clockOutTime = currentTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      const clockInTime = todayEntry.clockIn;
      if (clockInTime) {
        const clockIn = new Date(`2000-01-01 ${clockInTime}`);
        const clockOut = new Date(`2000-01-01 ${clockOutTime}`);
        const diffMs = clockOut.getTime() - clockIn.getTime();
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const totalHours = `${hours}h ${minutes}m`;
        
        const updatedEntry: TimeEntry = {
          ...todayEntry,
          clockOut: clockOutTime,
          totalHours
        };
        
        setTodayEntry(updatedEntry);
      }
    }
    
    setIsClockingOut(false);
    setSuccessMessage('Successfully clocked out! 👋');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const canClockIn = !todayEntry?.clockIn;
  const canClockOut = todayEntry?.clockIn && !todayEntry?.clockOut;
  const isCompleted = todayEntry?.clockIn && todayEntry?.clockOut;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-50 border-green-200';
      case 'late': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'absent': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'late': return <AlertCircle className="w-4 h-4" />;
      case 'absent': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getWorkProgress = () => {
    if (!todayEntry?.clockIn) return 0;
    if (todayEntry?.clockOut) return 100;
    
    const now = new Date();
    const clockIn = new Date(`2000-01-01 ${todayEntry.clockIn}`);
    const workStart = new Date(`2000-01-01 08:00`);
    const workEnd = new Date(`2000-01-01 17:00`);
    
    const totalWorkTime = workEnd.getTime() - workStart.getTime();
    const elapsedTime = now.getTime() - clockIn.getTime();
    
    return Math.min(Math.max((elapsedTime / totalWorkTime) * 100, 0), 100);
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 border border-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl shadow-xl border border-gray-100/50 backdrop-blur-sm">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-shift"></div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
              Time Clock
            </h1>
            <p className="text-gray-600 text-sm">
              Welcome back, {user?.firstName || 'User'}! 👋
            </p>
          </div>
        </div>

        {/* Current Time Display */}
        <div className="p-6 text-center">
          <div 
            className="relative inline-block cursor-pointer"
            onMouseEnter={() => setIsHoveringClock(true)}
            onMouseLeave={() => setIsHoveringClock(false)}
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20 transition-all duration-300 ${
              isHoveringClock ? 'animate-pulse-glow' : 'animate-pulse'
            }`}></div>
            <div className={`relative bg-white rounded-full p-8 shadow-lg border border-gray-100 transition-all duration-300 ${
              isHoveringClock ? 'scale-105 shadow-xl' : ''
            }`}>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true 
                })}
              </div>
              <div className="text-sm text-gray-500 font-medium">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap z-10">
                Click to refresh time
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            )}
          </div>
        </div>

        {/* Work Progress Bar */}
        {todayEntry?.clockIn && !todayEntry?.clockOut && (
          <div className="px-6 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Work Progress</span>
                </div>
                <span className="text-sm font-semibold text-blue-600">{Math.round(getWorkProgress())}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getWorkProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Today's Status */}
        {todayEntry && (
          <div className="px-6 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 card-hover">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-full ${getStatusColor(todayEntry.status)} transition-all duration-200`}>
                    {getStatusIcon(todayEntry.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Today's Status</h3>
                    <p className="text-sm text-gray-500">Work session details</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(todayEntry.status)}`}>
                  {todayEntry.status === 'present' ? 'Present' : 
                   todayEntry.status === 'late' ? 'Late' : 'Absent'}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center space-x-2">
                    <Play className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Clock In</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {todayEntry.clockIn || 'Not clocked in'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center space-x-2">
                    <Pause className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-gray-700">Clock Out</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {todayEntry.clockOut || 'Not clocked out'}
                  </span>
                </div>
                
                {todayEntry.clockOut && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors duration-200">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Total Hours</span>
                    </div>
                    <span className="font-bold text-blue-600 text-lg">
                      {todayEntry.totalHours}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Location Selection */}
        <div className="px-6 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 card-hover">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span>Work Location</span>
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white focus-ring"
            >
              <option value="Kigali Office">🏢 Kigali Office</option>
              <option value="Huye Branch">🏢 Huye Branch</option>
              <option value="Musanze Branch">🏢 Musanze Branch</option>
              <option value="Remote">🏠 Remote</option>
            </select>
          </div>
        </div>

        {/* Clock In/Out Buttons */}
        <div className="px-6 mb-6">
          <div className="space-y-3">
            {canClockIn && (
              <AnimatedButton
                onClick={handleClockIn}
                disabled={isClockingIn}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 disabled:opacity-50 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 btn-hover"
              >
                {isClockingIn ? (
                  <div className="spinner"></div>
                ) : (
                  <LogIn className="w-6 h-6" />
                )}
                <span>{isClockingIn ? 'Clocking In...' : 'Clock In'}</span>
              </AnimatedButton>
            )}

            {canClockOut && (
              <AnimatedButton
                onClick={handleClockOut}
                disabled={isClockingOut}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 disabled:opacity-50 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 btn-hover"
              >
                {isClockingOut ? (
                  <div className="spinner"></div>
                ) : (
                  <LogOut className="w-6 h-6" />
                )}
                <span>{isClockingOut ? 'Clocking Out...' : 'Clock Out'}</span>
              </AnimatedButton>
            )}

            {isCompleted && (
              <div className="text-center py-8 animate-float">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Work Day Complete!</h3>
                <p className="text-gray-600">Great job today! Your time has been recorded.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 card-hover">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <AnimatedButton
                onClick={() => {}}
                className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200 hover:border-blue-300 group btn-hover"
              >
                <Calendar className="w-5 h-5 text-blue-600 transition-transform duration-200" />
                <span className="text-sm font-medium text-gray-700">View History</span>
              </AnimatedButton>
              <AnimatedButton
                onClick={() => {}}
                className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 border border-purple-200 hover:border-purple-300 group btn-hover"
              >
                <User className="w-5 h-5 text-purple-600 transition-transform duration-200" />
                <span className="text-sm font-medium text-gray-700">My Profile</span>
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeClock; 