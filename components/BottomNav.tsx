import React from 'react';
import { JobSeekerView } from '../types';
import { DashboardIcon, ProfileIcon, MatchesIcon, BookmarkIcon } from './icons/Icons';

interface BottomNavProps {
  currentView: JobSeekerView;
  setView: (view: JobSeekerView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const navItems: { view: JobSeekerView; label: string; icon: React.ReactElement }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { view: 'profile', label: 'Profile', icon: <ProfileIcon /> },
    { view: 'matches', label: 'Matches', icon: <MatchesIcon /> },
    { view: 'saved', label: 'Saved', icon: <BookmarkIcon /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
              currentView === item.view
                ? 'text-primary'
                : 'text-slate-500 hover:text-primary'
            }`}
          >
            <span className="w-6 h-6">{item.icon}</span>
            <span className="text-xs font-medium mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
