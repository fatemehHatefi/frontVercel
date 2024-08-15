// useIsClient.js
import { useState, useEffect } from 'react';

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  return isClient;
};

export default useIsClient;
