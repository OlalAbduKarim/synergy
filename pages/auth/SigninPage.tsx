
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Mail, Lock } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { UserRole } from '../../types';
import { signIn } from '../../services/authService';
import Spinner from '../../components/ui/Spinner';

const SigninPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: signIn,
        onSuccess: ({ user, token }) => {
            login(user, token);
            const redirectPath = user.role === UserRole.CANDIDATE ? '/candidate/dashboard' : '/employer/dashboard';
            navigate(redirectPath);
        },
    });

    const onSubmit = (data: any) => {
        mutation.mutate(data);
    };
    
    const apiError = mutation.error ? (mutation.error as any).response?.data?.error || "Invalid email or password. Please try again." : null;

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                     <Link to="/" className="inline-flex items-center text-3xl font-bold text-primary-600">
                        <Briefcase className="mr-2" />
                        Synergy
                    </Link>
                    <h2 className="mt-2 text-2xl font-semibold text-neutral-800">Welcome Back</h2>
                    <p className="text-neutral-500">Sign in to continue your journey.</p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md border border-neutral-200">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Email</label>
                            <div className="mt-1 relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    className="pl-10"
                                    {...register('email', { required: 'Email is required' })}
                                />
                            </div>
                             {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message as string}</p>}
                        </div>

                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-neutral-700">Password</label>
                             <div className="mt-1 relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    className="pl-10"
                                    {...register('password', { required: 'Password is required' })}
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message as string}</p>}
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? <><Spinner size="sm" className="mr-2" /> Signing In...</> : 'Sign In'}
                        </Button>
                    </form>
                     <p className="mt-6 text-center text-sm text-neutral-500">
                        Don't have an account? <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SigninPage;
