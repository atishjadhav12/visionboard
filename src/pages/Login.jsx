import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import toast from 'react-hot-toast';
import { Sparkles } from 'lucide-react';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            login(email, password, role);
            toast.success(`Welcome back! Logged in as ${role}`);
            navigate('/');
        } else {
            toast.error('Please fill in all fields');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Sparkles className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">VisionBoard Dashboard</CardTitle>
                    <CardDescription>Sign in to access your admin dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Email</label>
                            <Input
                                type="email"
                                placeholder="admin@insightx.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Role (Demo)</label>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant={role === 'admin' ? 'default' : 'outline'}
                                    onClick={() => setRole('admin')}
                                    className="flex-1"
                                >
                                    Admin
                                </Button>
                                <Button
                                    type="button"
                                    variant={role === 'user' ? 'default' : 'outline'}
                                    onClick={() => setRole('user')}
                                    className="flex-1"
                                >
                                    User
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                {role === 'admin' ? 'Full access to all features' : 'Limited access (Users page hidden)'}
                            </p>
                        </div>
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                        <p>Demo Credentials:</p>
                        <p>Any email </p>
                        <Badge variant="outline" className="mt-2">Admin Role: Full Access</Badge>
                        <Badge variant="outline" className="mt-2 ml-2">User Role: Limited Access</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};