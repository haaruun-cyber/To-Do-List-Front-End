import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { FaEye, FaEyeSlash, FaSignInAlt, FaUserCircle, FaLock, FaEnvelope } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = import.meta.env.VITE_API_URL + '/api/users/login';
            const { data } = await axios.post(url, formData);

            if (data.status === true) {
                toast.success(data.message);
                localStorage.setItem('token', data.token);

                // Remember me functionality
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', formData.email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

                setTimeout(() => {
                    // window.location.reload();
                    navigate('/');
                }, 1500);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    const securityCheck = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        } else {
            // Check for remembered email
            const rememberedEmail = localStorage.getItem('rememberedEmail');
            if (rememberedEmail) {
                setFormData(prev => ({ ...prev, email: rememberedEmail }));
                setRememberMe(true);
            }
        }
    };

    useEffect(() => {
        securityCheck();
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleDemoLogin = () => {
        // Demo credentials for testing
        setFormData({
            email: 'demo@example.com',
            password: 'demo123'
        });
        toast.success("Demo credentials filled! Click Login to continue.");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-800 p-4 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

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

            <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm relative z-10 animate-scaleIn">
                {/* Left Side - Illustration/Info */}
                <div className="md:w-1/2 bg-linear-to-br from-blue-600 to-indigo-700 p-8 md:p-12 flex flex-col justify-between text-white">
                    <div>
                        <div className="flex items-center space-x-2 mb-8">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl font-bold">✓</span>
                            </div>
                            <h1 className="text-2xl font-bold">TaskFlow</h1>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Welcome Back!
                        </h2>
                        <p className="text-blue-100 mb-8">
                            Sign in to manage your tasks, boost productivity, and achieve your goals.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-sm">✓</span>
                                </div>
                                <span>Manage unlimited tasks</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-sm">✓</span>
                                </div>
                                <span>Track progress visually</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-sm">✓</span>
                                </div>
                                <span>Sync across devices</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="text-blue-200 text-sm">
                            Join thousands of productive users today
                        </p>
                        <div className="flex -space-x-2 mt-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full border-2 border-blue-600 bg-linear-to-r from-blue-400 to-blue-300 flex items-center justify-center text-xs font-bold"
                                >
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="md:w-1/2 bg-white dark:bg-gray-800 p-8 md:p-12">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4">
                            <FaUserCircle className="text-white text-3xl" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Sign In to Your Account
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Enter your credentials to continue
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <FaEnvelope className="text-gray-500" />
                                <span>Email Address</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <FaLock className="text-gray-500" />
                                    <span>Password</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <FaSignInAlt />
                                    Sign In
                                </>
                            )}
                        </button>

                        {/* Demo Login Button */}
                        <button
                            type="button"
                            onClick={handleDemoLogin}
                            className="w-full py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                        >
                            <span className="text-sm">Try Demo Account</span>
                        </button>

                        {/* Sign Up Link */}
                        <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-400">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Security Note */}
                    <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                            🔒 Your data is securely encrypted and protected.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;