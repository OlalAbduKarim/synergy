

import React from 'react';
// FIX: Replaced non-existent 'View' type with 'JobSeekerView'.
import { UserProfile, JobSeekerView, MarketabilityInfo } from '../types';
import { ChartBarIcon, ArrowTrendingUpIcon, GlobeAltIcon, DocumentTextIcon, CheckCircleIcon } from './icons/Icons';

interface DashboardProps {
  userProfile: UserProfile | null;
  // FIX: Replaced non-existent 'View' type with 'JobSeekerView'.
  setView: (view: JobSeekerView) => void;
  applicationsCount: number;
}

// FIX: Replaced JSX.Element with React.ReactElement to resolve the 'Cannot find namespace JSX' error.
const StatCard: React.FC<{ icon: React.ReactElement; label: string; value: string; color: string }> = ({ icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-slate-500 text-sm">{label}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const MarketabilityBreakdown: React.FC<{ marketability: MarketabilityInfo }> = ({ marketability }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-800">Marketability Score Breakdown</h3>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="3"
              />
              <path
                className="text-primary"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${marketability.score}, 100`}
                strokeLinecap="round"
                transform="rotate(90 18 18)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-slate-800">{marketability.score}</span>
              <span className="text-lg font-semibold text-slate-500">%</span>
            </div>
          </div>
           <p className="mt-2 text-center font-semibold text-slate-600">Overall Score</p>
        </div>
        
        <div className="md:col-span-1">
          <h4 className="font-semibold text-slate-700 flex items-center text-lg">
            <CheckCircleIcon className="w-6 h-6 mr-2 text-success" />
            Top Contributing Skills
          </h4>
          <ul className="mt-3 space-y-2">
            {marketability.topSkills.map(skill => (
              <li key={skill} className="flex items-center text-slate-600 bg-slate-50 p-2 rounded-md">
                 <span className="text-success mr-2">✓</span>
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-1">
          <h4 className="font-semibold text-slate-700 flex items-center text-lg">
             <ArrowTrendingUpIcon className="w-6 h-6 mr-2 text-energy" />
            Skills to Improve Score
          </h4>
           <ul className="mt-3 space-y-2">
            {marketability.suggestedSkills.map(skill => (
              <li key={skill} className="flex items-center text-slate-600 bg-slate-50 p-2 rounded-md">
                <span className="text-energy mr-2">↗</span>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, setView, applicationsCount }) => {
  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<ChartBarIcon className="w-6 h-6 text-white"/>} label="Marketability Score" value={userProfile ? `${userProfile.marketability.score}%` : 'N/A'} color="bg-primary" />
            <StatCard icon={<ArrowTrendingUpIcon className="w-6 h-6 text-white"/>} label="Earnings Potential" value="+$25k" color="bg-success" />
            <StatCard icon={<GlobeAltIcon className="w-6 h-6 text-white"/>} label="Global Opportunities" value="1,200+" color="bg-energy" />
            <StatCard icon={<DocumentTextIcon className="w-6 h-6 text-white"/>} label="Applications Sent" value={String(applicationsCount)} color="bg-red-500" />
        </div>

        <div className="mt-8">
            {userProfile ? (
                <MarketabilityBreakdown marketability={userProfile.marketability} />
            ) : (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
                    <div className="mx-auto bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <ChartBarIcon className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-slate-800">Marketability Score Breakdown</h3>
                    <p className="mt-2 text-slate-600 max-w-md mx-auto">
                        Analyze your resume to unlock this breakdown. You'll see your score, top skills, and personalized suggestions for improvement.
                    </p>
                    <button
                        onClick={() => setView('profile')}
                        className="mt-6 bg-primary text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Analyze Resume
                    </button>
                </div>
            )}
        </div>
      
        <div className="mt-8 bg-white p-8 rounded-xl shadow-lg border border-slate-200 flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-xl text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    {userProfile ? 'Your Profile is Ready!' : 'Unlock Your Career Potential'}
                </h2>
                <p className="mt-2 text-slate-600">
                    {userProfile 
                        ? 'Your AI-powered profile is complete. Explore your job matches now or refine your profile further.' 
                        : 'Use our AI to build a skill-based profile from your resume in seconds and discover job opportunities you never thought possible.'}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                    <button
                        onClick={() => setView(userProfile ? 'matches' : 'profile')}
                        className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {userProfile ? 'View My Matches' : 'Build My Profile'}
                    </button>
                    <button
                        onClick={() => setView('profile')}
                        className="bg-slate-100 text-slate-700 font-semibold py-3 px-6 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        {userProfile ? 'Update Profile' : 'Learn More'}
                    </button>
                </div>
            </div>
            <div className="mt-8 md:mt-0">
                <img src="https://picsum.photos/400/250" alt="Career illustration" className="rounded-lg hidden md:block" />
            </div>
        </div>
    </div>
  );
};

export default Dashboard;