

import React from 'react';
import { Job, EmployerView } from '../types';
import { BriefcaseIcon, UsersIcon, PlusCircleIcon, ChartBarIcon, EyeIcon } from './icons/Icons';

interface EmployerDashboardProps {
  postedJobs: Job[];
  onViewCandidates: (job: Job) => void;
  setView: (view: EmployerView) => void;
}

// FIX: Replaced JSX.Element with React.ReactElement to resolve the 'Cannot find namespace JSX' error.
const StatCard: React.FC<{ icon: React.ReactElement; label: string; value: string | number; color: string }> = ({ icon, label, value, color }) => (
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

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ postedJobs, onViewCandidates, setView }) => {
  const totalViews = postedJobs.reduce((sum, job) => sum + job.analytics.views, 0);
  const totalApplications = postedJobs.reduce((sum, job) => sum + job.analytics.applications, 0);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<BriefcaseIcon className="w-6 h-6 text-white"/>} label="Active Job Listings" value={postedJobs.length} color="bg-primary" />
        <StatCard icon={<EyeIcon className="w-6 h-6 text-white"/>} label="Total Job Views" value={totalViews.toLocaleString()} color="bg-indigo-500" />
        <StatCard icon={<UsersIcon className="w-6 h-6 text-white"/>} label="Total Applications" value={totalApplications.toLocaleString()} color="bg-success" />
        <StatCard icon={<ChartBarIcon className="w-6 h-6 text-white"/>} label="Time-to-Hire" value="12 Days" color="bg-energy" />
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800">Your Job Listings</h2>
          <button
            onClick={() => setView('postJob')}
            className="flex items-center bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Post New Job
          </button>
        </div>
        
        {postedJobs.length > 0 ? (
          <div className="space-y-4">
            {postedJobs.map(job => (
              <div key={job.id} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
                  <p className="text-slate-500">{job.company} - {job.location}</p>
                </div>
                <button
                  onClick={() => onViewCandidates(job)}
                  className="bg-success text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Find Candidates
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-slate-200">
            <div className="mx-auto bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center">
                <BriefcaseIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-slate-800">No Jobs Posted Yet</h3>
            <p className="mt-2 text-slate-600">Post your first job to start finding top talent with AI.</p>
             <button
                onClick={() => setView('postJob')}
                className="mt-6 bg-primary text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Post a Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
