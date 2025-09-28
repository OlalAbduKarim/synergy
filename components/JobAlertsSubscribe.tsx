
import React, { useState } from 'react';

const JobAlertsSubscribe: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log(`Subscribing ${email} to job alerts.`);
            setSubscribed(true);
        }
    };

    if (subscribed) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 text-center">
                <h3 className="text-xl font-bold text-slate-800">You're Subscribed!</h3>
                <p className="text-slate-600 mt-2">We'll send new job matches for you to <strong>{email}</strong>.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">Get Job Alerts</h3>
            <p className="text-slate-600 mt-1">Be the first to know about new opportunities.</p>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-grow w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
                <button
                    type="submit"
                    className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default JobAlertsSubscribe;
