import React, { useState, useEffect } from 'react';
import { useApiMutation } from '../../hooks/useApi';
import { jobPostingAPI } from '../../services/api';

interface JobPosting {
  id?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  salaryRange: string;
  applicationDeadline: string;
  status: string;
  postedBy: string;
  postedDate: string;
}

interface JobPostingFormProps {
  jobPosting?: JobPosting;
  onSuccess: () => void;
  onCancel: () => void;
}

const JobPostingForm: React.FC<JobPostingFormProps> = ({ jobPosting, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<{
    title: string;
    department: string;
    location: string;
    type: string;
    salary: string;
    status: string;
    postedDate: string;
    deadline: string;
    experience: string;
    education: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
  }>({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    salary: '',
    status: 'Active',
    postedDate: '',
    deadline: '',
    experience: '',
    education: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    benefits: ['']
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (jobPosting) {
      setFormData({
        title: jobPosting.title || '',
        department: jobPosting.department || '',
        location: jobPosting.location || '',
        type: jobPosting.type || 'Full-time',
        salary: jobPosting.salary || '',
        status: jobPosting.status || 'Active',
        postedDate: jobPosting.postedDate || '',
        deadline: jobPosting.deadline || '',
        experience: jobPosting.experience || '',
        education: jobPosting.education || '',
        description: jobPosting.description || '',
        requirements: jobPosting.requirements || [''],
        responsibilities: jobPosting.responsibilities || [''],
        benefits: jobPosting.benefits || ['']
      });
    }
  }, [jobPosting]);

  const createMutation = useApiMutation(jobPostingAPI.create);
  const updateMutation = useApiMutation((params: { id: string; data: JobPosting }) => jobPostingAPI.update(params.id, params.data));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.salary.trim()) newErrors.salary = 'Salary is required';
    if (!formData.postedDate.trim()) newErrors.postedDate = 'Posted date is required';
    if (!formData.deadline.trim()) newErrors.deadline = 'Deadline is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience requirement is required';
    if (!formData.education.trim()) newErrors.education = 'Education requirement is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const submitData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        responsibilities: formData.responsibilities.filter(resp => resp.trim() !== ''),
        benefits: formData.benefits.filter(benefit => benefit.trim() !== '')
      };

      if (jobPosting) {
        await updateMutation.mutate({ id: jobPosting.id, data: submitData });
      } else {
        await createMutation.mutate(submitData);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving job posting:', error);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department *
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.department ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
          </select>
          {errors.department && (
            <p className="text-red-500 text-xs mt-1">{errors.department}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employment Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salary Range *
          </label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g., RWF 2,000,000 - 3,000,000"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.salary ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.salary && (
            <p className="text-red-500 text-xs mt-1">{errors.salary}</p>
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Posted Date *
          </label>
          <input
            type="date"
            name="postedDate"
            value={formData.postedDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.postedDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.postedDate && (
            <p className="text-red-500 text-xs mt-1">{errors.postedDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Application Deadline *
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.deadline ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.deadline && (
            <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience Required *
          </label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g., 3+ years"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.experience ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.experience && (
            <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Education Required *
          </label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="e.g., Bachelor's degree"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.education ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.education && (
            <p className="text-red-500 text-xs mt-1">{errors.education}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Requirements
        </label>
        {formData.requirements.map((req, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={req}
              onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter requirement"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('requirements', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('requirements')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Requirement
        </button>
      </div>

      {/* Responsibilities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Responsibilities
        </label>
        {formData.responsibilities.map((resp, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={resp}
              onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter responsibility"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('responsibilities', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('responsibilities')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Responsibility
        </button>
      </div>

      {/* Benefits */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Benefits
        </label>
        {formData.benefits.map((benefit, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={benefit}
              onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter benefit"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('benefits', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('benefits')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Benefit
        </button>
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
          {createMutation.loading || updateMutation.loading ? 'Saving...' : jobPosting ? 'Update Job Posting' : 'Create Job Posting'}
        </button>
      </div>
    </form>
  );
};

export default JobPostingForm; 