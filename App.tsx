
import React, { useState, useEffect } from 'react';
import { User, Role, JobSeekerView, EmployerView, UserProfile, JobMatch, Job } from './types';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProfileBuilder from './components/ProfileBuilder';
import MatchFeed from './components/MatchFeed';
import SavedJobs from './components/SavedJobs';
import { MOCK_JOBS } from './constants';
import EmployerSidebar from './components/EmployerSidebar';
import EmployerDashboard from './components/EmployerDashboard';
import CandidateFeed from './components/CandidateFeed';
import PostJob from './components/PostJob';
import EmployerAnalyticsDashboard from './components/EmployerAnalyticsDashboard';
import BottomNav from './components/BottomNav';
import EmployerBottomNav from './components/EmployerBottomNav';
import Notification from './components/Notification';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [savedJobs, setSavedJobs] = useState<JobMatch[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [postedJobs, setPostedJobs] = useState<Job[]>(MOCK_JOBS.slice(0,3));
  const [jobForCandidates, setJobForCandidates] = useState<Job | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [notification, setNotification] = useState<{message: string; type: 'success' | 'error' | 'info'} | null>(null);

  // View state
  const [jobSeekerView, setJobSeekerView] = useState<JobSeekerView>('dashboard');
  const [employerView, setEmployerView] = useState<EmployerView>('dashboard');

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);
  
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.role === 'EMPLOYER') {
        setEmployerView('dashboard');
    } else {
        setJobSeekerView('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserProfile(null);
    setJobMatches([]);
    setSavedJobs([]);
    setAppliedJobs(new Set());
  };

  const handleProfileComplete = (profile: UserProfile, matches: JobMatch[]) => {
    setUserProfile(profile);
    setJobMatches(matches);
    setJobSeekerView('matches');
    setNotification({ message: 'Profile created and matches found!', type: 'success'});
  };

  const handleToggleSaveJob = (job: JobMatch) => {
    const isSaved = savedJobs.some(savedJob => savedJob.id === job.id);
    if (isSaved) {
      setSavedJobs(savedJobs.filter(savedJob => savedJob.id !== job.id));
      setNotification({ message: 'Job unsaved!', type: 'info'});
    } else {
      setSavedJobs([...savedJobs, job]);
      setNotification({ message: 'Job saved!', type: 'success'});
    }
  };

  const handleApply = (job: JobMatch) => {
    setAppliedJobs(new Set(appliedJobs).add(job.id));
    setNotification({ message: `Successfully applied to ${job.title}!`, type: 'success'});
  };

  const handleJobPost = (job: Job) => {
    setPostedJobs([job, ...postedJobs]);
    setEmployerView('dashboard');
    setNotification({ message: 'Job posted successfully!', type: 'success'});
  };

  const handleViewCandidates = (job: Job) => {
    setJobForCandidates(job);
    setEmployerView('candidates');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderJobSeekerView = () => {
    switch (jobSeekerView) {
      case 'dashboard':
        return <Dashboard userProfile={userProfile} setView={setJobSeekerView} applicationsCount={appliedJobs.size} />;
      case 'profile':
        return <ProfileBuilder user={user} onProfileComplete={handleProfileComplete} isMatching={isMatching} setIsMatching={setIsMatching} />;
      case 'matches':
        return <MatchFeed matches={jobMatches} savedJobs={savedJobs} onToggleSave={handleToggleSaveJob} appliedJobs={appliedJobs} onApply={handleApply} />;
      case 'saved':
        return <SavedJobs savedJobs={savedJobs} onToggleSave={handleToggleSaveJob} appliedJobs={appliedJobs} onApply={handleApply} />;
      default:
        return <div>Not Found</div>;
    }
  };

  const renderEmployerView = () => {
    switch (employerView) {
        case 'dashboard':
            return <EmployerDashboard postedJobs={postedJobs} onViewCandidates={handleViewCandidates} setView={setEmployerView} />;
        case 'postJob':
            return <PostJob onJobPost={handleJobPost} />;
        case 'candidates':
            return <CandidateFeed job={jobForCandidates} />;
        case 'analytics':
            return <EmployerAnalyticsDashboard postedJobs={postedJobs} />;
        default:
            return <div>Not Found</div>;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      
      {user.role === 'JOB_SEEKER' ? (
        <Sidebar currentView={jobSeekerView} setView={setJobSeekerView} />
      ) : (
        <EmployerSidebar currentView={employerView} setView={setEmployerView} />
      )}
      
      <div className="flex-1 flex flex-col">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto pb-20 lg:pb-8">
            {user.role === 'JOB_SEEKER' ? renderJobSeekerView() : renderEmployerView()}
        </main>
      </div>

       {user.role === 'JOB_SEEKER' ? (
        <BottomNav currentView={jobSeekerView} setView={setJobSeekerView} />
      ) : (
        <EmployerBottomNav currentView={employerView} setView={setEmployerView} />
      )}
    </div>
  );
};

export default App;
