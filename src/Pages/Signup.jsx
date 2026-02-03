import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

const Signup = () => {
    const [formData, setFormData] = useState({ 
        username: '', 
        email: '', 
        password: '' 
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
        
        // Check password strength
        if (name === 'password') {
            const strength = calculatePasswordStrength(value);
            setPasswordStrength(strength);
        }
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const getPasswordStrengthColor = (strength) => {
        switch(strength) {
            case 0: return 'bg-gray-200';
            case 1: return 'bg-red-500';
            case 2: return 'bg-orange-500';
            case 3: return 'bg-yellow-500';
            case 4: return 'bg-green-500';
            default: return 'bg-gray-200';
        }
    };

    const getPasswordStrengthText = (strength) => {
        switch(strength) {
            case 0: return 'Very Weak';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!agreedToTerms) {
            toast.error("Please agree to the Terms & Conditions");
            return;
        }

        if (passwordStrength < 2) {
            toast.error("Please choose a stronger password");
            return;
        }

        setIsLoading(true);
        
        try {
            const url = import.meta.env.VITE_API_URL + '/api/users/register';
            const { data } = await axios.post(url, formData);
            
            if(data.status === true){
                toast.success(data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleQuickFill = () => {
        setFormData({
            username: 'john_doe',
            email: 'john@example.com',
            password: 'SecurePass123!'
        });
        setPasswordStrength(4);
        toast.success("Demo credentials filled!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
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
            
            <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl">
                {/* Left Side - Illustration/Info */}
                <div className="md:w-1/2 bg-linear-to-br from-purple-600 to-pink-700 p-8 md:p-12 flex flex-col justify-between text-white">
                    <div>
                        <div className="flex items-center space-x-2 mb-8">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl font-bold">✓</span>
                            </div>
                            <h1 className="text-2xl font-bold">TaskFlow</h1>
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Join Our Community
                        </h2>
                        <p className="text-purple-100 mb-8">
                            Create your account and start organizing your tasks efficiently.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <FaCheck className="text-sm" />
                                </div>
                                <span>Unlimited tasks and projects</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <FaCheck className="text-sm" />
                                </div>
                                <span>Priority support 24/7</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <FaCheck className="text-sm" />
                                </div>
                                <span>Advanced analytics dashboard</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <FaCheck className="text-sm" />
                                </div>
                                <span>Cross-platform synchronization</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <p className="text-purple-200 text-sm">
                            Already have an account?
                        </p>
                        <Link 
                            to="/login" 
                            className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200"
                        >
                            <span>Sign in here</span>
                            <span className="text-sm">→</span>
                        </Link>
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="md:w-1/2 bg-white dark:bg-gray-800 p-8 md:p-12">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-purple-500 to-pink-600 rounded-2xl mb-4">
                            <FaUserPlus className="text-white text-3xl" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Create Your Account
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Fill in your details to get started
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <FaUser className="text-gray-500" />
                                <span>Username</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="john_doe"
                                    required
                                    className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <FaUser className="text-gray-400" />
                                </div>
                            </div>
                        </div>

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
                                    className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
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
                                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
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
                                    className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
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
                            
                            {/* Password Strength */}
                            {formData.password && (
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                                        <span>Password Strength:</span>
                                        <span className={`font-medium ${
                                            passwordStrength >= 3 ? 'text-green-600' : 
                                            passwordStrength >= 2 ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                            {getPasswordStrengthText(passwordStrength)}
                                        </span>
                                    </div>
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div 
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                                    level <= passwordStrength 
                                                        ? getPasswordStrengthColor(passwordStrength)
                                                        : 'bg-gray-200 dark:bg-gray-700'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mt-2">
                                        <li className={`flex items-center gap-1 ${
                                            formData.password.length >= 8 ? 'text-green-600' : ''
                                        }`}>
                                            <FaCheck className={`text-xs ${formData.password.length >= 8 ? 'opacity-100' : 'opacity-30'}`} />
                                            At least 8 characters
                                        </li>
                                        <li className={`flex items-center gap-1 ${
                                            /[A-Z]/.test(formData.password) ? 'text-green-600' : ''
                                        }`}>
                                            <FaCheck className={`text-xs ${/[A-Z]/.test(formData.password) ? 'opacity-100' : 'opacity-30'}`} />
                                            One uppercase letter
                                        </li>
                                        <li className={`flex items-center gap-1 ${
                                            /[0-9]/.test(formData.password) ? 'text-green-600' : ''
                                        }`}>
                                            <FaCheck className={`text-xs ${/[0-9]/.test(formData.password) ? 'opacity-100' : 'opacity-30'}`} />
                                            One number
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Terms & Conditions */}
                        <div className="space-y-2">
                            <label className="flex items-start space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 mt-1"
                                />
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    <p>
                                        I agree to the{' '}
                                        <Link to="/terms" className="text-purple-600 dark:text-purple-400 hover:underline">
                                            Terms & Conditions
                                        </Link>
                                        {' '}and{' '}
                                        <Link to="/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                                        By creating an account, you agree to our terms and acknowledge our privacy practices.
                                    </p>
                                </div>
                            </label>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !agreedToTerms}
                            className="w-full py-3.5 bg-linear-to-r from-purple-600 to-pink-700 text-white rounded-xl hover:from-purple-700 hover:to-pink-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <FaUserPlus />
                                    Create Account
                                </>
                            )}
                        </button>

                        {/* Quick Fill Button */}
                        <button
                            type="button"
                            onClick={handleQuickFill}
                            className="w-full py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
                        >
                            Fill Demo Credentials
                        </button>

                        {/* Login Link */}
                        <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link 
                                    to="/login" 
                                    className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                                >
                                    Log in here
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Security Note */}
                    <div className="mt-6 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                            🔐 Your information is secure and encrypted. We never share your personal data.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;