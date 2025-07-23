import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bot, Plus, Trash2, Save, BookOpen, MessageSquare } from 'lucide-react';
import apiService from '../../services/api';

interface KnowledgeItem {
  category: string;
  data: any;
}

const ChatbotTraining: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [knowledge, setKnowledge] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newData, setNewData] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const fetchKnowledge = async () => {
    try {
      const response = await apiService.get('/api/chatbot/knowledge');
      setKnowledge(response);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch knowledge:', error);
      setError('Failed to load chatbot knowledge');
      setLoading(false);
    }
  };

  const addKnowledge = async () => {
    if (!newCategory.trim() || !newData.trim()) {
      setError('Please fill in both category and data fields');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      let parsedData;
      try {
        parsedData = JSON.parse(newData);
      } catch (e) {
        setError('Data must be valid JSON format');
        setSaving(false);
        return;
      }

      await apiService.post('/api/chatbot/train', {
        category: newCategory.trim(),
        data: parsedData,
      });

      setSuccess(`Knowledge added for category: ${newCategory}`);
      setNewCategory('');
      setNewData('');
      fetchKnowledge();
    } catch (error) {
      console.error('Failed to add knowledge:', error);
      setError('Failed to add knowledge');
    } finally {
      setSaving(false);
    }
  };

  const deleteKnowledge = async (category: string) => {
    if (!window.confirm(`Are you sure you want to delete the knowledge for "${category}"?`)) {
      return;
    }

    try {
      // Note: We'll need to add a delete endpoint to the backend
      setError('Delete functionality not yet implemented');
    } catch (error) {
      console.error('Failed to delete knowledge:', error);
      setError('Failed to delete knowledge');
    }
  };

  const formatData = (data: any): string => {
    return JSON.stringify(data, null, 2);
  };

  if (!isAuthenticated) {
    return <div className="text-center py-12">Please log in to access this page.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Chatbot Training</h1>
            <p className="text-gray-600">Train your AI assistant with company knowledge</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {/* Add New Knowledge */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            Add New Knowledge
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g., hr_policies, company_info"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data (JSON Format)
              </label>
              <textarea
                value={newData}
                onChange={(e) => setNewData(e.target.value)}
                placeholder='{"key": "value", "list": ["item1", "item2"]}'
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={addKnowledge}
              disabled={saving || !newCategory.trim() || !newData.trim()}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Add Knowledge
                </>
              )}
            </button>
            
            <button
              onClick={() => {
                setNewCategory('');
                setNewData('');
                setError(null);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Existing Knowledge */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-600" />
            Existing Knowledge ({Object.keys(knowledge).length} categories)
          </h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading knowledge...</p>
            </div>
          ) : Object.keys(knowledge).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No knowledge has been added yet.</p>
              <p className="text-sm">Add some knowledge above to get started.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(knowledge).map(([category, data]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {category.replace(/_/g, ' ')}
                    </h3>
                    <button
                      onClick={() => deleteKnowledge(category)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete knowledge"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                      {formatData(data)}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Usage Tips */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Training Tips</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Use descriptive category names like "hr_policies", "payroll_info", "company_structure"</li>
            <li>• Structure your data as JSON objects with clear key-value pairs</li>
            <li>• Include specific details that employees might ask about</li>
            <li>• The chatbot will automatically use this knowledge when answering company-specific questions</li>
            <li>• General questions will still be answered using OpenAI's knowledge</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatbotTraining; 