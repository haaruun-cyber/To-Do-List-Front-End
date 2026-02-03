import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaClipboardCheck, FaHistory, FaTag, FaFlag, FaEdit, FaCalendarAlt } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

const Edittask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    category: 'PERSONAL',
    userid: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // 🔐 Security check & Fetch task
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      gettaskbyid();
    }
  }, [navigate]);

  const handleChange = (e) => {
    setTask({...task, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const url = import.meta.env.VITE_API_URL + `/api/tasks/updatetask/${id}`;
      const { data } = await axios.put(url, task, {
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
      toast.error("Failed to update task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const gettaskbyid = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = import.meta.env.VITE_API_URL + `/api/tasks/gettasksbyid/${id}`;
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "token": token
        }
      });
      
      setTask({
        title: data.task.title || '',
        description: data.task.description || '',
        status: data.task.status || 'pending',
        category: data.task.category || 'PERSONAL',
        userid: data.task.userid || ''
      });
      
      // Simulate last updated time (you can use actual timestamp from backend)
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to load task details");
    } finally {
      setIsLoading(false);
    }
  };

  // Category options with icons and colors
  const categoryOptions = [
    { value: 'PERSONAL', label: 'Personal', icon: '👤', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
    { value: 'STUDY', label: 'Study', icon: '📚', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    { value: 'WORK', label: 'Work', icon: '💼', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    { value: 'SHOPPING', label: 'Shopping', icon: '🛒', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
    { value: 'OTHER', label: 'Other', icon: '📝', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
  ];

  // Status options with colors
  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', icon: '⏳' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', icon: '🚀' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', icon: '✅' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading task details...</p>
        </div>
      </div>
    );
  }

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
      
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-linear-to-r from-green-600 to-emerald-700 rounded-xl shadow-lg">
                <FaEdit className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Edit Task
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Update and manage your task details
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={gettaskbyid}
                className="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                title="Refresh task"
              >
                <FiRefreshCw className="text-gray-600 dark:text-gray-400" />
              </button>
              <Link 
                to={'/tasks'} 
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
              >
                <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
                <span className="font-medium">Back to Tasks</span>
              </Link>
            </div>
          </div>
          
          <div className="h-1 w-full bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full"></div>
        </div>

        {/* Task Info Card */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Task ID</p>
                <p className="font-mono text-sm font-medium text-gray-900 dark:text-white truncate">
                  {id}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FaHistory className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {lastUpdated || 'Just now'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FaClipboardCheck className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Status</p>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  statusOptions.find(s => s.value === task.status)?.color || 'bg-gray-100 text-gray-800'
                }`}>
                  {statusOptions.find(s => s.value === task.status)?.icon || '📋'}
                  {statusOptions.find(s => s.value === task.status)?.label || task.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Form Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-linear-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <FaEdit className="text-emerald-600 dark:text-emerald-400 text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Task Details
              </h2>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span>Task Title</span>
                </label>
                <span className="text-xs text-gray-500">Required</span>
              </div>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="What needs to be done?"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
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
                  value={task.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Update task details, notes, or instructions..."
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white resize-none"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {task.description?.length || 0}/1000
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
                <div className="space-y-3">
                  <div className="relative">
                    <select
                      name="status"
                      value={task.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none text-gray-900 dark:text-white"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setTask({...task, status: option.value})}
                        className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          task.status === option.value 
                            ? option.color + ' ring-2 ring-offset-1 ring-opacity-50'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span className="text-sm">{option.icon}</span>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaTag className="text-gray-500" />
                  <span>Category</span>
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <select
                      name="category"
                      value={task.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none text-gray-900 dark:text-white"
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
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setTask({...task, category: option.value})}
                        className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          task.category === option.value 
                            ? option.color + ' ring-2 ring-offset-1 ring-opacity-50'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span className="text-sm">{option.icon}</span>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>💾 Changes will be saved immediately</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/tasks')}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-linear-to-r from-emerald-600 to-green-700 text-white rounded-xl hover:from-emerald-700 hover:to-green-800 transition-all duration-200 font-medium shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-35"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Update Task
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Preview Card */}
        <div className="mt-6 bg-linear-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 border border-emerald-100 dark:border-emerald-800 rounded-xl p-5">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-lg">
              <span className="text-emerald-600 dark:text-emerald-300">👁️</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Task Preview</h3>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                  <p className="font-medium text-gray-900 dark:text-white truncate">{task.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{task.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      statusOptions.find(s => s.value === task.status)?.color || 'bg-gray-100 text-gray-800'
                    }`}>
                      {statusOptions.find(s => s.value === task.status)?.icon}
                      {statusOptions.find(s => s.value === task.status)?.label}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      categoryOptions.find(c => c.value === task.category)?.color || 'bg-gray-100 text-gray-800'
                    }`}>
                      {categoryOptions.find(c => c.value === task.category)?.icon}
                      {categoryOptions.find(c => c.value === task.category)?.label}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This is how your task will appear in the task list after saving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edittask;