import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';

const weeklyData = [
    { day: 'Mon', visits: 1200, sales: 450 },
    { day: 'Tue', visits: 1400, sales: 520 },
    { day: 'Wed', visits: 1600, sales: 680 },
    { day: 'Thu', visits: 1800, sales: 750 },
    { day: 'Fri', visits: 2100, sales: 890 },
    { day: 'Sat', visits: 1900, sales: 720 },
    { day: 'Sun', visits: 1500, sales: 580 },
];

const monthlyData = [
    { month: 'Jan', revenue: 4000, users: 240 },
    { month: 'Feb', revenue: 5500, users: 380 },
    { month: 'Mar', revenue: 7000, users: 520 },
    { month: 'Apr', revenue: 8500, users: 680 },
    { month: 'May', revenue: 11000, users: 890 },
    { month: 'Jun', revenue: 15000, users: 1200 },
];

export const Analytics = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Analytics</h1>
                <p className="text-muted-foreground mt-1">Detailed insights and metrics about your business</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Visits</p>
                                <p className="text-2xl font-bold">24,892</p>
                                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-full">
                                <TrendingUp className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Active Users</p>
                                <p className="text-2xl font-bold">3,421</p>
                                <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                                <p className="text-2xl font-bold">3.2%</p>
                                <p className="text-xs text-green-600 mt-1">↑ 0.5% from last month</p>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-full">
                                <DollarSign className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                                <p className="text-2xl font-bold">$187</p>
                                <p className="text-xs text-red-600 mt-1">↓ 3% from last month</p>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-full">
                                <ShoppingCart className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Traffic & Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="visits" stroke="#6366f1" name="Visits" />
                                <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#ec4899" name="Sales" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>User Growth & Revenue Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Bar yAxisId="left" dataKey="revenue" fill="#6366f1" name="Revenue ($)" />
                            <Bar yAxisId="right" dataKey="users" fill="#ec4899" name="Users" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};