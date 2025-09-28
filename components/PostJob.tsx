
import React, { useState } from 'react';
import { Job } from '../types';

interface PostJobProps {
  onJobPost: (job: Job) => void;
}

const PostJob: React.FC<PostJobProps> = ({ onJobPost }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [currency, setCurrency] = useState('USD');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: `job_${Date.now()}`,
      title,
      company,
      location,
      description,
      salary: {
        min: parseInt(minSalary, 10),
        max: parseInt(maxSalary, 10),
        currency,
      },
      analytics: {
        views: 0,
        applications: 0,
        avgMatchScore: 0,
      },
    };
    onJobPost(newJob);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800">Post a New Job</h2>
        <p className="mt-2 text-slate-600">
          Fill out the details below to find the best candidates with our AI matching engine.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-slate-700 mb-2">Job Title</label>
              <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label htmlFor="company" className="block text-lg font-semibold text-slate-700 mb-2">Company</label>
              <input type="text" id="company" value={company} onChange={e => setCompany(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary" required />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-lg font-semibold text-slate-700 mb-2">Location</label>
            <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., Remote or New York, NY" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary" required />
          </div>

          <div>
             <label htmlFor="description" className="block text-lg font-semibold text-slate-700 mb-2">Job Description</label>
             <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={8} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary" required />
          </div>

          <div>
            <label className="block text-lg font-semibold text-slate-700 mb-2">Salary Range</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <input type="number" value={minSalary} onChange={e => setMinSalary(e.target.value)} placeholder="Minimum" className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary" required />
                 <input type="number" value={maxSalary} onChange={e => setMaxSalary(e.target.value)} placeholder="Maximum" className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary" required />
                 <select value={currency} onChange={e => setCurrency(e.target.value)} className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>KES</option>
                    <option>INR</option>
                 </select>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Post Job & Find Candidates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
