import React from 'react'
import { switchPanel } from '../../../reducer/Reducer/tab/tabSlice';
import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
function SideLink({ menu }) {
const navigate = useNavigate();
const dispatch = useDispatch();

 const linkHandeler = () => {
    dispatch(switchPanel(menu.label));
    navigate(menu.page);
  };

  return (
    <div className="menu-link" onClick={linkHandeler}>
      <span class="menu-bullet">
        <span class="bullet bullet-dot"></span>
      </span>
      <span class="menu-title">{menu.text}</span>
    </div>
  );
}

export default SideLink