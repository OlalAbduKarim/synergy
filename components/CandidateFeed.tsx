
import React, { useState, useEffect } from 'react';
import { Job, CandidateMatch } from '../types';
import { findCandidatesForJob } from '../services/geminiService';
import CandidateCard from './CandidateCard';

interface CandidateFeedProps {
  job: Job | null;
}

const CandidateFeed: React.FC<CandidateFeedProps> = ({ job }) => {
  const [matches, setMatches] = useState<CandidateMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (job) {
      const fetchCandidates = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const results = await findCandidatesForJob(job);
          setMatches(results);
        } catch (err) {
          setError('Failed to fetch candidates.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCandidates();
    }
  }, [job]);

  if (!job) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-700">No Job Selected</h2>
        <p className="text-slate-500 mt-2 max-w-md mx-auto">Please select a job from your dashboard to view AI-matched candidates.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <svg className="animate-spin mx-auto h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-slate-700">Finding Top Candidates...</h2>
        <p className="text-slate-500 mt-2">Our AI is searching for the best talent for your role.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Top Candidates for {job.title}</h2>
        <p className="text-slate-600 mt-1">AI-ranked candidates based on their skills and experience.</p>
      </div>
      
      {matches.length > 0 ? (
          <div className="space-y-6">
            {matches.map((match, index) => (
              <CandidateCard key={index} match={match} />
            ))}
          </div>
      ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-700">No High-Confidence Matches Found</h2>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">We couldn't find any candidates with a match score of 70% or higher for this role.</p>
          </div>
      )}

    </div>
  );
};

export default CandidateFeed;
