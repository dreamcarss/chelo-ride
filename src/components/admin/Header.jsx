import React from 'react';

const Header = () => (
  <div className="bg-card shadow-sm border-b border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-montserrat">Chelo Ride Admin</h1>
          <p className="text-muted-foreground mt-1">Manage your premium car rental business</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Welcome, Admin</span>
          <div className="w-10 h-10 bg-luxe-yellow rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Header;