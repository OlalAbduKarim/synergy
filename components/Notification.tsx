
import React, { useState, useEffect } from 'react';
import { CheckCircleIcon } from './icons/Icons'; // Assuming you have an XCircleIcon for errors

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const baseClasses = "fixed top-5 right-5 z-[100] flex items-center p-4 rounded-lg shadow-lg text-white max-w-sm transition-opacity duration-300";
  let typeClasses = '';
  let IconComponent;

  switch (type) {
    case 'success':
      typeClasses = 'bg-success';
      IconComponent = <CheckCircleIcon className="w-6 h-6" />;
      break;
    case 'error':
      typeClasses = 'bg-red-500';
      // Use a placeholder or a real error icon
      IconComponent = <span className="text-xl font-bold">!</span>; 
      break;
    case 'info':
    default:
      typeClasses = 'bg-blue-500';
      // Use a placeholder or a real info icon
      IconComponent = <span className="text-xl font-bold">i</span>;
      break;
  }

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <div className="mr-3">
        {IconComponent}
      </div>
      <div className="flex-1 font-medium">{message}</div>
       <button onClick={onClose} className="ml-4 -mr-2 p-1 rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  );
};

export default Notification;
