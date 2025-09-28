
import React, { useState } from 'react';
import { User, Role } from '../types';
import { LogoIcon } from './icons/Icons';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('JOB_SEEKER');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/signup
    const mockUser: User = {
      id: `user_${Date.now()}`,
      email,
      name: isSigningUp ? name : (email.split('@')[0] || 'User'),
      role: isSigningUp ? role : (email.includes('employer') ? 'EMPLOYER' : 'JOB_SEEKER'), // Simple logic for demo
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-200">
            <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2">
                    <LogoIcon />
                    <h1 className="text-3xl font-bold text-slate-800">Synergy</h1>
                </div>
                 <p className="text-slate-500 mt-2">{isSigningUp ? "Create your account" : "Welcome back!"}</p>
            </div>

          <form onSubmit={handleSubmit}>
            {isSigningUp && (
              <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                  id="name"
                  type="text"
                  placeholder="Alex Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                id="email"
                type="email"
                placeholder="alex.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {isSigningUp && (
                <div className="mb-6">
                    <label className="block text-slate-700 text-sm font-bold mb-2">I am an...</label>
                    <div className="flex rounded-lg border border-slate-300 p-1">
                        <button type="button" onClick={() => setRole('JOB_SEEKER')} className={`flex-1 py-2 rounded-md transition-colors ${role === 'JOB_SEEKER' ? 'bg-primary text-white' : 'hover:bg-slate-100'}`}>Job Seeker</button>
                        <button type="button" onClick={() => setRole('EMPLOYER')} className={`flex-1 py-2 rounded-md transition-colors ${role === 'EMPLOYER' ? 'bg-primary text-white' : 'hover:bg-slate-100'}`}>Employer</button>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
              <button
                className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full transition-colors"
                type="submit"
              >
                {isSigningUp ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <button
              onClick={() => setIsSigningUp(!isSigningUp)}
              className="inline-block align-baseline font-bold text-sm text-primary hover:text-blue-700"
            >
              {isSigningUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;