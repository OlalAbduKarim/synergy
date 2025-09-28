
import React from 'react';
import { JobMatch } from '../types';
import JobMatchCard from './JobMatchCard';
import { BookmarkIcon } from './icons/Icons';

interface SavedJobsProps {
  savedJobs: JobMatch[];
  onToggleSave: (job: JobMatch) => void;
  appliedJobs: Set<string>;
  onApply: (job: JobMatch) => void;
}

const SavedJobs: React.FC<SavedJobsProps> = ({ savedJobs, onToggleSave, appliedJobs, onApply }) => {
  if (savedJobs.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="mx-auto bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center">
            <BookmarkIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-slate-700">No Saved Jobs Yet</h2>
        <p className="text-slate-500 mt-2 max-w-md mx-auto">
          You haven't saved any jobs. Browse your matches and click "Save for Later" on the ones that interest you!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center">
          <BookmarkIcon className="w-8 h-8 mr-3 text-primary" /> Saved Jobs ({savedJobs.length})
        </h2>
        <p className="text-slate-600 mt-1">
          Here are the opportunities you've saved for later.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {savedJobs.map(job => (
          <JobMatchCard
            key={job.id}
            match={job}
            isSaved={true} // All jobs on this page are saved
            onToggleSave={onToggleSave}
            isApplied={appliedJobs.has(job.id)}
            onApply={onApply}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;
