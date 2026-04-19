import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Menu,
    X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

const menuItems = [
    { path: '/', name: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'user'] },
    { path: '/users', name: 'Users', icon: Users, roles: ['admin'] },
    { path: '/orders', name: 'Orders', icon: ShoppingCart, roles: ['admin', 'user'] },
    { path: '/analytics', name: 'Analytics', icon: BarChart3, roles: ['admin'] },
    { path: '/settings', name: 'Settings', icon: Settings, roles: ['admin', 'user'] },
];

export const Sidebar = ({ collapsed, setCollapsed }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const userRole = user?.role || 'user';

    // Close mobile sidebar on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [location]);

    // Handle resize to reset mobile state
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

    // Sidebar content
    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo Area */}
            <div className="flex items-center justify-between p-4 border-b border-border min-h-[73px]">
                <AnimatePresence mode="wait">
                    {(!collapsed || isHovered) && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-2 overflow-hidden"
                        >
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                                <span className="text-primary-foreground font-bold text-lg">V</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent whitespace-nowrap">
                                VisionBoard
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Collapse Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex ml-auto hover:bg-accent transition-all duration-200"
                >
                    <motion.div
                        animate={{ rotate: collapsed ? 0 : 180 }}
                        transition={{ duration: 0.3 }}
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </motion.div>
                </Button>

                {/* Mobile Close Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileOpen(false)}
                    className="lg:hidden ml-auto"
                >
                    <X size={20} />
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
                <div className="space-y-1 px-3">
                    {filteredMenuItems.map((item, index) => (
                        <motion.div
                            key={item.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <NavLink
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && setIsMobileOpen(false)}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-md"
                                            : "text-muted-foreground",
                                        collapsed && !isHovered && "justify-center"
                                    )
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <item.icon
                                                size={20}
                                                className={cn(
                                                    "transition-all duration-200",
                                                    isActive && "scale-110"
                                                )}
                                            />
                                        </motion.div>

                                        <AnimatePresence mode="wait">
                                            {(!collapsed || isHovered) && (
                                                <motion.span
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: 'auto' }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-sm whitespace-nowrap overflow-hidden"
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>

                                        {/* Tooltip for collapsed state */}
                                        {collapsed && !isHovered && (
                                            <div className="absolute left-full ml-2 px-2 py-1.5 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 whitespace-nowrap shadow-lg">
                                                {item.name}
                                            </div>
                                        )}

                                        {/* Active Indicator */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </motion.div>
                    ))}
                </div>
            </nav>

            {/* Footer - Logout Button */}
            <div className="p-4 border-t border-border mt-auto">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button
                        variant="ghost"
                        onClick={logout}
                        className={cn(
                            "w-full transition-all duration-200 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                            collapsed && !isHovered ? "justify-center px-2" : "justify-start gap-3"
                        )}
                    >
                        <LogOut size={20} />
                        <AnimatePresence>
                            {(!collapsed || isHovered) && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="whitespace-nowrap"
                                >
                                    Logout
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Button>
                </motion.div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(true)}
                className="fixed bottom-4 right-4 z-50 lg:hidden shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 w-12"
            >
                <Menu size={24} />
            </Button>

            {/* Desktop Sidebar */}
            <motion.aside
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                animate={{
                    width: collapsed && !isHovered ? 80 : 280
                }}
                className="fixed left-0 top-0 h-full bg-card border-r border-border z-30 hidden lg:block overflow-hidden"
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
                <SidebarContent />
            </motion.aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 w-72 h-full bg-card border-r border-border z-50 lg:hidden shadow-2xl"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};