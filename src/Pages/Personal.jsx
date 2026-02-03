import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {
  MdDeleteOutline,
  MdEdit,
  MdMoreVert,
  MdAccessTime,
  MdPerson,
  MdCheckCircle,
  MdPlayCircle,
  MdPendingActions,
  MdFilterList,
  MdSort,
  MdSearch
} from "react-icons/md";
import {
  FaEllipsisV,
  FaCalendarAlt,
  FaTag,
  FaClipboardCheck,
  FaExclamationCircle
} from 'react-icons/fa';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    icon: <MdPendingActions className="text-yellow-600" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-500'
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    icon: <MdPlayCircle className="text-blue-600" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500'
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    icon: <MdCheckCircle className="text-green-600" />,
    color: 'text-green-600',
    bgColor: 'bg-green-500'
  },
};

const getStatusStyle = (status) =>
  STATUS_CONFIG[status] || STATUS_CONFIG.pending;

const Personal = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTask, setExpandedTask] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = import.meta.env.VITE_API_URL + '/api/tasks/alltasks/PERSONAL';
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "token": token
        }
      });
      setTasks(data.tasks);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to load tasks");
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const token = localStorage.getItem('token');
      const url = import.meta.env.VITE_API_URL + `/api/tasks/deletetask/${id}`;
      const { data } = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          "token": token
        }
      });
      if (data.status === true) {
        toast.success(data.message);
        setTasks(tasks.filter(task => task._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete task");
    }
  };

  const toggleTaskExpansion = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'in-progress') return task.status === 'in-progress';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  }).filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.updatedAt) - new Date(a.updatedAt);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return 0;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaClipboardCheck className="text-blue-600 text-xl" />
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
          Loading your personal tasks...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl">
              <HiOutlineDocumentDuplicate className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Personal Tasks
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {tasks.length} tasks • {filteredTasks.length} visible
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full sm:w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>

          {/* Filter & Sort */}
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 card-hover cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{tasks.length}</p>
            </div>
            <HiOutlineDocumentDuplicate className="text-2xl text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-linear-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800 card-hover cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tasks.filter(t => t.status === 'pending').length}
              </p>
            </div>
            <MdPendingActions className="text-2xl text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        <div className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 card-hover cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tasks.filter(t => t.status === 'in-progress').length}
              </p>
            </div>
            <MdPlayCircle className="text-2xl text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-linear-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-800 card-hover cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <MdCheckCircle className="text-2xl text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Tasks Grid/List */}
      <div className="space-y-4">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-linear-to-r from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineDocumentDuplicate className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No Personal Tasks Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              {searchQuery ? 'No tasks match your search. Try a different query.' : 'Start by creating your first personal task!'}
            </p>
            <Link
              to="/addtask"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold"
            >
              <MdEdit />
              Create Personal Task
            </Link>
          </div>
        ) : (
          sortedTasks.map((task) => {
            const { label, className, icon, bgColor } = getStatusStyle(task.status);

            return (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 card-hover overflow-hidden group"
              >
                <div className="p-6">
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${bgColor} text-white`}>
                          {icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {task.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${className}`}>
                              {label}
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              <FaTag className="text-xs" />
                              {task.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Task Description */}
                      <div className="mt-3">
                        <p className={`text-gray-600 dark:text-gray-400 ${expandedTask === task._id ? '' : 'line-clamp-2'
                          }`}>
                          {task.description}
                        </p>
                        {task.description && task.description.length > 150 && (
                          <button
                            onClick={() => toggleTaskExpansion(task._id)}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 flex items-center gap-1"
                          >
                            {expandedTask === task._id ? (
                              <>
                                Show less <IoIosArrowUp />
                              </>
                            ) : (
                              <>
                                Read more <IoIosArrowDown />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Action Menu */}
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/edittask/${task._id}`}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Edit task"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete task"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </div>

                  {/* Task Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MdAccessTime />
                        <span>Updated: {moment(task.updatedAt).format('MMM D, YYYY')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FaCalendarAlt />
                        <span>Created: {moment(task.createdAt).format('MMM D, YYYY')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MdPerson className="text-blue-600" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {task.userid?.username || 'You'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar (if in progress) */}
                {task.status === 'in-progress' && (
                  <div className="px-6 pb-6">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: '50%' }} // You can add actual progress data
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span>In progress</span>
                      <span>50%</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Quick Actions Footer */}
      {sortedTasks.length > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {sortedTasks.length} of {tasks.length} tasks
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFilter('all')}
              className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
            <Link
              to="/addtask"
              className="px-4 py-2 text-sm font-medium bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
            >
              + Add Task
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personal;