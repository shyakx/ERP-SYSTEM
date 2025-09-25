import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  X, 
  RotateCcw, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  BarChart3,
  Users,
  Shield,
  DollarSign,
  Database,
  Zap,
  MessageSquare,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  Info,
  MapPin,
  MoreHorizontal,
  ChevronRight
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ERPData {
  employees: number;
  departments: number;
  activeProjects: number;
  revenue: string;
  securityIncidents: number;
  systemHealth: number;
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
  alerts: Array<{
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    timestamp: string;
  }>;
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'data' | 'automation' | 'help'>('chat');
  const [chatPosition, setChatPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center-right' | 'center-left'>('bottom-right');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulated ERP Backend Data
  const erpData: ERPData = {
    employees: 127,
    departments: 8,
    activeProjects: 15,
    revenue: "$2.4M",
    securityIncidents: 3,
    systemHealth: 94,
    recentActivities: [
      { id: 1, type: 'login', user: 'Marie Claire', time: '2 min ago', department: 'Security' },
      { id: 2, type: 'report', user: 'Finance Team', time: '5 min ago', department: 'Finance' },
      { id: 3, type: 'alert', user: 'System', time: '10 min ago', department: 'IT' },
      { id: 4, type: 'update', user: 'HR Manager', time: '15 min ago', department: 'HR' }
    ],
    alerts: [
      { id: 1, type: 'warning', message: 'System maintenance scheduled for tonight', department: 'IT' },
      { id: 2, type: 'info', message: 'New security protocol implemented', department: 'Security' },
      { id: 3, type: 'success', message: 'Q2 budget approved', department: 'Finance' }
    ]
  };

  const quickActions = [
    { id: 'navigate', label: 'System Navigation', icon: MapPin, color: 'blue' },
    { id: 'reports', label: 'Generate Reports', icon: BarChart3, color: 'green' },
    { id: 'data', label: 'Data Queries', icon: Database, color: 'purple' },
    { id: 'automation', label: 'Process Automation', icon: Zap, color: 'orange' },
    { id: 'security', label: 'Security Status', icon: Shield, color: 'red' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, color: 'gray' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage({
          type: 'ai',
          content: `Hello! I'm your ERP AI Assistant. I can help you with:

**System Navigation** - Find departments, pages, and features
**Data Analysis** - Generate reports and insights
**Information Queries** - Get real-time data and status
**Process Automation** - Streamline workflows
**Security Monitoring** - Check system health and alerts
**Help & Support** - Get assistance with any feature

What would you like to do today?`,
          timestamp: new Date()
        });
      }, 500);
    }
  }, [isOpen]);

  const addMessage = (message: Omit<Message, 'id'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = async (response: string, delay: number = 1000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
  };

  const generateAIResponse = async (userInput: string): Promise<string> => {
    const lowerInput = userInput.toLowerCase();
    
    // System Navigation
    if (lowerInput.includes('navigate') || lowerInput.includes('go to') || lowerInput.includes('find')) {
      return `I can help you navigate to different departments:

**HR Department** - Employee management, recruitment, payroll
**Finance Department** - Budget, expenses, financial reports
**Security Department** - Guard management, incident reports
**Analytics Department** - Reports, insights, performance metrics
**System Settings** - Configuration, security, backup

Which department would you like to access?`;
    }
    
    // Data Analysis
    if (lowerInput.includes('report') || lowerInput.includes('generate') || lowerInput.includes('analysis')) {
      return `Here are the available reports I can generate:

**Employee Report** - Current headcount, performance metrics
**Financial Report** - Revenue, expenses, budget status
**Security Report** - Incidents, guard deployment, alerts
**System Report** - Performance, uptime, health status
**Custom Report** - Tailored to your specific needs

What type of report would you like?`;
    }
    
    // System Status
    if (lowerInput.includes('status') || lowerInput.includes('health') || lowerInput.includes('system')) {
      return `**System Status Overview:**

**System Health**: ${erpData.systemHealth}% (Excellent)
**Active Users**: ${erpData.employees} employees
**Departments**: ${erpData.departments} active
**Revenue**: ${erpData.revenue} (Q2 2024)
**Security**: ${erpData.securityIncidents} incidents this month
**Performance**: All systems operational

Everything looks good! Is there anything specific you'd like to check?`;
    }
    
    // Security
    if (lowerInput.includes('security') || lowerInput.includes('alert') || lowerInput.includes('incident')) {
      return ` **Security Status:**

 **Active Alerts**: ${erpData.securityIncidents} incidents
 **System Security**: All protocols active
 **Access Control**: Multi-factor authentication enabled
 **Mobile Security**: All devices secured
 **Network Security**: Firewall and monitoring active

Recent security activities are being monitored. Would you like detailed incident reports?`;
    }
    
    // Help
    if (lowerInput.includes('help') || lowerInput.includes('support') || lowerInput.includes('assist')) {
      return ` **How can I help you?**

🎯 **Navigation**: "Take me to HR department"
 **Reports**: "Generate employee report"
 **Security**: "Check security status"
 **Automation**: "Show automated processes"
 **Mobile**: "Access mobile features"
 **Settings**: "Open system settings"

Just ask me anything about the ERP system!`;
    }
    
    // Default response
    return `I understand you're asking about "${userInput}". Let me help you with that.

You can ask me to:
• Navigate to different departments
• Generate reports and analytics
• Check system status and security
• Automate processes
• Get help with any feature

What would you like to do?`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setInputText("");

    // Add user message
    addMessage({
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    // Simulate typing
    await simulateTyping("", 800);
    
    // Generate AI response
    const response = await generateAIResponse(userMessage);
    addMessage({
      type: 'ai',
      content: response,
      timestamp: new Date()
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = async (action: string) => {
    let response = "";
    
    switch (action) {
      case 'navigate':
        response = "I can help you navigate to any department. Which one would you like to access?\n\n HR Department\n Finance Department\n Security Department\n Analytics Department\n System Settings";
        break;
      case 'reports':
        response = "I can generate various reports for you:\n\n Employee Reports\n Financial Reports\n Security Reports\n System Reports\n🎯 Custom Reports\n\nWhat type of report do you need?";
        break;
      case 'data':
        response = `Here's your current ERP data:\n\n Employees: ${erpData.employees}\n Departments: ${erpData.departments}\n Revenue: ${erpData.revenue}\n Security Incidents: ${erpData.securityIncidents}\n System Health: ${erpData.systemHealth}%\n\nWhat specific data would you like to see?`;
        break;
      case 'automation':
        response = "I can help you with process automation:\n\n Employee Onboarding\n Financial Reporting\n Security Monitoring\n Data Backup\n Mobile Sync\n\nWhich process would you like to automate?";
        break;
      case 'security':
        response = ` Security Status:\n\n System Security: Active\n Access Control: Enabled\n Mobile Security: Secured\n Network Security: Protected\n Active Alerts: ${erpData.securityIncidents}\n\nEverything looks secure!`;
        break;
      case 'help':
        response = "I'm here to help! You can ask me about:\n\n🎯 Navigation and features\n Reports and analytics\n Security and monitoring\n Process automation\n Mobile access\n System settings\n\nWhat do you need help with?";
        break;
      default:
        response = "I can help you with navigation, reports, data queries, automation, security, and support. What would you like to do?";
    }

    addMessage({
      type: 'ai',
      content: response,
      timestamp: new Date()
    });
  };

  const clearChat = () => {
    setMessages([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Position classes based on selected position
  const getPositionClasses = () => {
    switch (chatPosition) {
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'center-right':
        return 'top-1/2 right-4 transform -translate-y-1/2';
      case 'center-left':
        return 'top-1/2 left-4 transform -translate-y-1/2';
      default:
        return 'bottom-4 right-4';
    }
  };

  return (
    <>
      <div className="fixed z-50">
        {/* Floating Action Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed ${getPositionClasses()} w-14 h-14 bg-blue-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center group z-50`}
          title="AI Assistant"
        >
          <Bot className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
        </button>

        {/* Position Selector (when open) */}
        {isOpen && (
          <div className={`fixed ${getPositionClasses()} top-20 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-40`}>
            <div className="text-xs font-medium text-gray-700 mb-2">Position:</div>
            <div className="grid grid-cols-2 gap-1">
              {[
                { key: 'bottom-right', label: 'BR' },
                { key: 'bottom-left', label: 'BL' },
                { key: 'top-right', label: 'TR' },
                { key: 'top-left', label: 'TL' },
                { key: 'center-right', label: 'CR' },
                { key: 'center-left', label: 'CL' }
              ].map((pos) => (
                <button
                  key={pos.key}
                  onClick={() => setChatPosition(pos.key as 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left')}
                  className={`px-2 py-1 text-xs rounded ${
                    chatPosition === pos.key
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Backdrop Blur */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {isOpen && (
          <div className={`fixed ${getPositionClasses()} w-[420px] h-[520px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden`}>
            {/* Modern Header - Fixed */}
            <div className="bg-blue-600 p-3 rounded-t-xl flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">ERP AI Assistant</h3>
                    <p className="text-blue-100 text-xs">Powered by Advanced AI</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={clearChat}
                    className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                    title="Clear chat"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                    title="Close"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Tab Navigation - Fixed */}
              <div className="flex mt-3 space-x-1">
                {[
                  { id: 'chat', label: 'Chat', icon: MessageSquare },
                  { id: 'data', label: 'Data', icon: Database },
                  { id: 'automation', label: 'Auto', icon: Zap },
                  { id: 'help', label: 'Help', icon: HelpCircle }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'chat' | 'help' | 'settings')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <tab.icon className="w-3 h-3 inline mr-1" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'chat' && (
                <>
                  {/* Quick Actions */}
                  <div className="p-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => handleQuickAction(action.id)}
                          className={`p-2 rounded-lg text-xs font-medium flex items-center space-x-2 ${
                            action.color === 'blue' ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' :
                            action.color === 'green' ? 'bg-green-50 text-green-700 hover:bg-green-100' :
                            action.color === 'purple' ? 'bg-purple-50 text-purple-700 hover:bg-purple-100' :
                            action.color === 'orange' ? 'bg-orange-50 text-orange-700 hover:bg-orange-100' :
                            action.color === 'red' ? 'bg-red-50 text-red-700 hover:bg-red-100' :
                            'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <action.icon className="w-3 h-3" />
                          <span className="text-xs">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="p-3 space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[90%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`rounded-xl px-3 py-2 ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <div className="flex items-start space-x-2">
                              {message.type === 'ai' && (
                                <Bot className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                              )}
                              <div className="flex-1">
                                <div className="whitespace-pre-wrap text-xs leading-relaxed">{message.content}</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Message Actions */}
                          <div className={`flex items-center space-x-2 mt-1 text-xs text-gray-500 ${
                            message.type === 'user' ? 'justify-end' : 'justify-start'
                          }`}>
                            <span className="text-xs">{message.timestamp.toLocaleTimeString()}</span>
                            {message.type === 'ai' && (
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => copyToClipboard(message.content)}
                                  className="p-1 hover:bg-gray-200 rounded"
                                  title="Copy message"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                                <button
                                  className="p-1 hover:bg-gray-200 rounded"
                                  title="Helpful"
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button
                                  className="p-1 hover:bg-gray-200 rounded"
                                  title="Not helpful"
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-xl px-3 py-2">
                            <div className="flex items-center space-x-2">
                              <Bot className="w-3 h-3 text-blue-500" />
                              <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask me anything about the ERP system..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim()}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'data' && (
                <div className="p-3">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900"> ERP Data Overview</h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white border border-gray-200 rounded-xl p-3">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-medium text-gray-600">Employees</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{erpData.employees}</p>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-xl p-3">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-medium text-gray-600">Departments</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{erpData.departments}</p>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-xl p-3">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-purple-600" />
                          <span className="text-xs font-medium text-gray-600">Revenue</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{erpData.revenue}</p>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-xl p-3">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-xs font-medium text-gray-600">Incidents</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{erpData.securityIncidents}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-700">Recent Activities</h4>
                      {erpData.recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">{activity.user} - {activity.department}</span>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                          </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-700">Active Alerts</h4>
                      {erpData.alerts.map((alert) => (
                          <div key={alert.id} className={`flex items-center space-x-2 p-2 rounded-lg ${
                            alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                            alert.type === 'info' ? 'bg-blue-50 border border-blue-200' :
                            'bg-green-50 border border-green-200'
                          }`}>
                            {alert.type === 'warning' ? <AlertCircle className="w-3 h-3 text-yellow-600" /> :
                             alert.type === 'info' ? <Info className="w-3 h-3 text-blue-600" /> :
                             <CheckCircle className="w-3 h-3 text-green-600" />}
                            <span className="text-xs text-gray-700">{alert.message}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'automation' && (
                <div className="p-3">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900"> Process Automation</h3>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { name: 'Employee Onboarding', status: 'Active', icon: Users },
                        { name: 'Financial Reporting', status: 'Scheduled', icon: BarChart3 },
                        { name: 'Security Monitoring', status: 'Active', icon: Shield },
                        { name: 'Data Backup', status: 'Running', icon: Database }
                      ].map((process) => (
                        <div key={process.name} className="bg-white border border-gray-200 rounded-xl p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                                <process.icon className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 text-sm">{process.name}</h4>
                                <p className="text-xs text-gray-500">Automated workflow</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                process.status === 'Active' ? 'bg-green-100 text-green-700' :
                                process.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {process.status}
                              </span>
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <MoreHorizontal className="w-3 h-3 text-gray-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'help' && (
                <div className="p-3">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900"> Help & Support</h3>
                    
                    <div className="space-y-3">
                      {[
                        { title: 'System Navigation', description: 'Learn how to navigate between departments and features', icon: MapPin },
                        { title: 'Data Access', description: 'Understand how to query and retrieve information', icon: Database },
                        { title: 'Report Generation', description: 'Create and customize reports for your needs', icon: BarChart3 },
                        { title: 'Security Protocols', description: 'Learn about security features and best practices', icon: Shield }
                      ].map((help) => (
                        <div key={help.title} className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-md">
                          <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                              <help.icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm">{help.title}</h4>
                              <p className="text-xs text-gray-600">{help.description}</p>
                            </div>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <ChevronRight className="w-3 h-3 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AIChatbot; 