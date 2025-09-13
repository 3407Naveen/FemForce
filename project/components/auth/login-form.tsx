'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth, type UserRole } from '@/components/providers/auth-provider';
import { Shield, Activity, Heart } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('personnel');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password, selectedRole);
    if (!success) {
      setError('Invalid credentials. Use password: femforce123');
    }
  };

  const roles = [
    {
      value: 'personnel' as UserRole,
      label: 'Defense Personnel',
      description: 'Access personal health dashboard',
      icon: Shield
    },
    {
      value: 'medical' as UserRole,
      label: 'Medical Officer',
      description: 'Monitor personnel health data',
      icon: Heart
    },
    {
      value: 'commander' as UserRole,
      label: 'Commander/Admin',
      description: 'Full system access and analytics',
      icon: Activity
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center military-gradient p-4">
      <div className="w-full max-w-md">
        <Card className="glass-effect border-white/30 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">FemForce</CardTitle>
            <CardDescription className="text-gray-200">
              AI-Powered Defense Health Platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <p className="text-xs text-gray-300">Demo password: femforce123</p>
              </div>

              <div className="space-y-3">
                <Label className="text-white">Select Role</Label>
                <div className="grid gap-2">
                  {roles.map((role) => (
                    <div
                      key={role.value}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedRole === role.value
                          ? 'border-primary bg-primary/20'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedRole(role.value)}
                    >
                      <div className="flex items-center space-x-3">
                        <role.icon className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium text-white">{role.label}</div>
                          <div className="text-sm text-gray-300">{role.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <Alert className="bg-destructive/20 border-destructive/50 text-white">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}