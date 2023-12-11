import React from 'react';
import { Wrapper, MenuContainer } from './side-panel-style';
import {menuArray} from './side-panel-data'
import {Link,Outlet} from 'react-router-dom'
import SideLink from './SideLink'

function SidePanel() {

  return (
    <Wrapper>
      <MenuContainer>
        {menuArray.map((menu) => (
         <SideLink  menu={menu} />
        ))}
        <Outlet />
      </MenuContainer>
    </Wrapper>
  );
}

export default SidePanel;
