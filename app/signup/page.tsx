// app/signup/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getRegisteredUsers, saveRegisteredUsers, saveCurrentUser, getCurrentUser, User } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [provider, setProvider] = useState('Email/Password');

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      router.replace('/home');
    }

    const paramEmail = searchParams.get('email');
    const paramProvider = searchParams.get('provider');

    if (paramEmail) {
      setEmail(paramEmail);
    }
    if (paramProvider) {
      setProvider(paramProvider);
    }
  }, [router, searchParams]);

  const handleSignup = () => {
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const users = getRegisteredUsers();
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      setError('An account with this email already exists. Please log in.');
      router.push('/login?email=' + encodeURIComponent(email));
      return;
    }

    const newUser: User = { name, email, password, provider: provider };
    saveRegisteredUsers([...users, newUser]);
    saveCurrentUser(newUser);
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50 d-flex flex-column">
      {/* Header */}
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-black">ChatGPT</h1>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center px-3">
        <div className="w-100 max-w-md space-y-4">
          {/* Title and Description */}
          <div className="text-center mb-4">
            <h2 className="text-3xl font-normal text-black">Sign Up</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Create your account to get smarter responses.
            </p>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="d-flex flex-column gap-3">
            <div className="position-relative">
              <Input
                type="text"
                placeholder="Your Name"
                className="input-login w-full h-12 px-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="position-relative">
              <Input
                type="email"
                placeholder="Email address"
                className="input-login w-full h-12 px-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!!searchParams.get('email')}
              />
            </div>
            <div className="position-relative">
              <Input
                type="password"
                placeholder="Password"
                className="input-login w-full h-12 px-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="position-relative">
              <Input
                type="password"
                placeholder="Confirm Password"
                className="input-login w-full h-12 px-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              className="w-full h-12 btn-black rounded-full font-medium transition-colors"
              onClick={handleSignup}
            >
              Sign Up
            </Button>
            <Button
                variant="link"
                className="w-full text-blue-600"
                onClick={() => router.push('/login')}
              >
                Already have an account? Log In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}