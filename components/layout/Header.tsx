import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut, MessageSquare, Bell, User as UserIcon } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { UserRole } from '../../types';
import Button from '../ui/Button';
import { signOut } from '../../services/authService';
import { getUnreadCount } from '../../services/notificationService';

const Header: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const { data: unreadData } = useQuery({
        queryKey: ['unread-notifications-count'],
        queryFn: getUnreadCount,
        enabled: isAuthenticated,
        refetchInterval: 30000, // Poll every 30 seconds
        staleTime: 30000,
    });
    const unreadCount = unreadData?.count || 0;

    const mutation = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            logout();
            navigate('/signin');
        },
        onError: (error) => {
            console.error("Sign out failed", error);
            logout();
            navigate('/signin');
        }
    });

    const handleLogout = () => {
        mutation.mutate();
    };

    const candidateNavLinks = [
        { to: '/candidate/dashboard', label: 'Dashboard' },
        { to: '/jobs', label: 'Find Jobs' },
        { to: '/candidate/applications', label: 'My Applications' },
    ];

    const employerNavLinks = [
        { to: '/employer/dashboard', label: 'Dashboard' },
        { to: '/employer/jobs', label: 'Manage Jobs' },
        { to: '/jobs', label: 'Job Market' },
    ];

    const navLinks = user?.role === UserRole.CANDIDATE ? candidateNavLinks : employerNavLinks;

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-2xl font-bold text-primary-600">
                            <Briefcase className="mr-2" />
                            Synergy
                        </Link>
                        {isAuthenticated && (
                             <nav className="hidden md:flex ml-10 space-x-8">
                                {navLinks.map(link => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        className={({ isActive }) =>
                                            `text-sm font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-neutral-500 hover:text-neutral-900'}`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                            </nav>
                        )}
                    </div>

                    <div className="flex items-center">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/notifications" className="text-neutral-500 hover:text-neutral-900 relative">
                                    <Bell size={20} />
                                    {unreadCount > 0 && (
                                         <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/messages" className="text-neutral-500 hover:text-neutral-900">
                                    <MessageSquare size={20} />
                                </Link>
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-neutral-100">
                                        <div className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">
                                            {user?.fullName.charAt(0)}
                                        </div>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
                                        <div className="px-4 py-2 text-sm text-neutral-700 border-b">
                                            <p className="font-semibold">{user?.fullName}</p>
                                            <p className="text-xs text-neutral-500">{user?.email}</p>
                                        </div>
                                        <Link to={user?.role === UserRole.CANDIDATE ? "/candidate/profile" : "/employer/profile"} className="flex items-center w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                                            <UserIcon size={16} className="mr-2" /> Profile
                                        </Link>
                                        <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50" disabled={mutation.isPending}>
                                            <LogOut size={16} className="mr-2" /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-x-2">
                                <Button variant="ghost" onClick={() => navigate('/signin')}>Sign In</Button>
                                <Button onClick={() => navigate('/signup')}>Sign Up</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;