import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { syncToken } from '../api/baseUrl';

export default function ProtectRoute({ children }) {
  const auth = Cookies.get('token');

  React.useEffect(() => {
    syncToken();
  }, []);

  return auth !== undefined ? children : <Navigate to="/login" />;
}
