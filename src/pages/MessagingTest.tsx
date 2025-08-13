import React from 'react';
import InternalMessaging from '../components/shared/InternalMessaging';

const MessagingTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🚀 Internal Messaging Test
          </h1>
          <p className="text-gray-600">
            Test the enhanced internal messaging system with real functionality
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-[800px]">
            <InternalMessaging />
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">
            🧪 Testing Instructions:
          </h2>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• <strong>Conversations:</strong> Click on any conversation to view messages</li>
            <li>• <strong>Channels:</strong> Switch to Channels tab to see available channels</li>
            <li>• <strong>Contacts:</strong> Switch to Contacts tab to start new conversations</li>
            <li>• <strong>Send Messages:</strong> Type and send messages in any conversation</li>
            <li>• <strong>File Upload:</strong> Use the paperclip icon to attach files</li>
            <li>• <strong>Search:</strong> Use the search bar to find messages</li>
            <li>• <strong>Reactions:</strong> Add emoji reactions to messages</li>
            <li>• <strong>Typing Indicators:</strong> See typing indicators when composing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessagingTest; 