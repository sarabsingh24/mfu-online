import React from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../component/auth/authSlice';

const styles = {
  display: 'flex',
  justifyContent: 'end',
  marginTop: '8px',
  fontSize: '12px',
  cursor: 'pointer',
};

function HeaderSection() {
  const dispatch = useDispatch();

  const logoutHandeler = () => {
    dispatch(logout());
  };

  return (
    <div style={styles}>
      <Button variant="primary" size="sm" onClick={logoutHandeler}>
        logout
      </Button>
    </div>
  );
}

export default HeaderSection;
