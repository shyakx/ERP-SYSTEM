import React, { useState, useEffect } from 'react';
import { useApiMutation } from '../../hooks/useApi';
import { trainingAPI } from '../../services/api';

interface TrainingCourseFormProps {
  course?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const TrainingCourseForm: React.FC<TrainingCourseFormProps> = ({ course, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    department: string;
    instructor: string;
    duration: string;
    capacity: string;
    startDate: string;
    endDate: string;
    location: string;
    status: string;
    type: string;
    objectives: string[];
    modules: string[];
    prerequisites: string[];
    materials: string[];
    cost: string;
  }>({
    title: '',
    description: '',
    department: '',
    instructor: '',
    duration: '',
    capacity: '',
    startDate: '',
    endDate: '',
    location: '',
    status: 'Scheduled',
    type: 'In-person',
    objectives: [''],
    modules: [''],
    prerequisites: [''],
    materials: [''],
    cost: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        department: course.department || '',
        instructor: course.instructor || '',
        duration: course.duration || '',
        capacity: course.capacity || '',
        startDate: course.startDate || '',
        endDate: course.endDate || '',
        location: course.location || '',
        status: course.status || 'Scheduled',
        type: course.type || 'In-person',
        objectives: course.objectives || [''],
        modules: course.modules || [''],
        prerequisites: course.prerequisites || [''],
        materials: course.materials || [''],
        cost: course.cost || ''
      });
    }
  }, [course]);

  const createMutation = useApiMutation(trainingAPI.createCourse);
  const updateMutation = useApiMutation((params: any) => trainingAPI.updateCourse(params.id, params.data));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Course title is required';
    if (!formData.description.trim()) newErrors.description = 'Course description is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.instructor.trim()) newErrors.instructor = 'Instructor is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.capacity.trim()) newErrors.capacity = 'Capacity is required';
    if (!formData.startDate.trim()) newErrors.startDate = 'Start date is required';
    if (!formData.endDate.trim()) newErrors.endDate = 'End date is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.cost.trim()) newErrors.cost = 'Cost is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const submitData = {
        ...formData,
        capacity: parseInt(formData.capacity),
        cost: parseFloat(formData.cost),
        objectives: formData.objectives.filter(obj => obj.trim() !== ''),
        modules: formData.modules.filter(module => module.trim() !== ''),
        prerequisites: formData.prerequisites.filter(prereq => prereq.trim() !== ''),
        materials: formData.materials.filter(material => material.trim() !== '')
      };

      if (course) {
        await updateMutation.mutate({ id: course.id, data: submitData });
      } else {
        await createMutation.mutate(submitData);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving training course:', error);
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
            Course Title *
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
            Instructor *
          </label>
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.instructor ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.instructor && (
            <p className="text-red-500 text-xs mt-1">{errors.instructor}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Training Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="In-person">In-person</option>
            <option value="Virtual">Virtual</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Self-paced">Self-paced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration *
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 2 days, 4 hours"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.duration ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.duration && (
            <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Capacity *
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.capacity ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.capacity && (
            <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date *
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.endDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
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
            placeholder="e.g., Conference Room A, Zoom Meeting"
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
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cost (RWF) *
          </label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.cost ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.cost && (
            <p className="text-red-500 text-xs mt-1">{errors.cost}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Description *
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

      {/* Learning Objectives */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Learning Objectives
        </label>
        {formData.objectives.map((objective, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={objective}
              onChange={(e) => handleArrayChange('objectives', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter learning objective"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('objectives', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('objectives')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Objective
        </button>
      </div>

      {/* Course Modules */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Modules
        </label>
        {formData.modules.map((module, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={module}
              onChange={(e) => handleArrayChange('modules', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter module name"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('modules', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('modules')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Module
        </button>
      </div>

      {/* Prerequisites */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prerequisites
        </label>
        {formData.prerequisites.map((prereq, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={prereq}
              onChange={(e) => handleArrayChange('prerequisites', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter prerequisite"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('prerequisites', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('prerequisites')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Prerequisite
        </button>
      </div>

      {/* Training Materials */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Training Materials
        </label>
        {formData.materials.map((material, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={material}
              onChange={(e) => handleArrayChange('materials', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter material name"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('materials', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('materials')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Material
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
          {createMutation.loading || updateMutation.loading ? 'Saving...' : course ? 'Update Course' : 'Create Course'}
        </button>
      </div>
    </form>
  );
};

export default TrainingCourseForm; 