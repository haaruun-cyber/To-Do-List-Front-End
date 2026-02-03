import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { 
  MdDeleteOutline, 
  MdEdit, 
  MdAccessTime,
  MdPerson,
  MdCheckCircle,
  MdPlayCircle,
  MdPendingActions,
  MdSearch,
  MdSchool,
  MdLibraryBooks,
  MdTimer
} from "react-icons/md";
import { 
  FaCalendarAlt, 
  FaTag,
  FaClipboardCheck,
  FaBook,
  FaGraduationCap,
  FaClock
} from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { GiNotebook } from "react-icons/gi";

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

const Study = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTask, setExpandedTask] = useState(null);
  const [totalStudyHours, setTotalStudyHours] = useState(0);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = import.meta.env.VITE_API_URL + '/api/tasks/alltasks/STUDY';
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "token": token
        }
      });
      setTasks(data.tasks);
      
      // Calculate estimated study hours (example calculation)
      const hours = data.tasks.length * 2; // 2 hours per task on average
      setTotalStudyHours(hours);
      
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to load study tasks");
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this study task?')) return;
    
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
    if (sortBy === 'priority') return (a.priority || 0) - (b.priority || 0);
    return 0;
  });

  const getStudyProgress = () => {
    const completed = tasks.filter(t => t.status === 'completed').length;
    const total = tasks.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <MdSchool className="text-indigo-600 text-xl" />
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
          Loading study materials...
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
            <div className="p-2 bg-linear-to-r from-indigo-500 to-indigo-600 rounded-xl">
              <MdSchool className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Study Tasks
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {tasks.length} tasks • {totalStudyHours} estimated hours
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
              placeholder="Search study materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full sm:w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>

          {/* Filter & Sort */}
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="all">All Tasks</option>
              <option value="pending">To Study</option>
              <option value="in-progress">Studying</option>
              <option value="completed">Mastered</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Subject</option>
              <option value="status">Sort by Status</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-linear-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Topics</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{tasks.length}</p>
            </div>
            <MdSchool className="text-2xl text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        
        <div className="bg-linear-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">To Study</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tasks.filter(t => t.status === 'pending').length}
              </p>
            </div>
            <MdPendingActions className="text-2xl text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Studying</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tasks.filter(t => t.status === 'in-progress').length}
              </p>
            </div>
            <MdPlayCircle className="text-2xl text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <div className="bg-linear-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Mastered</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <MdCheckCircle className="text-2xl text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Study Progress Card */}
      <div className="bg-linear-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/10 dark:to-blue-900/10 border border-indigo-200 dark:border-indigo-800 rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-800/30 rounded-lg">
              <FaGraduationCap className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Study Progress</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Overall completion: <span className="font-bold text-indigo-700 dark:text-indigo-300">{getStudyProgress()}%</span> • 
                Estimated time: <span className="font-bold text-indigo-700 dark:text-indigo-300">{totalStudyHours} hours</span>
              </p>
            </div>
          </div>
          <div className="w-32">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getStudyProgress()}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
              {getStudyProgress()}% complete
            </div>
          </div>
        </div>
      </div>

      {/* Study Tasks Grid/List */}
      <div className="space-y-4">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-linear-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <GiNotebook className="text-3xl text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No Study Tasks Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              {searchQuery ? 'No study materials match your search. Try a different query.' : 'Add study topics to organize your learning journey.'}
            </p>
            <Link 
              to="/addtask"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 font-semibold"
            >
              <MdLibraryBooks />
              Add Study Topic
            </Link>
          </div>
        ) : (
          sortedTasks.map((task) => {
            const { label, className, icon, bgColor } = getStatusStyle(task.status);
            
            return (
              <div 
                key={task._id} 
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 overflow-hidden group"
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
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {task.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${className}`}>
                              {label === 'Pending' ? 'To Study' : label === 'Completed' ? 'Mastered' : label}
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                              <FaTag className="text-xs" />
                              {task.category}
                            </span>
                            {/* Study Time Badge */}
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              <FaClock className="text-xs" />
                              2h
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Task Description */}
                      <div className="mt-3">
                        <p className={`text-gray-600 dark:text-gray-400 ${
                          expandedTask === task._id ? '' : 'line-clamp-2'
                        }`}>
                          {task.description}
                        </p>
                        {task.description && task.description.length > 150 && (
                          <button
                            onClick={() => toggleTaskExpansion(task._id)}
                            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-1 flex items-center gap-1"
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
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        title="Edit study topic"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete study topic"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </div>

                  {/* Study Specific Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MdAccessTime />
                        <span>Last studied: {moment(task.updatedAt).format('MMM D')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FaCalendarAlt />
                        <span>Created: {moment(task.createdAt).format('MMM D, YYYY')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FaBook />
                        <span>Subject: General</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MdPerson className="text-indigo-600" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {task.userid?.username || 'You'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Study Progress Bar */}
                {task.status === 'in-progress' && (
                  <div className="px-6 pb-6">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span>Understanding: 60%</span>
                      <span>2/5 chapters</span>
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
            Showing {sortedTasks.length} of {tasks.length} study topics • 
            Progress: <span className="font-bold text-indigo-700 dark:text-indigo-300">{getStudyProgress()}%</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFilter('all')}
              className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
            <button
              onClick={() => toast.success('Study schedule created!')}
              className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Create Schedule
            </button>
            <Link
              to="/addtask"
              className="px-4 py-2 text-sm font-medium bg-linear-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200"
            >
              + Add Topic
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Study;