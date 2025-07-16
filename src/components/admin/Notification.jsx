import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Notification = ({ error, success }) => (
  <>
    {error && (
      <div className="fixed top-4 right-4 bg-destructive text-destructive-foreground p-4 rounded-lg shadow-lg z-50 animate-fade-in-up">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      </div>
    )}
    {success && (
      <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in-up">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {success}
        </div>
      </div>
    )}
  </>
);
export default Notification;