
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User, Briefcase, Building, Mail, Lock, MapPin } from 'lucide-react';
import { UserRole } from '../../types';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { cn } from '../../lib/utils';
import useAuth from '../../hooks/useAuth';

// Mock API call
const mockSignUp = async (data: any): Promise<{ user: any, token: string }> => {
    console.log("Signing up with", data);
    await new Promise(res => setTimeout(res, 1000));
    return {
        user: {
            id: '2',
            email: data.email,
            fullName: data.fullName,
            role: data.role,
            companyName: data.companyName || undefined,
            location: data.location
        },
        token: 'mock-new-jwt-token'
    };
};

const SignupPage: React.FC = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            role: UserRole.CANDIDATE
        }
    });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [apiError, setApiError] = React.useState<string | null>(null);

    const selectedRole = watch('role');

    React.useEffect(() => {
        register('role', { required: true });
    }, [register]);

    const onSubmit = async (data: any) => {
        setApiError(null);
        try {
            const { user, token } = await mockSignUp(data);
            login(user, token);
            const redirectPath = user.role === UserRole.CANDIDATE ? '/candidate/dashboard' : '/employer/dashboard';
            navigate(redirectPath);
        } catch (error) {
            setApiError("Could not create account. Please try again.");
        }
    };

    return (
         <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                     <Link to="/" className="inline-flex items-center text-3xl font-bold text-primary-600">
                        <Briefcase className="mr-2" />
                        Synergy
                    </Link>
                    <h2 className="mt-2 text-2xl font-semibold text-neutral-800">Create an Account</h2>
                    <p className="text-neutral-500">Join the next generation of hiring.</p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md border border-neutral-200">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}
                        
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">I am a...</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    onClick={() => setValue('role', UserRole.CANDIDATE)}
                                    className={cn("cursor-pointer p-4 border rounded-lg text-center transition-all", {
                                        "border-primary-500 ring-2 ring-primary-500 bg-primary-50": selectedRole === UserRole.CANDIDATE,
                                        "border-neutral-300 hover:border-primary-400": selectedRole !== UserRole.CANDIDATE
                                    })}
                                >
                                    <User className="mx-auto mb-2 h-6 w-6 text-primary-600" />
                                    <p className="font-semibold">Candidate</p>
                                    <p className="text-xs text-neutral-500">Looking for a job</p>
                                </div>
                                <div
                                    onClick={() => setValue('role', UserRole.EMPLOYER)}
                                    className={cn("cursor-pointer p-4 border rounded-lg text-center transition-all", {
                                        "border-primary-500 ring-2 ring-primary-500 bg-primary-50": selectedRole === UserRole.EMPLOYER,
                                        "border-neutral-300 hover:border-primary-400": selectedRole !== UserRole.EMPLOYER
                                    })}
                                >
                                    <Building className="mx-auto mb-2 h-6 w-6 text-primary-600" />
                                    <p className="font-semibold">Employer</p>
                                    <p className="text-xs text-neutral-500">Looking to hire</p>
                                </div>
                            </div>
                        </div>

                        <Input placeholder="Full Name" {...register('fullName', { required: 'Full name is required' })} />
                        {selectedRole === UserRole.EMPLOYER && (
                            <Input placeholder="Company Name" {...register('companyName', { required: 'Company name is required' })} />
                        )}
                        <Input placeholder="Location (e.g., San Francisco, CA)" {...register('location', { required: 'Location is required' })} />
                        <Input type="email" placeholder="Email Address" {...register('email', { required: 'Email is required' })} />
                        <Input type="password" placeholder="Password" {...register('password', { required: 'Password is required' })} />
                        
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>
                    <p className="mt-6 text-center text-sm text-neutral-500">
                        Already have an account? <Link to="/signin" className="font-medium text-primary-600 hover:text-primary-500">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
