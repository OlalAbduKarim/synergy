
import React from 'react';
import { CandidateMatch } from '../types';
import { SparklesIcon } from './icons/Icons';

interface CandidateCardProps {
  match: CandidateMatch;
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
        <div className={`flex flex-col items-center justify-center w-24 h-24 rounded-full ${bgColor} shadow-lg shrink-0`}>
            <span className={`text-4xl font-bold ${textColor}`}>{score}</span>
            <span className={`text-sm font-semibold uppercase ${textColor}`}>Match</span>
        </div>
    );
};

const CandidateCard: React.FC<CandidateCardProps> = ({ match }) => {
  const { profile, matchScore, explanation } = match;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 flex flex-col md:flex-row items-start gap-6 transition-shadow duration-300 hover:shadow-2xl">
      <MatchScoreBadge score={matchScore} />
      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-slate-800">{profile.name}</h3>
        <p className="text-primary font-medium">{profile.email}</p>
        
        <div className="mt-4 pt-4 border-t border-slate-200">
          <h4 className="font-semibold text-slate-700 flex items-center"><SparklesIcon className="w-5 h-5 mr-2 text-energy"/> AI Match Explanation</h4>
          <p className="text-slate-600 mt-2">{explanation}</p>
        </div>

        <div className="mt-4">
            <h4 className="font-semibold text-slate-700">Key Skills</h4>
            <div className="flex flex-wrap gap-2 mt-2">
                {profile.professionalSkills.slice(0, 5).map(skill => (
                    <span key={skill} className="bg-blue-100 text-primary text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                ))}
                 {profile.informalSkills.slice(0, 3).map(skill => (
                    <span key={skill} className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                ))}
            </div>
        </div>
      </div>
       <div className="w-full md:w-auto flex md:flex-col gap-3 shrink-0">
            <button className="flex-1 bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Contact</button>
            <button className="flex-1 bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors">View Profile</button>
        </div>
    </div>
  );
};

export default CandidateCard;
