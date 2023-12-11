import React from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../component/auth/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { switchPanel } from '../../reducer/Reducer/tab/tabSlice';

const styles = {
  display: 'flex',
  justifyContent: 'end',
  marginTop: '8px',
  fontSize: '12px',
  cursor: 'pointer',
};

function HeaderSection() {
  const { stepsCount, tabsCreater } = useSelector((state) => state.tab);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandeler = () => {
    dispatch(logout());
  };

  const adminHandeler = () => {
    dispatch(switchPanel('admin'));
    navigate('/admin');
  };

  return (
    <div style={styles}>
      <Button
        variant="outline-primary"
        size="sm"
        className="m-2"
        onClick={adminHandeler}
      >
        Admin Panel
      </Button>
      <Button
        variant="outline-primary"
        size="sm"
        className="m-2"
        onClick={logoutHandeler}
      >
        logout
      </Button>
    </div>
  );
}

export default HeaderSection;
