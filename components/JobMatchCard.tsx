

import React from 'react';
import { JobMatch } from '../types';
import { BriefcaseIcon, LocationIcon, SparklesIcon, BookmarkIcon, CheckCircleIcon } from './icons/Icons';

interface JobMatchCardProps {
    match: JobMatch;
    isSaved: boolean;
    onToggleSave: (job: JobMatch) => void;
    isApplied: boolean;
    onApply: (job: JobMatch) => void;
}

const MatchScoreBadge: React.FC<{ score: number }> = ({ score }) => {
    let bgColor = 'bg-slate-200';
    let textColor = 'text-slate-800';
    if (score >= 95) {
        bgColor = 'bg-energy';
        textColor = 'text-white';
    } else if (score >= 85) {
        bgColor = 'bg-success';
        textColor = 'text-white';
    } else if (score >= 70) {
        bgColor = 'bg-primary';
        textColor = 'text-white';
    }
    return (
        <div className={`absolute top-4 right-4 flex flex-col items-center justify-center w-20 h-20 rounded-full ${bgColor} shadow-lg`}>
            <span className={`text-3xl font-bold ${textColor}`}>{score}</span>
            <span className={`text-xs font-semibold uppercase ${textColor}`}>Match</span>
        </div>
    );
};


const JobMatchCard: React.FC<JobMatchCardProps> = ({ match, isSaved, onToggleSave, isApplied, onApply }) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: match.salary.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 relative overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full">
            <MatchScoreBadge score={match.matchScore} />
            <div className="pr-24 flex-grow">
                <h3 className="text-xl font-bold text-slate-800">{match.title}</h3>
                <p className="text-md font-semibold text-primary mt-1">{match.company}</p>
                <div className="flex items-center space-x-4 text-slate-500 mt-3 text-sm">
                    <span className="flex items-center"><BriefcaseIcon className="w-4 h-4 mr-1.5" /> Full-time</span>
                    <span className="flex items-center"><LocationIcon className="w-4 h-4 mr-1.5" /> {match.location}</span>
                </div>
                 <p className="text-lg font-semibold text-success mt-3">
                    {formatter.format(match.salary.min)} - {formatter.format(match.salary.max)}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <h4 className="font-semibold text-slate-700 flex items-center"><SparklesIcon className="w-5 h-5 mr-2 text-energy"/> AI Match Explanation</h4>
                    <p className="text-slate-600 mt-2 text-sm">{match.explanation}</p>
                </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 shrink-0">
                <button 
                    onClick={() => onApply(match)}
                    disabled={isApplied}
                    className="w-full flex items-center justify-center bg-primary text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    {isApplied ? (
                        <>
                            <CheckCircleIcon className="w-5 h-5 mr-2" />
                            Applied
                        </>
                    ) : (
                        'One-Click Apply'
                    )}
                </button>
                <button 
                    onClick={() => onToggleSave(match)}
                    className={`w-full flex items-center justify-center font-semibold py-2.5 px-4 rounded-lg transition-colors ${
                        isSaved 
                        ? 'bg-emerald-100 text-success hover:bg-emerald-200' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                    <BookmarkIcon className="w-5 h-5 mr-2" />
                    {isSaved ? 'Saved' : 'Save for Later'}
                </button>
            </div>
        </div>
    );
};

export default JobMatchCard;