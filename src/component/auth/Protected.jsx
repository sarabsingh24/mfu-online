import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
//   const { IslogedIn } = useSelector((state) => state.user);
  const { userId } = useSelector((state) => state.account);
console.log(userId);
  if (!userId) {
    return <Navigate to="/signin" replace={true} />;
  }

  return children;
};

export default Protected;