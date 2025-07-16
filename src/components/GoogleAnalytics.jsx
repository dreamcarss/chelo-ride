// src/components/GoogleAnalytics.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-BC8XL73K64'; // 🔁 Replace with your GA4 Measurement ID

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Ensure gtag is available
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

export default GoogleAnalytics;