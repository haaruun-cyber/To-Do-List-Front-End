import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaChartLine,
  FaUsers,
  FaRocket,
  FaArrowRight,
  FaClipboardCheck,
  FaBell,
  FaStar,
  FaMobileAlt,
  FaSync,
  FaLock
} from 'react-icons/fa';
import {
  MdDashboard,
  MdTimer,
  MdTrendingUp,
  MdWorkspaces
} from 'react-icons/md';
import { GiAchievement, GiProgression } from "react-icons/gi";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    tasks: 0,
    completed: 0,
    productivity: 75
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // You can fetch user data here
      setUser({
        name: 'John Doe',
        email: 'john@example.com'
      });
      setStats({
        tasks: 42,
        completed: 28,
        productivity: 85
      });
    }
  }, []);

  const features = [
    {
      icon: <MdDashboard className="text-3xl" />,
      title: "Smart Dashboard",
      description: "Get an overview of all your tasks in one place with intelligent categorization.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: <FaCalendarAlt className="text-3xl" />,
      title: "Smart Scheduling",
      description: "Plan your tasks with our intelligent calendar and reminder system.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: "Progress Tracking",
      description: "Visualize your productivity with detailed charts and analytics.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Team Collaboration",
      description: "Share tasks and collaborate with your team members seamlessly.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      content: "TaskFlow transformed how our team manages projects. Productivity increased by 40%!",
      avatar: "SJ",
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      content: "The clean interface and powerful features make task management a breeze.",
      avatar: "MC",
      color: "bg-green-100 text-green-800"
    },
    {
      name: "Emma Wilson",
      role: "Student",
      content: "Perfect for organizing study materials and personal tasks. Highly recommend!",
      avatar: "EW",
      color: "bg-purple-100 text-purple-800"
    }
  ];

  const quickStats = [
    { label: "Tasks Completed Today", value: "12", icon: <FaCheckCircle />, change: "+3", trend: "up" },
    { label: "Active Projects", value: "5", icon: <MdWorkspaces />, change: "+1", trend: "up" },
    { label: "Team Members", value: "8", icon: <FaUsers />, change: "+2", trend: "up" },
    { label: "Productivity Score", value: "85%", icon: <MdTrendingUp />, change: "+5%", trend: "up" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-100 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 animate-gradient"></div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm font-medium">
                <FaRocket className="animate-pulse" />
                <span>Boost Your Productivity</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Organize Your Work &
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                Boost Productivity
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              TaskFlow is your all-in-one solution for task management. From personal to-dos to team projects,
              we help you stay organized and achieve more every day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Link
                    to="/tasks"
                    className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-blue-500/25"
                  >
                    Go to Dashboard
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/addtask"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold text-lg"
                  >
                    Add New Task
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-blue-500/25"
                  >
                    Get Started Free
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold text-lg"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Stats Bar */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${stat.trend === 'up' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}>
                      {stat.icon}
                    </div>
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to <span className="text-blue-600 dark:text-blue-400">Stay Productive</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to help you organize, track, and complete tasks efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.bgColor} rounded-2xl p-6 border border-gray-200 dark:border-gray-700 card-hover group cursor-pointer`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-linear-to-r ${feature.color} text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {feature.description}
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  <span>Learn more</span>
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How <span className="text-blue-600 dark:text-blue-400">TaskFlow</span> Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Simple steps to transform your productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Tasks",
                description: "Add tasks with categories, priorities, and deadlines.",
                icon: <FaClipboardCheck className="text-4xl" />
              },
              {
                step: "02",
                title: "Organize & Track",
                description: "Categorize tasks and track progress with visual indicators.",
                icon: <GiProgression className="text-4xl" />
              },
              {
                step: "03",
                title: "Achieve Goals",
                description: "Complete tasks and celebrate your productivity wins.",
                icon: <GiAchievement className="text-4xl" />
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="text-6xl font-bold text-gray-200 dark:text-gray-700 mb-4">{step.step}</div>
                  <div className="p-3 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white inline-flex mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-0.5 bg-linear-to-r from-blue-500 to-purple-500"></div>
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                      <FaArrowRight className="text-blue-500" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by <span className="text-blue-600 dark:text-blue-400">Thousands</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See what our users say about their experience with TaskFlow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 card-hover cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${testimonial.color}`}>
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of users who have already improved their task management with TaskFlow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/tasks"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  Start Free Trial
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-200 font-semibold text-lg"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center gap-3 text-white">
              <FaMobileAlt className="text-2xl" />
              <span className="font-medium">Mobile Friendly</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <FaLock className="text-2xl" />
              <span className="font-medium">Secure & Private</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <FaSync className="text-2xl" />
              <span className="font-medium">Real-time Sync</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <FaBell className="text-2xl" />
              <span className="font-medium">Smart Reminders</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold">TaskFlow</h2>
              </div>
              <p className="text-gray-400">Organize your work, boost your productivity.</p>
            </div>

            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/service" className="text-gray-400 hover:text-white transition-colors">
                Services
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ for productive people everywhere</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;