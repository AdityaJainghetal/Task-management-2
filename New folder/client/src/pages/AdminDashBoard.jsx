import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { 
  FiUserPlus, 
  FiClipboard, 
  FiList, 
  FiLogOut, 
  FiChevronRight,
  FiHome,
  FiMenu,
  FiSettings
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashBoard = () => {
    const [adminname, setAdminname] = useState("");
    const [activeLink, setActiveLink] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem("adminname");
        if (!storedName) {
            navigate("/home"); 
        } else {
            setAdminname(storedName);
            setActiveLink(window.location.pathname.split('/').pop());
        }

        // Check if mobile
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, [navigate]);

    const Logout = () => {
        localStorage.clear();
        navigate("/home");
    };

    const navLinks = [
        { path: "createuser", name: "Create User", icon: <FiUserPlus className="text-xl" /> },
        { path: "assigntask", name: "Assign Task", icon: <FiClipboard className="text-xl" /> },
        { path: "displaytask", name: "Display Task", icon: <FiList className="text-xl" /> },
        
    ];

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar Backdrop (Mobile) */}
            <AnimatePresence>
                {isMobile && sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div 
                className={`fixed md:relative z-30 h-full bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl transition-all duration-300 ease-in-out ${
                    sidebarOpen ? 'w-64' : 'w-20'
                }`}
                initial={{ x: isMobile ? -300 : 0 }}
                animate={{ x: sidebarOpen ? 0 : (isMobile ? -300 : 0) }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="p-4 text-white text-lg font-bold border-b border-gray-700 flex items-center justify-between">
                        {sidebarOpen ? (
                            <motion.span 
                                className="whitespace-nowrap"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                Welcome, {adminname}
                            </motion.span>
                        ) : (
                            <span className="text-2xl">👋</span>
                        )}
                        <button 
                            onClick={toggleSidebar}
                            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                        >
                            <FiChevronRight className={`text-white transition-transform duration-300 ${
                                !sidebarOpen ? 'rotate-180' : ''
                            }`} />
                        </button>
                    </div>
                    
                    {/* Sidebar Content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {/* Home Link */}
                       

                        {/* Navigation Links */}
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path}
                                to={link.path}
                                className={`flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${
                                    activeLink === link.path ? 
                                    'bg-blue-600 text-white shadow-md' : 
                                    'text-gray-300 hover:bg-gray-700 hover:shadow-md'
                                }`}
                                onClick={() => setActiveLink(link.path)}
                            >
                                {link.icon}
                                {sidebarOpen && (
                                    <motion.span 
                                        className="ml-3 whitespace-nowrap"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {link.name}
                                    </motion.span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-gray-700">
                        <button 
                            onClick={Logout}
                            className={`flex items-center justify-center w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg hover:shadow-md transition-all duration-300 ${
                                sidebarOpen ? 'px-4' : 'px-2'
                            }`}
                        >
                            <FiLogOut className="text-xl" />
                            {sidebarOpen && <span className="ml-3">Logout</span>}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className={`flex-1 overflow-auto transition-all duration-300 ${
                sidebarOpen && !isMobile ? 'ml-64' : 'ml-20'
            }`}>
                {/* Mobile Header */}
                <div className="md:hidden bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">
                    <button 
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-gray-700"
                    >
                        <FiMenu className="h-5 w-5" />
                    </button>
                    <h1 className="text-xl font-semibold">
                        {navLinks.find(link => link.path === activeLink)?.name || 'Dashboard'}
                    </h1>
                    <div className="w-8"></div> {/* Spacer for alignment */}
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                    <motion.div 
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-4 md:p-6">
                            <Outlet />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashBoard;