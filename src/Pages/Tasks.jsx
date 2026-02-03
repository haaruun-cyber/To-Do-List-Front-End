import React, { useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
  MdLockPerson,
  MdWorkHistory,
  MdAdd,
  MdDashboard,
  MdNotifications,
  MdSearch,
  MdFilterList,
  MdCalendarToday
} from "react-icons/md";
import {
  FaShoppingCart,
  FaBookReader,
  FaChartLine,
  FaCog,
  FaBell,
  FaUserCircle
} from 'react-icons/fa';
import { GiConvergenceTarget } from "react-icons/gi";
import { IoIosTrendingUp } from "react-icons/io";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";

const Tasks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    {
      id: 1,
      name: 'Personal',
      icon: <MdLockPerson />,
      path: '/tasks/personal',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-300',
      count: 5,
      trend: '+2'
    },
    {
      id: 2,
      name: 'Work',
      icon: <MdWorkHistory />,
      path: '/tasks/work',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      count: 3,
      trend: '+1'
    },
    {
      id: 3,
      name: 'Shopping',
      icon: <FaShoppingCart />,
      path: '/tasks/shopping',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-700 dark:text-purple-300',
      count: 2,
      trend: '+0'
    },
    {
      id: 4,
      name: 'Study',
      icon: <FaBookReader />,
      path: '/tasks/study',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      textColor: 'text-indigo-700 dark:text-indigo-300',
      count: 6,
      trend: '+3'
    },
    {
      id: 5,
      name: 'Others',
      icon: <GiConvergenceTarget />,
      path: '/tasks/others',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-700 dark:text-orange-300',
      count: 1,
      trend: '+0'
    },
  ];

  const stats = [
    { label: 'Total Tasks', value: '17', change: '+12%', icon: <MdDashboard />, color: 'bg-blue-500' },
    { label: 'Completed', value: '8', change: '+23%', icon: <FaChartLine />, color: 'bg-green-500' },
    { label: 'In Progress', value: '5', change: '+5%', icon: <IoIosTrendingUp />, color: 'bg-yellow-500' },
    { label: 'Overdue', value: '2', change: '-2%', icon: <MdNotifications />, color: 'bg-red-500' },
  ];

  // 🔐 Security check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const currentCategory =
    categories.find(cat => cat.path === location.pathname)?.name || 'All Tasks';

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-gray-900 dark:via-blue-950/10 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-linear-to-r from-blue-600 to-blue-700 rounded-xl">
                  <MdDashboard className="text-white text-xl" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Task Dashboard
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Organize, track, and complete your tasks efficiently
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              {/* Add Task Button */}
              <Link
                to={'/addtask'}
                className="group flex items-center justify-center gap-2 px-5 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                <MdAdd className="text-xl transition-transform group-hover:rotate-90" />
                <span className="font-semibold">New Task</span>
              </Link>

              {/* User Avatar */}
              <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                <FaUserCircle className="text-2xl text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 card-hover cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 ${stat.color} rounded-lg text-white`}>
                    {React.cloneElement(stat.icon, { size: 20 })}
                  </div>
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <HiOutlineViewGrid className="text-gray-500" />
                  Categories
                </h2>
                <button className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <MdFilterList className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-2">
                {categories.map(category => (
                  <Link
                    key={category.id}
                    to={category.path}
                    className={`group flex justify-between items-center p-3 rounded-xl transition-all duration-200 ${location.pathname === category.path
                      ? `${category.bgColor} border-l-4 ${category.textColor} border-l-${category.color.split('-')[1]}-500`
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border-l-4 border-transparent'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-linear-to-r ${category.color} text-white`}>
                        {React.cloneElement(category.icon, { size: 18 })}
                      </div>
                      <div>
                        <span className={`font-medium ${location.pathname === category.path
                          ? category.textColor
                          : 'text-gray-700 dark:text-gray-300'
                          }`}>
                          {category.name}
                        </span>
                        <div className="flex items-center gap-1 mt-1">
                          <span className={`text-xs ${category.trend.startsWith('+')
                            ? 'text-green-600'
                            : 'text-gray-500'
                            }`}>
                            {category.trend}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${location.pathname === category.path
                        ? category.textColor
                        : 'text-gray-600 dark:text-gray-400'
                        }`}>
                        {category.count}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Today's Tasks</span>
                    <MdCalendarToday className="text-gray-500" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Priority</span>
                    <FaBell className="text-yellow-500" />
                  </button>
                  <Link
                    to="#"
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">Settings</span>
                    <FaCog className="text-gray-500" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Main Content Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-linear-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {currentCategory}
                      <span className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                        {categories.find(cat => cat.path === location.pathname)?.count || 'All'} tasks
                      </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Manage and organize your {currentCategory.toLowerCase()} tasks
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <HiOutlineViewList className="text-gray-600 dark:text-gray-400 text-xl" />
                    </button>
                    <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <HiOutlineViewGrid className="text-gray-600 dark:text-gray-400 text-xl" />
                    </button>
                    <select className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Sort by: Date</option>
                      <option>Sort by: Priority</option>
                      <option>Sort by: Status</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 🔥 THIS IS THE MAGIC - Outlet */}
              <div className="p-6">
                <Outlet />
              </div>

              {/* Empty State (if needed) */}
              {!location.pathname.includes('/tasks/') && (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-linear-to-r from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiOutlineViewGrid className="text-3xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Select a Category
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Choose a category from the sidebar to view and manage your tasks.
                    Or create a new task to get started.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Tasks;