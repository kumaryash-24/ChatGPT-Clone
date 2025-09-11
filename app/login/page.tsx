// app/login/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';        
import { useEffect, useState } from 'react';
import { getRegisteredUsers, getCurrentUser, saveCurrentUser, User } from '@/lib/auth';         
                      
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');               
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginFlow, setIsLoginFlow] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      router.replace('/home');
    }
  }, [router]);

  const handleEmailContinue = () => {
    setError('');
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    const users = getRegisteredUsers();
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      setIsLoginFlow(true);
    } else {
      router.push(`/signup?email=${encodeURIComponent(email)}`);
    }
  };

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    const users = getRegisteredUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      saveCurrentUser(user);
      router.push('/home');
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleSocialButtonClick = (provider: string) => {
    router.push(`/signup?provider=${encodeURIComponent(provider)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 d-flex flex-column">
      {/* Header */}
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-black">ChatGPT</h1>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center px-3">
        <div className="w-100 max-w-md space-y-4"> {/* space-y-4 for vertical spacing */}
          {/* Title and Description */}
          <div className="text-center mb-4">
            <h2 className="text-3xl font-normal text-black">Log in or sign up</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {"You'll get smarter responses and can upload"}
              <br />
              {"files, images, and more."}
            </p>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {!isLoginFlow ? (
            <div className="d-flex flex-column gap-3"> {/* Use gap for spacing */}
              <div className="position-relative">
                <Input
                  type="email"
                  placeholder="Email address"
                  className="input-login w-full h-12 px-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                className="w-full h-12 btn-black rounded-full font-medium transition-colors"
                onClick={handleEmailContinue}
              >
                Continue
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              <p className="text-center text-gray-700">Continue as <span className="font-semibold">{email}</span></p>
              <div className="position-relative">
                <Input
                  type="password"
                  placeholder="Password"
                  className="input-login w-full h-12 px-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                className="w-full h-12 btn-black rounded-full font-medium transition-colors"
                onClick={handleLogin}
              >
                Log In
              </Button>
              <Button
                variant="link"
                className="w-full text-blue-600"
                onClick={() => {
                  setEmail('');
                  setPassword('');
                  setIsLoginFlow(false);
                  setError('');
                }}
              >
                Not {email}? Change account
              </Button>
            </div>
          )}


          {!isLoginFlow && (
            <>
              <div className="d-flex align-items-center justify-content-center py-2">
                <span className="text-gray-500 font-medium text-sm">OR</span>
              </div>

              <div className="d-flex flex-column gap-3">
                <Button
                  variant="outline"
                  className="w-full h-12 btn-outline-custom rounded-full font-medium d-flex align-items-center justify-content-start px-4 gap-3 transition-colors"
                  onClick={() => handleSocialButtonClick('Google')}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 btn-outline-custom rounded-full font-medium d-flex align-items-center justify-content-start px-4 gap-3 transition-colors"
                  onClick={() => handleSocialButtonClick('Microsoft')}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#F25022" d="M1 1h10v10H1z" />
                    <path fill="#00A4EF" d="M13 1h10v10H13z" />
                    <path fill="#7FBA00" d="M1 13h10v10H1z" />
                    <path fill="#FFB900" d="M13 13h10v10H13z" />
                  </svg>
                  Continue with Microsoft Account
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 btn-outline-custom rounded-full font-medium d-flex align-items-center justify-content-start px-4 gap-3 transition-colors"
                  onClick={() => handleSocialButtonClick('Apple')}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Continue with Apple
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 btn-outline-custom rounded-full font-medium d-flex align-items-center justify-content-start px-4 gap-3 transition-colors"
                  onClick={() => { setError('Phone login not implemented in this demo.'); }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  Continue with phone
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
