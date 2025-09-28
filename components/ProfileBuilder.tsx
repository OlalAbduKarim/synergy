import React, { useState } from 'react';
// FIX: Imported User type to use for component props.
import { UserProfile, JobMatch, Availability, ExtractedProfileData, User } from '../types';
import { extractProfileFromResume, findJobMatches } from '../services/geminiService';
import { SparklesIcon } from './icons/Icons';
import AvailabilityCalendar from './AvailabilityCalendar';

interface ProfileBuilderProps {
  // FIX: Added user prop to accept the logged-in user's data.
  user: User;
  onProfileComplete: (profile: UserProfile, matches: JobMatch[]) => void;
  isMatching: boolean;
  setIsMatching: (isMatching: boolean) => void;
}

const initialAvailability: Availability = {
  timezone: 'UTC',
  schedule: {
    'Monday': { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    'Tuesday': { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    'Wednesday': { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    'Thursday': { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    'Friday': { isAvailable: true, startTime: '09:00', endTime: '17:00' },
    'Saturday': { isAvailable: false, startTime: '09:00', endTime: '17:00' },
    'Sunday': { isAvailable: false, startTime: '09:00', endTime: '17:00' },
  }
};


const ProfileBuilder: React.FC<ProfileBuilderProps> = ({ user, onProfileComplete, isMatching, setIsMatching }) => {
  const [resumeText, setResumeText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [extractedProfile, setExtractedProfile] = useState<ExtractedProfileData | null>(null);
  const [availability, setAvailability] = useState<Availability>(initialAvailability);


  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError('Please paste your resume text before analyzing.');
      return;
    }
    setIsMatching(true);
    setError(null);
    setExtractedProfile(null);

    try {
      const profileData = await extractProfileFromResume(resumeText);
      setExtractedProfile(profileData);
      
      // FIX: Added user's name and email to the profile object to satisfy the UserProfile type.
      const fullProfile: UserProfile = {
        ...profileData,
        availability,
        name: user.name,
        email: user.email,
      };

      const matches = await findJobMatches(fullProfile);
      onProfileComplete(fullProfile, matches);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800">Smart Profile Builder</h2>
        <p className="mt-2 text-slate-600">
          Paste your resume or describe your work experience, then set your weekly availability. Our AI will do the rest.
        </p>

        <div className="mt-6">
          <label htmlFor="resume" className="block text-lg font-semibold text-slate-700 mb-2">Your Resume</label>
          <textarea
            id="resume"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume here..."
            className="w-full h-60 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-200"
            disabled={isMatching}
          />
        </div>

        <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-700">Your Availability</h3>
            <p className="text-slate-500 text-sm mt-1">Set your typical weekly work hours so we can find jobs that fit your schedule.</p>
            <AvailabilityCalendar availability={availability} setAvailability={setAvailability} disabled={isMatching} />
        </div>

        {error && <p className="mt-4 text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

        <div className="mt-8 text-center">
          <button
            onClick={handleAnalyze}
            disabled={isMatching}
            className="inline-flex items-center justify-center bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isMatching ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing & Matching...
              </>
            ) : (
                <>
                <span className="w-6 h-6 mr-2"><SparklesIcon /></span>
                Build Profile & Find Matches
                </>
            )}
          </button>
        </div>
      </div>
      
      {extractedProfile && !isMatching && (
        <div className="mt-8 bg-white p-8 rounded-xl shadow-lg border border-slate-200 animate-fade-in">
          <h3 className="text-2xl font-bold text-slate-800">Your AI-Generated Profile</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-slate-700">Professional Skills</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {extractedProfile.professionalSkills.map(skill => (
                            <span key={skill} className="bg-blue-100 text-primary text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-700">Informal Skills</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {extractedProfile.informalSkills.map(skill => (
                            <span key={skill} className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                        ))}
                    </div>
                </div>
                 <div className="md:col-span-2">
                    <h4 className="font-semibold text-slate-700">Work Summary</h4>
                    <p className="text-slate-600 mt-2 text-justify">{extractedProfile.workSummary}</p>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default ProfileBuilder;
