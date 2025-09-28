

import React from 'react';
// FIX: Replaced non-existent 'View' type with 'JobSeekerView'.
import { JobSeekerView } from '../types';
import { DashboardIcon, ProfileIcon, MatchesIcon, LogoIcon, BookmarkIcon } from './icons/Icons';

interface SidebarProps {
  currentView: JobSeekerView;
  setView: (view: JobSeekerView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  // FIX: Replaced non-existent 'View' type with 'JobSeekerView'.
  // FIX: Replaced JSX.Element with React.ReactElement to resolve the 'Cannot find namespace JSX' error.
  const navItems: { view: JobSeekerView; label: string; icon: React.ReactElement }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { view: 'profile', label: 'My Profile', icon: <ProfileIcon /> },
    { view: 'matches', label: 'Job Matches', icon: <MatchesIcon /> },
    { view: 'saved', label: 'Saved Jobs', icon: <BookmarkIcon /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex-col hidden lg:flex">
      <div className="flex items-center justify-center h-20 border-b border-slate-200">
        <div className="flex items-center space-x-2">
            <LogoIcon />
            <h1 className="text-xl font-bold text-slate-800">Synergy</h1>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.view}>
              <button
                onClick={() => setView(item.view)}
                className={`w-full flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                  currentView === item.view
                    ? 'bg-primary text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="w-6 h-6">{item.icon}</span>
                <span className="ml-4 font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-200">
          <div className="p-4 rounded-lg bg-slate-100 text-center">
              <h3 className="font-bold text-slate-800">Upgrade to Pro</h3>
              <p className="text-sm text-slate-600 mt-1">Get unlimited matches and career insights.</p>
              <button className="mt-4 w-full bg-energy text-white font-semibold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors">
                  Upgrade
              </button>
          </div>
      </div>
    </div>
  );
};

export default Sidebar;