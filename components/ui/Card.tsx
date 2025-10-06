
import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('bg-white rounded-lg border border-neutral-200 shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ className, children, ...props }) => (
    <div className={cn('p-6 border-b border-neutral-200', className)} {...props}>
        {children}
    </div>
);

export const CardContent: React.FC<CardProps> = ({ className, children, ...props }) => (
    <div className={cn('p-6', className)} {...props}>
        {children}
    </div>
);

export const CardFooter: React.FC<CardProps> = ({ className, children, ...props }) => (
    <div className={cn('p-6 pt-0', className)} {...props}>
        {children}
    </div>
);


export default Card;
