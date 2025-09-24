import React, { useState, useEffect } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { 
  Monitor, 
  Camera, 
  Radio, 
  Headphones,
  AlertTriangle,
  CheckCircle,
  Activity,
  MapPin,
  Clock,
  Users,
  Shield,
  Zap,
  Eye,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from 'lucide-react';

interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdate: string;
  quality: 'high' | 'medium' | 'low';
}

interface RadioChannel {
  id: string;
  name: string;
  frequency: string;
  status: 'active' | 'inactive';
  users: number;
  lastActivity: string;
}

interface ControlRoomStatus {
  systemStatus: 'operational' | 'warning' | 'error';
  activeCameras: number;
  totalCameras: number;
  activeChannels: number;
  totalChannels: number;
  alerts: number;
  lastUpdate: string;
}

const ControlRoom: React.FC = () => {
  const [controlRoomStatus, setControlRoomStatus] = useState<ControlRoomStatus>({
    systemStatus: 'operational',
    activeCameras: 8,
    totalCameras: 12,
    activeChannels: 4,
    totalChannels: 6,
    alerts: 2,
    lastUpdate: new Date().toLocaleTimeString()
  });

  const [cameraFeeds, setCameraFeeds] = useState<CameraFeed[]>([
    {
      id: '1',
      name: 'Main Entrance',
      location: 'Kigali Office - Main Gate',
      status: 'active',
      lastUpdate: '2 minutes ago',
      quality: 'high'
    },
    {
      id: '2',
      name: 'Parking Area',
      location: 'Kigali Office - Parking',
      status: 'active',
      lastUpdate: '1 minute ago',
      quality: 'high'
    },
    {
      id: '3',
      name: 'Reception',
      location: 'Kigali Office - Lobby',
      status: 'active',
      lastUpdate: '30 seconds ago',
      quality: 'medium'
    },
    {
      id: '4',
      name: 'Perimeter North',
      location: 'Kigali Office - North Side',
      status: 'active',
      lastUpdate: '1 minute ago',
      quality: 'high'
    },
    {
      id: '5',
      name: 'Perimeter South',
      location: 'Kigali Office - South Side',
      status: 'maintenance',
      lastUpdate: '5 minutes ago',
      quality: 'low'
    },
    {
      id: '6',
      name: 'Back Entrance',
      location: 'Kigali Office - Service Gate',
      status: 'active',
      lastUpdate: '45 seconds ago',
      quality: 'medium'
    }
  ]);

  const [radioChannels, setRadioChannels] = useState<RadioChannel[]>([
    {
      id: '1',
      name: 'Main Operations',
      frequency: '456.125 MHz',
      status: 'active',
      users: 8,
      lastActivity: '30 seconds ago'
    },
    {
      id: '2',
      name: 'Emergency',
      frequency: '456.250 MHz',
      status: 'active',
      users: 3,
      lastActivity: '2 minutes ago'
    },
    {
      id: '3',
      name: 'Patrol Team Alpha',
      frequency: '456.375 MHz',
      status: 'active',
      users: 4,
      lastActivity: '1 minute ago'
    },
    {
      id: '4',
      name: 'Patrol Team Beta',
      frequency: '456.500 MHz',
      status: 'active',
      users: 3,
      lastActivity: '45 seconds ago'
    }
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setControlRoomStatus(prev => ({
        ...prev,
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'operational': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Control Room</h2>
          <p className="text-gray-600">Real-time monitoring and communication center</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(controlRoomStatus.systemStatus)}`}>
            <CheckCircle className="w-4 h-4 mr-1" />
            {controlRoomStatus.systemStatus.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500">Last update: {controlRoomStatus.lastUpdate}</span>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Camera Systems"
          subtitle={`${controlRoomStatus.activeCameras}/${controlRoomStatus.totalCameras} active`}
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{controlRoomStatus.activeCameras}</p>
              <p className="text-sm text-gray-500">Active cameras</p>
            </div>
            <Camera className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Radio Channels"
          subtitle={`${controlRoomStatus.activeChannels}/${controlRoomStatus.totalChannels} active`}
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{controlRoomStatus.activeChannels}</p>
              <p className="text-sm text-gray-500">Active channels</p>
            </div>
            <Radio className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Active Alerts"
          subtitle="Requiring attention"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{controlRoomStatus.alerts}</p>
              <p className="text-sm text-gray-500">Active alerts</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="System Uptime"
          subtitle="Operational time"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">99.8%</p>
              <p className="text-sm text-gray-500">Uptime</p>
            </div>
            <Activity className="w-8 h-8 text-purple-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Control Room Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Feeds */}
        <AnimatedCard
          title="Camera Feeds"
          subtitle="Live surveillance monitoring"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-3">
            {cameraFeeds.map((camera) => (
              <div
                key={camera.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{camera.name}</p>
                    <p className="text-sm text-gray-500">{camera.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(camera.status)}`}>
                    {camera.status === 'active' ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                    {camera.status}
                  </span>
                  <p className={`text-xs mt-1 ${getQualityColor(camera.quality)}`}>
                    Quality: {camera.quality}
                  </p>
                  <p className="text-xs text-gray-500">{camera.lastUpdate}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        {/* Radio Channels */}
        <AnimatedCard
          title="Radio Channels"
          subtitle="Communication monitoring"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-3">
            {radioChannels.map((channel) => (
              <div
                key={channel.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Radio className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{channel.name}</p>
                    <p className="text-sm text-gray-500">{channel.frequency}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(channel.status)}`}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {channel.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{channel.users} users</p>
                  <p className="text-xs text-gray-500">{channel.lastActivity}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Control Panel */}
      <AnimatedCard
        title="Control Panel"
        subtitle="System controls and monitoring"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recording Controls */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Recording Controls</h4>
            <div className="flex items-center space-x-3">
              <AnimatedButton
                onClick={handleToggleRecording}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {isRecording ? <Activity className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
              </AnimatedButton>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">All cameras recording</span>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Audio Controls</h4>
            <div className="flex items-center space-x-3">
              <AnimatedButton
                onClick={handleToggleMute}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isMuted 
                    ? 'bg-red-100 hover:bg-red-200 text-red-700' 
                    : 'bg-green-100 hover:bg-green-200 text-green-700'
                }`}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isMuted ? 'Unmute' : 'Mute'}</span>
              </AnimatedButton>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Volume</span>
                <span className="text-sm text-gray-900">{volume}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <VolumeX className="w-4 h-4 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <Volume2 className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">System Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Power Status</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Normal
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Network Status</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <span className="text-sm text-gray-900">78% used</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Emergency and operational controls"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-200"
          >
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Emergency Alert</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <Radio className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Broadcast Message</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <Users className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Contact Team</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <Shield className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Lockdown</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default ControlRoom;
