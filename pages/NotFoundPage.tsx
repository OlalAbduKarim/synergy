
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';

const NotFoundPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const homePath = isAuthenticated ? '/' : '/signin';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-neutral-50 px-4">
            <h1 className="text-6xl font-bold text-primary-600">404</h1>
            <h2 className="text-3xl font-semibold text-neutral-800 mt-4">Page Not Found</h2>
            <p className="text-neutral-500 mt-2 max-w-md">
                Sorry, the page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <Link to={homePath}>
                <Button className="mt-8">
                    Go to Homepage
                </Button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
