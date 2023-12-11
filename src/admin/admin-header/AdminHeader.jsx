import React from 'react'
import { switchPanel } from '../../reducer/Reducer/tab/tabSlice';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';

function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const clientHandeler = () => {
       
      dispatch(switchPanel('CRI'));
      navigate('/can-criteria');
    };
  return (
    <div>
      AdminHeader AdminDashboard
      <Button
        variant="outline-primary"
        size="sm"
        className="m-2"
        onClick={clientHandeler}
      >
        Client
      </Button>
    </div>
  );
}

export default AdminHeader