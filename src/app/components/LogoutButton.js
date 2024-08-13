// src/app/components/LogoutButton.js
'use client';

import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove token from localStorage or context (if used)
    localStorage.removeItem('authToken');
    // Redirect to login page or homepage
    router.push('/login');
  };

  return (
    <button onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;
