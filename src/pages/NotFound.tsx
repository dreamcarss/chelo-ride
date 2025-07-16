
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxe-black pt-16 pb-16">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-luxe-yellow">404</h1>
        <p className="text-2xl text-luxe-white mb-6">Oops! Page not found</p>
        <p className="text-luxe-gray mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link to="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
