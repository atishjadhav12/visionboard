import React, { useEffect, useState } from 'react';
import {
    Users,
    DollarSign,
    ShoppingBag,
    TrendingUp,
    ArrowUp,
    ArrowDown,
    Activity,
    Calendar,
    Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, loading }) => {
    if (loading) {
        return (
            <Card className="overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                    <Skeleton className="h-4 w-20 sm:w-24 mb-2" />
                    <Skeleton className="h-7 sm:h-8 w-24 sm:w-32 mb-2" />
                    <Skeleton className="h-3 w-16 sm:w-20" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    {trend && (
                        <Badge
                            variant={trend === 'up' ? 'success' : 'destructive'}
                            className="gap-0.5 sm:gap-1 text-xs sm:text-xs"
                        >
                            {trend === 'up' ? <ArrowUp size={10} className="sm:w-3 sm:h-3" /> : <ArrowDown size={10} className="sm:w-3 sm:h-3" />}
                            <span>{trendValue}%</span>
                        </Badge>
                    )}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-0.5 sm:mb-1">
                    {value}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {title}
                </p>
            </CardContent>
        </Card>
    );
};

const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Purchased Premium Plan', date: '2 minutes ago', status: 'completed', time: '14:30' },
    { id: 2, user: 'Jane Smith', action: 'Updated profile', date: '1 hour ago', status: 'pending', time: '13:15' },
    { id: 3, user: 'Mike Johnson', action: 'Canceled subscription', date: '3 hours ago', status: 'cancelled', time: '11:45' },
    { id: 4, user: 'Sarah Williams', action: 'New order #12345', date: '5 hours ago', status: 'completed', time: '09:30' },
    { id: 5, user: 'David Brown', action: 'Added new payment method', date: '1 day ago', status: 'completed', time: 'Yesterday' },
];

const userGrowthData = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1900 },
    { month: 'Mar', users: 2400 },
    { month: 'Apr', users: 2800 },
    { month: 'May', users: 3500 },
    { month: 'Jun', users: 4200 },
];

const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 5500 },
    { month: 'Mar', revenue: 7000 },
    { month: 'Apr', revenue: 8500 },
    { month: 'May', revenue: 11000 },
    { month: 'Jun', revenue: 15000 },
];

const categoryData = [
    { name: 'SaaS', value: 45, color: '#6366f1' },
    { name: 'Consulting', value: 25, color: '#8b5cf6' },
    { name: 'Support', value: 20, color: '#ec4899' },
    { name: 'Training', value: 10, color: '#f43f5e' },
];

export const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [visibleActivities, setVisibleActivities] = useState(3);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // Responsive table row count
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleActivities(2);
            } else if (window.innerWidth < 768) {
                setVisibleActivities(3);
            } else {
                setVisibleActivities(5);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const displayedActivities = recentActivity.slice(0, visibleActivities);

    // Custom tooltip for charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover text-popover-foreground p-2 sm:p-3 rounded-lg shadow-lg border border-border text-xs sm:text-sm">
                    <p className="font-semibold mb-1">{label}</p>
                    {payload.map((p, index) => (
                        <p key={index} className="text-muted-foreground">
                            {p.name}: {p.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Welcome back! Here's what's happening with your business.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden xs:inline">This Month</span>
                        <span className="xs:hidden">Month</span>
                    </Button>
                    <Button size="sm" className="text-xs sm:text-sm">
                        <Activity className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden xs:inline">Export Report</span>
                        <span className="xs:hidden">Export</span>
                    </Button>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <StatCard title="Total Users" value="12,345" icon={Users} trend="up" trendValue="12" loading={loading} />
                <StatCard title="Revenue" value="$54,239" icon={DollarSign} trend="up" trendValue="23" loading={loading} />
                <StatCard title="Orders" value="1,234" icon={ShoppingBag} trend="down" trendValue="5" loading={loading} />
                <StatCard title="Growth" value="+24%" icon={TrendingUp} trend="up" trendValue="8" loading={loading} />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="overflow-hidden">
                    <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                        <CardTitle className="text-lg sm:text-xl">User Growth</CardTitle>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Monthly active users trend
                        </p>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                        {loading ? (
                            <Skeleton className="h-[250px] sm:h-[300px] w-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={userGrowthData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fontSize: 12 }}
                                        interval={0}
                                        angle={-45}
                                        textAnchor="end"
                                        height={50}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={(value) => `${value / 1000}k`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                                    <Line
                                        type="monotone"
                                        dataKey="users"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        dot={{ r: 3 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                <Card className="overflow-hidden">
                    <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                        <CardTitle className="text-lg sm:text-xl">Revenue Overview</CardTitle>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Monthly revenue in USD
                        </p>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                        {loading ? (
                            <Skeleton className="h-[250px] sm:h-[300px] w-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fontSize: 12 }}
                                        interval={0}
                                        angle={-45}
                                        textAnchor="end"
                                        height={50}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                                    <Bar
                                        dataKey="revenue"
                                        fill="#6366f1"
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={50}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="overflow-hidden">
                    <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                        <CardTitle className="text-lg sm:text-xl">Category Distribution</CardTitle>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Revenue by product category
                        </p>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                        {loading ? (
                            <Skeleton className="h-[250px] sm:h-[300px] w-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => {
                                            const percentage = (percent * 100).toFixed(0);
                                            return window.innerWidth < 640 ? `${percentage}%` : `${name} ${percentage}%`;
                                        }}
                                        outerRadius={window.innerWidth < 640 ? 60 : 80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                <Card className="overflow-hidden">
                    <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                        <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Latest user actions and updates
                        </p>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        {loading ? (
                            <div className="space-y-2 p-4 sm:p-0">
                                <Skeleton className="h-12 sm:h-14 w-full" />
                                <Skeleton className="h-12 sm:h-14 w-full" />
                                <Skeleton className="h-12 sm:h-14 w-full" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-xs sm:text-sm">User</TableHead>
                                            <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Action</TableHead>
                                            <TableHead className="text-xs sm:text-sm">Date</TableHead>
                                            <TableHead className="text-xs sm:text-sm">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {displayedActivities.map((activity) => (
                                            <TableRow key={activity.id} className="hover:bg-muted/50">
                                                <TableCell className="font-medium text-xs sm:text-sm py-2 sm:py-3">
                                                    {activity.user}
                                                </TableCell>
                                                <TableCell className="text-xs sm:text-sm hidden sm:table-cell py-2 sm:py-3">
                                                    <span className="truncate max-w-[150px] block">
                                                        {activity.action}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-xs sm:text-sm py-2 sm:py-3">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                                        <span>{activity.date}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-2 sm:py-3">
                                                    <Badge
                                                        variant={
                                                            activity.status === 'completed'
                                                                ? 'success'
                                                                : activity.status === 'pending'
                                                                    ? 'warning'
                                                                    : 'destructive'
                                                        }
                                                        className="text-[10px] sm:text-xs px-1.5 sm:px-2"
                                                    >
                                                        {activity.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                        {!loading && recentActivity.length > visibleActivities && (
                            <div className="p-4 border-t border-border">
                                <Button variant="ghost" size="sm" className="w-full text-xs sm:text-sm">
                                    View All Activity
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};