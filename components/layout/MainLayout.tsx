
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} Synergy Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
