import React, { useState, useEffect } from 'react';
import { useApiMutation } from '../../hooks/useApi';
import { performanceAPI } from '../../services/api';

interface Performance {
  id?: string;
  employeeId: string;
  reviewPeriod: string;
  reviewDate: string;
  overallRating: number;
  goals: string;
  achievements: string;
  areasForImprovement: string;
  managerComments: string;
  employeeComments: string;
  status: string;
  reviewedBy: string;
  nextReviewDate: string;
}

interface PerformanceFormProps {
  performance?: Performance;
  onSuccess: () => void;
  onCancel: () => void;
}

const PerformanceForm: React.FC<PerformanceFormProps> = ({ performance, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<{
    employeeId: string;
    reviewPeriod: string;
    reviewDate: string;
    reviewerId: string;
    overallRating: string;
    jobKnowledge: string;
    workQuality: string;
    communication: string;
    teamwork: string;
    initiative: string;
    attendance: string;
    strengths: string[];
    areasForImprovement: string[];
    goals: string[];
    comments: string;
    recommendations: string;
    nextReviewDate: string;
    status: string;
  }>({
    employeeId: '',
    reviewPeriod: '',
    reviewDate: '',
    reviewerId: '',
    overallRating: '',
    jobKnowledge: '',
    workQuality: '',
    communication: '',
    teamwork: '',
    initiative: '',
    attendance: '',
    strengths: [''],
    areasForImprovement: [''],
    goals: [''],
    comments: '',
    recommendations: '',
    nextReviewDate: '',
    status: 'Draft'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (performance) {
      setFormData({
        employeeId: performance.employeeId || '',
        reviewPeriod: performance.reviewPeriod || '',
        reviewDate: performance.reviewDate || '',
        reviewerId: performance.reviewerId || '',
        overallRating: performance.overallRating || '',
        jobKnowledge: performance.jobKnowledge || '',
        workQuality: performance.workQuality || '',
        communication: performance.communication || '',
        teamwork: performance.teamwork || '',
        initiative: performance.initiative || '',
        attendance: performance.attendance || '',
        strengths: performance.strengths || [''],
        areasForImprovement: performance.areasForImprovement || [''],
        goals: performance.goals || [''],
        comments: performance.comments || '',
        recommendations: performance.recommendations || '',
        nextReviewDate: performance.nextReviewDate || '',
        status: performance.status || 'Draft'
      });
    } else {
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, reviewDate: today }));
    }
  }, [performance]);

  const createMutation = useApiMutation(performanceAPI.create);
  const updateMutation = useApiMutation((params: { id: string; data: Performance }) => performanceAPI.update(params.id, params.data));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee is required';
    if (!formData.reviewPeriod.trim()) newErrors.reviewPeriod = 'Review period is required';
    if (!formData.reviewDate.trim()) newErrors.reviewDate = 'Review date is required';
    if (!formData.reviewerId.trim()) newErrors.reviewerId = 'Reviewer is required';
    if (!formData.overallRating.trim()) newErrors.overallRating = 'Overall rating is required';
    if (!formData.jobKnowledge.trim()) newErrors.jobKnowledge = 'Job knowledge rating is required';
    if (!formData.workQuality.trim()) newErrors.workQuality = 'Work quality rating is required';
    if (!formData.communication.trim()) newErrors.communication = 'Communication rating is required';
    if (!formData.teamwork.trim()) newErrors.teamwork = 'Teamwork rating is required';
    if (!formData.initiative.trim()) newErrors.initiative = 'Initiative rating is required';
    if (!formData.attendance.trim()) newErrors.attendance = 'Attendance rating is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const submitData = {
        ...formData,
        overallRating: parseInt(formData.overallRating),
        jobKnowledge: parseInt(formData.jobKnowledge),
        workQuality: parseInt(formData.workQuality),
        communication: parseInt(formData.communication),
        teamwork: parseInt(formData.teamwork),
        initiative: parseInt(formData.initiative),
        attendance: parseInt(formData.attendance),
        strengths: formData.strengths.filter(strength => strength.trim() !== ''),
        areasForImprovement: formData.areasForImprovement.filter(area => area.trim() !== ''),
        goals: formData.goals.filter(goal => goal.trim() !== '')
      };

      if (performance) {
        await updateMutation.mutate({ id: performance.id, data: submitData });
      } else {
        await createMutation.mutate(submitData);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving performance review:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayChange = (field: keyof typeof formData, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item: string, i: number) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: keyof typeof formData) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_: string, i: number) => i !== index)
    }));
  };

  const getRatingDescription = (rating: string) => {
    switch (rating) {
      case '5': return 'Outstanding';
      case '4': return 'Exceeds Expectations';
      case '3': return 'Meets Expectations';
      case '2': return 'Below Expectations';
      case '1': return 'Unsatisfactory';
      default: return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee ID *
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Enter employee ID"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.employeeId ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.employeeId && (
            <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review Period *
          </label>
          <select
            name="reviewPeriod"
            value={formData.reviewPeriod}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.reviewPeriod ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Review Period</option>
            <option value="Q1 2024">Q1 2024</option>
            <option value="Q2 2024">Q2 2024</option>
            <option value="Q3 2024">Q3 2024</option>
            <option value="Q4 2024">Q4 2024</option>
            <option value="Annual 2024">Annual 2024</option>
            <option value="Probation">Probation</option>
            <option value="Mid-Year">Mid-Year</option>
          </select>
          {errors.reviewPeriod && (
            <p className="text-red-500 text-xs mt-1">{errors.reviewPeriod}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review Date *
          </label>
          <input
            type="date"
            name="reviewDate"
            value={formData.reviewDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.reviewDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.reviewDate && (
            <p className="text-red-500 text-xs mt-1">{errors.reviewDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reviewer ID *
          </label>
          <input
            type="text"
            name="reviewerId"
            value={formData.reviewerId}
            onChange={handleChange}
            placeholder="Enter reviewer ID"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.reviewerId ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.reviewerId && (
            <p className="text-red-500 text-xs mt-1">{errors.reviewerId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Draft">Draft</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Next Review Date
          </label>
          <input
            type="date"
            name="nextReviewDate"
            value={formData.nextReviewDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Performance Ratings */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Ratings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overall Rating *
            </label>
            <select
              name="overallRating"
              value={formData.overallRating}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.overallRating ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Rating</option>
              <option value="5">5 - Outstanding</option>
              <option value="4">4 - Exceeds Expectations</option>
              <option value="3">3 - Meets Expectations</option>
              <option value="2">2 - Below Expectations</option>
              <option value="1">1 - Unsatisfactory</option>
            </select>
            {formData.overallRating && (
              <p className="text-sm text-gray-600 mt-1">{getRatingDescription(formData.overallRating)}</p>
            )}
            {errors.overallRating && (
              <p className="text-red-500 text-xs mt-1">{errors.overallRating}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Knowledge *
            </label>
            <select
              name="jobKnowledge"
              value={formData.jobKnowledge}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.jobKnowledge ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Rating</option>
              <option value="5">5 - Outstanding</option>
              <option value="4">4 - Exceeds Expectations</option>
              <option value="3">3 - Meets Expectations</option>
              <option value="2">2 - Below Expectations</option>
              <option value="1">1 - Unsatisfactory</option>
            </select>
            {errors.jobKnowledge && (
              <p className="text-red-500 text-xs mt-1">{errors.jobKnowledge}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Quality *
            </label>
            <select
              name="workQuality"
              value={formData.workQuality}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.workQuality ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Rating</option>
              <option value="5">5 - Outstanding</option>
              <option value="4">4 - Exceeds Expectations</option>
              <option value="3">3 - Meets Expectations</option>
              <option value="2">2 - Below Expectations</option>
              <option value="1">1 - Unsatisfactory</option>
            </select>
            {errors.workQuality && (
              <p className="text-red-500 text-xs mt-1">{errors.workQuality}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Communication *
            </label>
            <select
              name="communication"
              value={formData.communication}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.communication ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Rating</option>
              <option value="5">5 - Outstanding</option>
              <option value="4">4 - Exceeds Expectations</option>
              <option value="3">3 - Meets Expectations</option>
              <option value="2">2 - Below Expectations</option>
              <option value="1">1 - Unsatisfactory</option>
            </select>
            {errors.communication && (
              <p className="text-red-500 text-xs mt-1">{errors.communication}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teamwork *
            </label>
            <select
              name="teamwork"
              value={formData.teamwork}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.teamwork ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Rating</option>
              <option value="5">5 - Outstanding</option>
              <option value="4">4 - Exceeds Expectations</option>
              <option value="3">3 - Meets Expectations</option>
              <option value="2">2 - Below Expectations</option>
              <option value="1">1 - Unsatisfactory</option>
            </select>
            {errors.teamwork && (
              <p className="text-red-500 text-xs mt-1">{errors.teamwork}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initiative *
            </label>
            <select
              name="initiative"
              value={formData.initiative}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.initiative ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Rating</option>
              <option value="5">5 - Outstanding</option>
              <option value="4">4 - Exceeds Expectations</option>
              <option value="3">3 - Meets Expectations</option>
              <option value="2">2 - Below Expectations</option>
              <option value="1">1 - Unsatisfactory</option>
            </select>
            {errors.initiative && (
              <p className="text-red-500 text-xs mt-1">{errors.initiative}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attendance *
            </label>
            <select
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.attendance ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Rating</option>
              <option value="5">5 - Outstanding</option>
              <option value="4">4 - Exceeds Expectations</option>
              <option value="3">3 - Meets Expectations</option>
              <option value="2">2 - Below Expectations</option>
              <option value="1">1 - Unsatisfactory</option>
            </select>
            {errors.attendance && (
              <p className="text-red-500 text-xs mt-1">{errors.attendance}</p>
            )}
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Key Strengths
        </label>
        {formData.strengths.map((strength, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={strength}
              onChange={(e) => handleArrayChange('strengths', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter key strength"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('strengths', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('strengths')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Strength
        </button>
      </div>

      {/* Areas for Improvement */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Areas for Improvement
        </label>
        {formData.areasForImprovement.map((area, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={area}
              onChange={(e) => handleArrayChange('areasForImprovement', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter area for improvement"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('areasForImprovement', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('areasForImprovement')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Area
        </button>
      </div>

      {/* Goals */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Performance Goals
        </label>
        {formData.goals.map((goal, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={goal}
              onChange={(e) => handleArrayChange('goals', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter performance goal"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('goals', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('goals')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Goal
        </button>
      </div>

      {/* Comments */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Overall Comments
        </label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows={4}
          placeholder="Provide overall comments about the employee's performance"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Recommendations */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Recommendations
        </label>
        <textarea
          name="recommendations"
          value={formData.recommendations}
          onChange={handleChange}
          rows={3}
          placeholder="Provide recommendations for future development"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={createMutation.loading || updateMutation.loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
        >
          {createMutation.loading || updateMutation.loading ? 'Saving...' : performance ? 'Update Performance Review' : 'Save Performance Review'}
        </button>
      </div>
    </form>
  );
};

export default PerformanceForm; 