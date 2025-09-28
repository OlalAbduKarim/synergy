

import React from 'react';
import { Job } from '../types';
import { EyeIcon, UsersIcon, ChartBarIcon } from './icons/Icons';

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

const ProgressBar: React.FC<{ value: number; maxValue: number; color: string }> = ({ value, maxValue, color }) => {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
    return (
        <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    );
};


const EmployerAnalyticsDashboard: React.FC<{ postedJobs: Job[] }> = ({ postedJobs }) => {
    if (postedJobs.length === 0) {
        return (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-slate-200">
             <div className="mx-auto bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center">
                <ChartBarIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-800">No Analytics Data</h2>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              Post a job to start seeing performance analytics and insights.
            </p>
          </div>
        );
    }
    
    const totalViews = postedJobs.reduce((sum, job) => sum + job.analytics.views, 0);
    const totalApplications = postedJobs.reduce((sum, job) => sum + job.analytics.applications, 0);
    const avgScoreSum = postedJobs.reduce((sum, job) => sum + job.analytics.avgMatchScore, 0);
    const overallAvgMatchScore = postedJobs.length > 0 ? Math.round(avgScoreSum / postedJobs.length) : 0;

    const maxViews = Math.max(...postedJobs.map(j => j.analytics.views), 1);
    const maxApps = Math.max(...postedJobs.map(j => j.analytics.applications), 1);

    return (
        <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">Job Postings Analytics</h2>

            {/* Aggregate Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard icon={<EyeIcon className="w-6 h-6 text-white" />} label="Total Views" value={totalViews.toLocaleString()} color="bg-primary" />
                <StatCard icon={<UsersIcon className="w-6 h-6 text-white" />} label="Total Applications" value={totalApplications.toLocaleString()} color="bg-success" />
                <StatCard icon={<ChartBarIcon className="w-6 h-6 text-white" />} label="Avg. Candidate Match" value={`${overallAvgMatchScore}%`} color="bg-energy" />
            </div>

            {/* Per-Job Breakdown */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Performance by Job</h3>
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="space-y-4 p-4 sm:p-6">
                       {postedJobs.map(job => (
                           <div key={job.id} className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                               <h4 className="font-bold text-lg text-slate-800">{job.title}</h4>
                               <p className="text-sm text-slate-500 mb-4">{job.company}</p>
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
                                    <div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="text-sm font-medium text-slate-600">Views</span>
                                            <span className="font-bold text-slate-800">{job.analytics.views.toLocaleString()}</span>
                                        </div>
                                        <ProgressBar value={job.analytics.views} maxValue={maxViews} color="bg-primary" />
                                    </div>
                                     <div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="text-sm font-medium text-slate-600">Applications</span>
                                            <span className="font-bold text-slate-800">{job.analytics.applications.toLocaleString()}</span>
                                        </div>
                                        <ProgressBar value={job.analytics.applications} maxValue={maxApps} color="bg-success" />
                                    </div>
                                     <div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="text-sm font-medium text-slate-600">Avg. Match Score</span>
                                            <span className="font-bold text-slate-800">{job.analytics.avgMatchScore}%</span>
                                        </div>
                                        <ProgressBar value={job.analytics.avgMatchScore} maxValue={100} color="bg-energy" />
                                    </div>
                               </div>
                           </div>
                       ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerAnalyticsDashboard;