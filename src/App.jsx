import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import VehiclesPage from "./pages/VehiclesPage";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import VehicleBookingPage from "./pages/VehicleBookingPage";
import Login from './pages/Login';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import Conditions from './pages/Conditions';
import CabBooking from './pages/CabBooking';
import NotFound from "./pages/NotFound";

import 'react-datepicker/dist/react-datepicker.css';

// 🔁 Replace with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'AW-722484073';

// Wrap Routes with useEffect logic
const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="vehicles/:id" element={<VehicleDetailPage />} />
        <Route path="VehicleBookingPage" element={<VehicleBookingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="About" element={<About />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="conditions" element={<Conditions />} />
        <Route path="cabbooking" element={<CabBooking />} />
        <Route path="Admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  useEffect(() => {
    // Load gtag.js script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;