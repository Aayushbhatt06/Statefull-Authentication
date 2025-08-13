import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/auth/check', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAuthenticated(true);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/login" />;

  return children;
}
