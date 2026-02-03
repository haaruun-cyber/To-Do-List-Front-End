import React, { useState, useEffect } from 'react';
import { RiMenu4Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { FaRegSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdPerson } from "react-icons/io";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [userdata, setuserdata] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        currentuserdata();
    }, []);

    const handledarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    handledarkMode();

    const currentuserdata = () => {
        const usertoken = localStorage.getItem('token');
        if (!usertoken) return;
        try {
            const decoded = jwtDecode(usertoken);
            setuserdata(decoded);
        } catch (err) {
            console.error("Invalid token");
            localStorage.removeItem('token');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="sticky top-0 z-50 shadow-2xl">
            <nav className="bg-linear-to-r from-gray-800/95 to-gray-900/95 dark:from-gray-900/95 dark:to-gray-800/95 backdrop-blur-lg px-4 md:px-8 lg:px-12 py-4 transition-all duration-300 border-b border-gray-700/50">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-shadow duration-300">
                            <span className="text-white font-bold text-xl">✓</span>
                        </div>
                        <Link to="/" className="text-white text-2xl md:text-3xl font-bold tracking-tight hover:text-blue-300 transition-colors duration-200">
                            Task<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Flow</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            to="/"
                            className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200 font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/Tasks"
                            className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200 font-medium"
                        >
                            Tasks
                        </Link>
                        <Link
                            to="#"
                            className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200 font-medium"
                        >
                            About
                        </Link>
                        <Link
                            to="#"
                            className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200 font-medium"
                        >
                            Services
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/70 text-white transition-all duration-200 hover:scale-110"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <FaRegSun className="text-xl text-yellow-400" />
                            ) : (
                                <FaMoon className="text-xl text-blue-300" />
                            )}
                        </button>

                        {/* User Profile / Login */}
                        {userdata ? (
                            <div className="hidden md:flex items-center space-x-4">
                                <div className="flex items-center space-x-3 bg-gray-700/30 backdrop-blur-sm border border-gray-600/30 px-4 py-2 rounded-xl hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group">
                                    <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                        {userdata.username ? userdata.username.charAt(0).toUpperCase() : <IoMdPerson />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium text-sm capitalize">
                                            {userdata.username}
                                        </span>
                                        <span className="text-gray-400 text-xs truncate max-w-37.5">
                                            {userdata.email}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={logout}
                                    className="p-3 bg-linear-to-r from-red-500/20 to-red-600/30 border border-red-500/30 rounded-xl text-red-300 hover:text-white hover:bg-red-600/40 hover:border-red-400 transition-all duration-200 hover:scale-105"
                                    aria-label="Logout"
                                >
                                    <HiOutlineLogout className="text-xl" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to='/login'
                                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/25"
                            >
                                Get Started
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg bg-gray-700/50 text-white hover:bg-gray-600/70 transition-all duration-200"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <MdOutlineClose className="text-2xl" />
                            ) : (
                                <RiMenu4Fill className="text-2xl" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-linear-to-b from-gray-800/98 to-gray-900/98 dark:from-gray-900/98 dark:to-gray-800/98 backdrop-blur-xl border-t border-gray-700/50 shadow-2xl z-40 animate-slideDown">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col space-y-4">
                            <Link
                                to="/"
                                className="text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 font-medium flex items-center space-x-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>Home</span>
                            </Link>
                            <Link
                                to="/Tasks"
                                className="text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 font-medium flex items-center space-x-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Tasks</span>
                            </Link>
                            <Link
                                to="#"
                                className="text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 font-medium flex items-center space-x-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span>About</span>
                            </Link>
                            <Link
                                to="#"
                                className="text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 font-medium flex items-center space-x-3"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span>Services</span>
                            </Link>

                            {/* Mobile User Section */}
                            {userdata ? (
                                <div className="pt-4 mt-4 border-t border-gray-700/50">
                                    <div className="flex items-center space-x-3 bg-gray-700/30 backdrop-blur-sm border border-gray-600/30 px-4 py-3 rounded-xl">
                                        <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                                            {userdata.username ? userdata.username.charAt(0).toUpperCase() : <IoMdPerson />}
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <span className="text-white font-medium text-base capitalize">
                                                {userdata.username}
                                            </span>
                                            <span className="text-gray-400 text-sm truncate">
                                                {userdata.email}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full mt-3 flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-red-500/20 to-red-600/30 border border-red-500/30 rounded-xl text-red-300 hover:text-white hover:bg-red-600/40 transition-all duration-200"
                                    >
                                        <HiOutlineLogout className="text-xl" />
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to='/login'
                                    className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign In to Continue
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;