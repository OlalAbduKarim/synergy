
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Mail, Lock } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { User, UserRole } from '../../types';

// Mock API call
const mockSignIn = async (data: any): Promise<{ user: User, token: string }> => {
    console.log("Signing in with", data);
    await new Promise(res => setTimeout(res, 1000));
    // In a real app, this would be a call to your backend.
    // The role would be determined by the server.
    const role = data.email.includes('employer') ? UserRole.EMPLOYER : UserRole.CANDIDATE;
    return {
        user: {
            id: '1',
            email: data.email,
            fullName: role === UserRole.CANDIDATE ? 'John Doe' : 'ACME Corp',
            role: role,
        },
        token: 'mock-jwt-token'
    };
};


const SigninPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [apiError, setApiError] = React.useState<string | null>(null);

    const onSubmit = async (data: any) => {
        setApiError(null);
        try {
            const { user, token } = await mockSignIn(data);
            login(user, token);
            const redirectPath = user.role === UserRole.CANDIDATE ? '/candidate/dashboard' : '/employer/dashboard';
            navigate(redirectPath);
        } catch (error) {
            setApiError("Invalid email or password. Please try again.");
        }
    };

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
                        
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
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
