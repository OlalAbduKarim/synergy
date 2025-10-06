import React from 'react';
import { cn } from '../../lib/utils';
import { ApplicationStatus } from '../../types';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md';
    status?: ApplicationStatus;
    children: React.ReactNode;
}

const statusColors: Record<ApplicationStatus, string> = {
    [ApplicationStatus.SUBMITTED]: 'bg-neutral-100 text-neutral-800',
    [ApplicationStatus.REVIEWING]: 'bg-blue-100 text-blue-800',
    [ApplicationStatus.INTERVIEWING]: 'bg-yellow-100 text-yellow-800',
    [ApplicationStatus.OFFERED]: 'bg-green-100 text-green-800',
    [ApplicationStatus.REJECTED]: 'bg-red-100 text-red-800',
    [ApplicationStatus.WITHDRAWN]: 'bg-gray-100 text-gray-800',
};

const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', size = 'md', status, children, ...props }) => {
    const variantClasses = {
        default: 'bg-neutral-100 text-neutral-800',
        primary: 'bg-primary-100 text-primary-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
    };
    
    const sizeClasses = {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-0.5 text-xs',
    };
    
    const colorClass = status ? statusColors[status] : variantClasses[variant];

    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full border font-semibold transition-colors',
                sizeClasses[size],
                colorClass,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Badge;