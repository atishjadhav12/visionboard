import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Sun, Moon, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import toast from 'react-hot-toast';

export const Navbar = ({ sidebarCollapsed }) => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const searchInputRef = useRef(null);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Focus search input when opened on mobile
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            toast.success(`Searching for: ${searchQuery}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        } else {
            toast.error('Please enter a search term');
        }
    };

    const handleNotification = () => {
        toast.success('No new notifications');
    };

    return (
        <>
            {/* Mobile Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/95 backdrop-blur-md z-10 lg:hidden"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            className="p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                <Input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-12 h-12 text-base"
                                    autoFocus
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setIsSearchOpen(false)}
                                >
                                    <X size={18} />
                                </Button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                className={`
                    fixed right-0 top-0 bg-background/95 backdrop-blur-md 
                    border-b border-border z-0 transition-all duration-300
                    ${sidebarCollapsed ? 'lg:left-20' : 'lg:left-72'}
                    left-0
                    ${scrolled ? 'shadow-lg' : ''}
                `}
            >
                <div className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3">
                    {/* Search - Desktop */}
                    <form onSubmit={handleSearch} className="hidden lg:block flex-1 max-w-md">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-primary" />
                            <Input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </form>

                    {/* Mobile Search Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search size={20} />
                    </Button>

                    {/* Right Section */}
                    <div className="flex items-center gap-1 sm:gap-2 ml-auto lg:ml-0">
                        {/* Notifications */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleNotification}
                                className="relative"
                            >
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-background" />
                            </Button>
                        </motion.div>

                        {/* Theme Toggle */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button variant="ghost" size="icon" onClick={toggleTheme}>
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: theme === 'light' ? 0 : 180 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                                </motion.div>
                            </Button>
                        </motion.div>

                        {/* User Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        variant="ghost"
                                        className="gap-2 px-2 sm:px-3 hover:bg-accent transition-colors"
                                    >
                                        {user?.avatar ? (
                                            <motion.img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="h-8 w-8 rounded-full ring-2 ring-primary/20"
                                                whileHover={{ ring: true }}
                                            />
                                        ) : (
                                            <motion.div
                                                className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <User size={16} className="text-primary-foreground" />
                                            </motion.div>
                                        )}
                                        <span className="hidden sm:inline text-sm font-medium">
                                            {user?.name?.split(' ')[0] || 'User'}
                                        </span>
                                    </Button>
                                </motion.div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-2">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer transition-colors">
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer transition-colors">
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={logout}
                                    className="cursor-pointer text-red-600 focus:text-red-600 transition-colors"
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </motion.header>

            {/* Spacer to prevent content from going under navbar */}
            <div className="h-14 sm:h-16" />
        </>
    );
};