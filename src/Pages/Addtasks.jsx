import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaClipboardList, FaTag, FaFlag, FaEdit } from "react-icons/fa";

const Addtasks = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    category: 'PERSONAL',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // 🔐 Security check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const url = import.meta.env.VITE_API_URL + '/api/tasks/createtask';
      const { data } = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "token": token
        }
      });
      
      if (data.status === true) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/tasks");
        }, 1500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Category options with icons and colors
  const categoryOptions = [
    { value: 'PERSONAL', label: 'Personal', icon: '👤', color: 'bg-purple-100 text-purple-800' },
    { value: 'STUDY', label: 'Study', icon: '📚', color: 'bg-blue-100 text-blue-800' },
    { value: 'WORK', label: 'Work', icon: '💼', color: 'bg-green-100 text-green-800' },
    { value: 'SHOPPING', label: 'Shopping', icon: '🛒', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'OTHER', label: 'Other', icon: '📝', color: 'bg-gray-100 text-gray-800' },
  ];

  // Status options with colors
  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-linear-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <FaPlus className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Create New Task
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Organize your work and boost productivity
                </p>
              </div>
            </div>
            
            <Link 
              to={'/tasks'} 
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
            >
              <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Tasks</span>
            </Link>
          </div>
          
          <div className="h-1 w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Form Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-linear-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaClipboardList className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Task Details
              </h2>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaEdit className="text-gray-500" />
                  <span>Task Title</span>
                </label>
                <span className="text-xs text-gray-500">Required</span>
              </div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="What needs to be done?"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <span>Description</span>
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Add details, notes, or instructions..."
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white resize-none"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {formData.description.length}/500
                </div>
              </div>
            </div>

            {/* Status & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaFlag className="text-gray-500" />
                  <span>Status</span>
                </label>
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none text-gray-900 dark:text-white"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {statusOptions.map((option) => (
                    <span
                      key={option.value}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${option.value === formData.status ? option.color : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                    >
                      {option.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaTag className="text-gray-500" />
                  <span>Category</span>
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none text-gray-900 dark:text-white"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categoryOptions.map((option) => (
                    <span
                      key={option.value}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${option.value === formData.category ? option.color : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                    >
                      <span>{option.icon}</span>
                      {option.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>📝 Your task will be saved securely</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/tasks')}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-35"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      Create Task
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
              <span className="text-blue-600 dark:text-blue-300">💡</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Pro Tips</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• Be specific with your task titles for better clarity</li>
                <li>• Add due dates in the description if needed</li>
                <li>• Use categories to organize similar tasks together</li>
                <li>• Update status regularly to track progress</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addtasks;