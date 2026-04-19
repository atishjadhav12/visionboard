import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { cn } from '../../lib/utils';

export const Layout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
            <Navbar sidebarCollapsed={sidebarCollapsed} />
            <main className={cn(
                "transition-all duration-300 pt-16 pl-0",
                sidebarCollapsed ? "lg:pl-20" : "lg:pl-72"
            )}>
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};