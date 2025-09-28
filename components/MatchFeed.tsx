
import React from 'react';
import { JobMatch } from '../types';
import JobMatchCard from './JobMatchCard';
import { SparklesIcon } from './icons/Icons';

interface MatchFeedProps {
  matches: JobMatch[];
  savedJobs: JobMatch[];
  onToggleSave: (job: JobMatch) => void;
  appliedJobs: Set<string>;
  onApply: (job: JobMatch) => void;
}

const MatchFeed: React.FC<MatchFeedProps> = ({ matches, savedJobs, onToggleSave, appliedJobs, onApply }) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="mx-auto bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center">
            <SparklesIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-slate-700">No Matches Found Yet</h2>
        <p className="text-slate-500 mt-2 max-w-md mx-auto">
          It looks like you don't have any job matches. Build your profile from your resume to discover opportunities tailored for you.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center">
          <SparklesIcon className="w-8 h-8 mr-3 text-primary" /> Your Top Job Matches ({matches.length})
        </h2>
        <p className="text-slate-600 mt-1">
          Our AI has analyzed your profile and found these opportunities for you.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {matches.map(match => (
          <JobMatchCard
            key={match.id}
            match={match}
            isSaved={savedJobs.some(j => j.id === match.id)}
            onToggleSave={onToggleSave}
            isApplied={appliedJobs.has(match.id)}
            onApply={onApply}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchFeed;
