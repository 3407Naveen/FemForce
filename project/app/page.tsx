'use client';

import { useAuth } from '@/components/providers/auth-provider';
import LoginForm from '@/components/auth/login-form';
import MainLayout from '@/components/layout/main-layout';

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return <MainLayout />;
}