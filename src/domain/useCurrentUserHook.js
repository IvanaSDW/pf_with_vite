import { useEffect, useState } from 'react';
import { fetchUserData } from './userService';

export const useCurrentUser = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetchUserData().then((userData) => {
      if (!userData) return;
      setUserData(userData);
    });
  }, []);
  return userData;
};
