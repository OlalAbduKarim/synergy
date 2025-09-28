
import React from 'react';
import { JobMatch, UserProfile } from '../types';
import { CheckCircleIcon } from './icons/Icons';
import JobMatchCard from './JobMatchCard';

interface MatchFeedProps {
  matches: JobMatch[];
  isLoading: boolean;
  userProfile: UserProfile | null;
  savedJobs: JobMatch[];
  onToggleSave: (job: JobMatch) => void;
  appliedJobs: Set<string>;
  onApply: (job: JobMatch) => void;
}

const MatchFeed: React.FC<MatchFeedProps> = ({ matches, isLoading, userProfile, savedJobs, onToggleSave, appliedJobs, onApply }) => {
    if (isLoading) {
        return (
            <div className="text-center py-20">
                 <svg className="animate-spin mx-auto h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <h2 className="mt-4 text-2xl font-bold text-slate-700">Finding Your Super Matches...</h2>
                <p className="text-slate-500 mt-2">Our AI is analyzing opportunities across the globe for you.</p>
            </div>
        );
    }
    
    if (!userProfile) {
        return (
             <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-700">No Profile Found</h2>
                <p className="text-slate-500 mt-2 max-w-md mx-auto">Please build your profile first to see personalized job matches from our AI engine.</p>
            </div>
        )
    }

    if (matches.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-700">No High-Confidence Matches Found</h2>
                <p className="text-slate-500 mt-2 max-w-md mx-auto">We couldn't find any jobs with a match score of 70% or higher. Try expanding the skills on your profile!</p>
            </div>
        );
    }

    const savedJobIds = new Set(savedJobs.map(job => job.id));
    const superMatches = matches.filter(m => m.matchScore >= 85);
    const otherMatches = matches.filter(m => m.matchScore < 85);

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 flex items-center"><CheckCircleIcon className="w-8 h-8 mr-3 text-success"/> Super Matches ({superMatches.length})</h2>
                <p className="text-slate-600 mt-1">Jobs with a match score of 85% or higher. These are excellent fits for your profile!</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {superMatches.map(match => 
                    <JobMatchCard 
                        key={match.id} 
                        match={match} 
                        isSaved={savedJobIds.has(match.id)}
                        onToggleSave={onToggleSave}
                        isApplied={appliedJobs.has(match.id)}
                        onApply={onApply}
                    />
                )}
            </div>

            {otherMatches.length > 0 && (
                 <div className="my-12">
                    <h2 className="text-3xl font-bold text-slate-800">Good Matches ({otherMatches.length})</h2>
                    <p className="text-slate-600 mt-1">Strong opportunities that align well with your skills.</p>
                </div>
            )}
             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {otherMatches.map(match => 
                    <JobMatchCard 
                        key={match.id} 
                        match={match} 
                        isSaved={savedJobIds.has(match.id)}
                        onToggleSave={onToggleSave}
                        isApplied={appliedJobs.has(match.id)}
                        onApply={onApply}
                    />
                )}
            </div>
        </div>
    );
};

export default MatchFeed;
