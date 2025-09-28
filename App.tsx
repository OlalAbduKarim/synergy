
import React, { useState, useCallback } from 'react';
import { User, UserProfile, JobSeekerView, EmployerView, JobMatch, Job, CandidateMatch } from './types';

// Components
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import EmployerSidebar from './components/EmployerSidebar';
import Header from './components/Header';
import ProfileBuilder from './components/ProfileBuilder';
import MatchFeed from './components/MatchFeed';
import Dashboard from './components/Dashboard';
import SavedJobs from './components/SavedJobs';
import EmployerDashboard from './components/EmployerDashboard';
import PostJob from './components/PostJob';
import CandidateFeed from './components/CandidateFeed';
import EmployerAnalyticsDashboard from './components/EmployerAnalyticsDashboard';

export default function App() {
  // Global State
  const [user, setUser] = useState<User | null>(null);

  // Job Seeker State
  const [jobSeekerView, setJobSeekerView] = useState<JobSeekerView>('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [savedJobs, setSavedJobs] = useState<JobMatch[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [isMatching, setIsMatching] = useState(false);
  
  // Employer State
  const [employerView, setEmployerView] = useState<EmployerView>('dashboard');
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);
  const [selectedJobForCandidates, setSelectedJobForCandidates] = useState<Job | null>(null);


  // --- HANDLERS ---
  const handleLogin = (loggedInUser: User) => setUser(loggedInUser);
  const handleLogout = () => setUser(null);

  // Job Seeker Handlers
  const handleProfileUpdate = useCallback((profile: UserProfile, matches: JobMatch[]) => {
    setUserProfile(profile);
    setJobMatches(matches);
    setJobSeekerView('matches');
  }, []);

  const handleToggleSaveJob = useCallback((job: JobMatch) => {
    setSavedJobs(prev => {
      const isSaved = prev.some(saved => saved.id === job.id);
      return isSaved ? prev.filter(saved => saved.id !== job.id) : [...prev, job];
    });
  }, []);

  const handleApplyToJob = useCallback((job: JobMatch) => {
    setAppliedJobs(prev => new Set(prev).add(job.id));
    // In a real app, you might show a success toast notification here.
  }, []);

  // Employer Handlers
  const handleJobPost = useCallback((newJob: Job) => {
    setPostedJobs(prev => [...prev, newJob]);
    setEmployerView('dashboard');
  }, []);
  
  const handleViewCandidates = useCallback((job: Job) => {
      setSelectedJobForCandidates(job);
      setEmployerView('candidates');
  }, []);


  // --- RENDER LOGIC ---

  // Show Login screen if no user
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderJobSeekerContent = () => {
    switch (jobSeekerView) {
      case 'dashboard': return <Dashboard userProfile={userProfile} setView={setJobSeekerView} applicationsCount={appliedJobs.size} />;
      // FIX: Passed the logged-in user object to ProfileBuilder to provide name and email for the full profile.
      case 'profile': return <ProfileBuilder user={user} onProfileComplete={handleProfileUpdate} isMatching={isMatching} setIsMatching={setIsMatching} />;
      case 'matches': return <MatchFeed matches={jobMatches} isLoading={isMatching} userProfile={userProfile} savedJobs={savedJobs} onToggleSave={handleToggleSaveJob} appliedJobs={appliedJobs} onApply={handleApplyToJob} />;
      case 'saved': return <SavedJobs savedJobs={savedJobs} onToggleSave={handleToggleSaveJob} appliedJobs={appliedJobs} onApply={handleApplyToJob} />;
      default: return <Dashboard userProfile={userProfile} setView={setJobSeekerView} applicationsCount={appliedJobs.size} />;
    }
  };

  const renderEmployerContent = () => {
      switch(employerView) {
          case 'dashboard': return <EmployerDashboard postedJobs={postedJobs} onViewCandidates={handleViewCandidates} setView={setEmployerView} />;
          case 'postJob': return <PostJob onJobPost={handleJobPost} />;
          case 'analytics': return <EmployerAnalyticsDashboard postedJobs={postedJobs} />;
          case 'candidates': return <CandidateFeed job={selectedJobForCandidates} />;
          default: return <EmployerDashboard postedJobs={postedJobs} onViewCandidates={handleViewCandidates} setView={setEmployerView} />;
      }
  };

  // Render role-specific UI
  return (
    <div className="flex h-screen font-sans bg-slate-100">
      {user.role === 'JOB_SEEKER' 
        ? <Sidebar currentView={jobSeekerView} setView={setJobSeekerView} />
        : <EmployerSidebar currentView={employerView} setView={setEmployerView} />
      }
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6 lg:p-8">
          {user.role === 'JOB_SEEKER' ? renderJobSeekerContent() : renderEmployerContent()}
        </main>
      </div>
    </div>
  );
}
