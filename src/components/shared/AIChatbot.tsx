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
  Bell,
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
  recentActivities: any[];
  alerts: any[];
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'data' | 'automation' | 'help'>('chat');
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

🎯 **System Navigation** - Find departments, pages, and features
📊 **Data Analysis** - Generate reports and insights
🔍 **Information Queries** - Get real-time data and status
⚡ **Process Automation** - Streamline workflows
🛡️ **Security Monitoring** - Check system health and alerts
❓ **Help & Support** - Get assistance with any feature

What would you like to do today?`,
          timestamp: new Date(),
          suggestions: ['Show me system overview', 'Generate a report', 'Navigate to HR', 'Check security status']
        });
      }, 500);
    }
  }, [isOpen, messages.length]);

  const addMessage = (message: Omit<Message, 'id'>) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = async (response: string, delay: number = 1000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
    return response;
  };

  const generateAIResponse = async (userInput: string): Promise<string> => {
    const input = userInput.toLowerCase();
    
    if (input.includes('system') || input.includes('overview') || input.includes('status')) {
      return `📊 **System Overview**

🏢 **Company Status:**
• Total Employees: ${erpData.employees}
• Departments: ${erpData.departments}
• Active Projects: ${erpData.activeProjects}
• Revenue: ${erpData.revenue}

🛡️ **Security Status:**
• System Health: ${erpData.systemHealth}%
• Security Incidents: ${erpData.securityIncidents}
• Recent Alerts: ${erpData.alerts.length}

Everything looks good! 🟢 System is running optimally.`;
    }

    if (input.includes('navigate') || input.includes('go to') || input.includes('hr') || input.includes('finance')) {
      if (input.includes('hr')) {
        return `📍 **Navigating to HR Department**

I'll help you access the HR Dashboard. You can:
• View employee management
• Access recruitment tools
• Check payroll information
• Review performance data

Would you like me to show you specific HR features?`;
      }
      return `🗺️ **System Navigation**

Available departments:
• **HR** - Employee management, recruitment, payroll
• **Finance** - Budgets, reports, accounting
• **Security** - Monitoring, alerts, protocols
• **IT** - System maintenance, support
• **Operations** - Process management, workflows

Which department would you like to navigate to?`;
    }

    if (input.includes('report') || input.includes('generate')) {
      return `📈 **Report Generation**

I can generate these reports:
• **Employee Report** - Staff statistics and performance
• **Financial Report** - Revenue, expenses, budget analysis
• **Security Report** - Incidents, protocols, system health
• **Operations Report** - Process efficiency and workflows
• **Custom Report** - Specific data you need

What type of report would you like me to generate?`;
    }

    if (input.includes('security') || input.includes('alert') || input.includes('incident')) {
      return `🛡️ **Security Status Report**

🔴 **Current Alerts:**
${erpData.alerts.map(alert => 
  `• ${alert.type.toUpperCase()}: ${alert.message}`
).join('\n')}

📊 **Security Metrics:**
• System Health: ${erpData.systemHealth}%
• Active Incidents: ${erpData.securityIncidents}

🟢 **Status:** All systems are secure and operational.`;
    }

    return `I understand you're asking about "${userInput}". 

I can help you with:
• System navigation and overview
• Data queries and reports
• Process automation
• Security monitoring
• General assistance

Could you be more specific about what you need help with?`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage = inputText.trim();
    setInputText("");

    addMessage({
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    const response = await simulateTyping(await generateAIResponse(userMessage));
    
    addMessage({
      type: 'ai',
      content: response,
      timestamp: new Date(),
      suggestions: ['Show me system overview', 'Navigate to HR', 'Generate a report', 'Check security status']
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = async (action: string) => {
    const actionMessages = {
      navigate: 'Show me the system navigation options',
      reports: 'Generate a comprehensive report',
      data: 'Show me the latest data queries',
      automation: 'What automation processes are available?',
      security: 'Check the current security status',
      help: 'I need help with the system'
    };

    setInputText(actionMessages[action as keyof typeof actionMessages]);
    await handleSendMessage();
  };

  const clearChat = () => {
    setMessages([]);
    setActiveTab('chat');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          title="AI Assistant"
        >
          <Bot className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </button>

        {/* Backdrop Blur */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {isOpen && (
          <div className="fixed top-16 right-4 w-[420px] h-[520px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
            {/* Modern Header - Fixed */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-t-xl flex-shrink-0">
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
                    className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    title="Clear chat"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
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
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-300 ${
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
                          className={`p-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center space-x-2 ${
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
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
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
                                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                                  title="Copy"
                                >
                                  <Copy className="w-2.5 h-2.5" />
                                </button>
                                <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Helpful">
                                  <ThumbsUp className="w-2.5 h-2.5" />
                                </button>
                                <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Not helpful">
                                  <ThumbsDown className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Suggestions */}
                          {message.suggestions && message.type === 'ai' && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    setInputText(suggestion);
                                    handleSendMessage();
                                  }}
                                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs hover:bg-blue-100 transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="max-w-[90%]">
                          <div className="bg-gray-100 rounded-xl px-3 py-2">
                            <div className="flex items-center space-x-2">
                              <Bot className="w-3 h-3 text-blue-500" />
                              <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area - Fixed at Bottom */}
                  <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <textarea
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask me anything about the ERP system..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs"
                          rows={1}
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim() || isTyping}
                        className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'data' && (
                <div className="p-3">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900">📊 ERP Data Overview</h3>
                    
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 p-3 rounded-xl">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-900 text-sm">Employees</span>
                        </div>
                        <p className="text-lg font-bold text-blue-900">{erpData.employees}</p>
                        <p className="text-xs text-blue-600">+12% from last month</p>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-xl">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-green-900 text-sm">Revenue</span>
                        </div>
                        <p className="text-lg font-bold text-green-900">{erpData.revenue}</p>
                        <p className="text-xs text-green-600">Q2 2024</p>
                      </div>
                      
                      <div className="bg-purple-50 p-3 rounded-xl">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-purple-600" />
                          <span className="font-semibold text-purple-900 text-sm">System Health</span>
                        </div>
                        <p className="text-lg font-bold text-purple-900">{erpData.systemHealth}%</p>
                        <p className="text-xs text-purple-600">Optimal performance</p>
                      </div>
                      
                      <div className="bg-orange-50 p-3 rounded-xl">
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="w-4 h-4 text-orange-600" />
                          <span className="font-semibold text-orange-900 text-sm">Projects</span>
                        </div>
                        <p className="text-lg font-bold text-orange-900">{erpData.activeProjects}</p>
                        <p className="text-xs text-orange-600">Active</p>
                      </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-white border border-gray-200 rounded-xl p-3">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Recent Activities</h4>
                      <div className="space-y-1">
                        {erpData.recentActivities.slice(0, 2).map((activity) => (
                          <div key={activity.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-gray-700">{activity.user}</span>
                              <span className="text-xs text-gray-500">- {activity.type}</span>
                            </div>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alerts */}
                    <div className="bg-white border border-gray-200 rounded-xl p-3">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">System Alerts</h4>
                      <div className="space-y-1">
                        {erpData.alerts.slice(0, 2).map((alert) => (
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
                </div>
              )}

              {activeTab === 'automation' && (
                <div className="p-3">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900">⚡ Process Automation</h3>
                    
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
                              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
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
                    <h3 className="text-sm font-semibold text-gray-900">❓ Help & Support</h3>
                    
                    <div className="space-y-3">
                      {[
                        { title: 'System Navigation', description: 'Learn how to navigate between departments and features', icon: MapPin },
                        { title: 'Data Access', description: 'Understand how to query and retrieve information', icon: Database },
                        { title: 'Report Generation', description: 'Create and customize reports for your needs', icon: BarChart3 },
                        { title: 'Security Protocols', description: 'Learn about security features and best practices', icon: Shield }
                      ].map((help) => (
                        <div key={help.title} className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                              <help.icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm">{help.title}</h4>
                              <p className="text-xs text-gray-600">{help.description}</p>
                            </div>
                            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
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