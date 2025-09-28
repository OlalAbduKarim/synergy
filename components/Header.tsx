
import React from 'react';
import { User } from '../types';
import { BellIcon, ChevronDownIcon, LogoutIcon } from './icons/Icons';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const roleDisplayName = user.role === 'JOB_SEEKER' ? 'Job Seeker' : 'Employer';
  
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome Back, {user.name.split(' ')[0]}!</h2>
        <p className="text-slate-500">Here's your personalized {roleDisplayName.toLowerCase()} overview.</p>
      </div>
      <div className="flex items-center space-x-6">
        <button className="relative text-slate-500 hover:text-primary">
          <BellIcon />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-energy opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-energy"></span>
          </span>
        </button>
        <div className="flex items-center space-x-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={`https://i.pravatar.cc/150?u=${user.email}`}
            alt="User avatar"
          />
          <div>
            <p className="font-semibold text-slate-700">{user.name}</p>
            <p className="text-sm text-slate-500">{roleDisplayName}</p>
          </div>
        </div>
        <button 
            onClick={onLogout}
            className="flex items-center space-x-2 text-slate-500 hover:text-red-600 transition-colors"
            title="Logout"
        >
            <LogoutIcon className="w-6 h-6" />
            <span className="font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
