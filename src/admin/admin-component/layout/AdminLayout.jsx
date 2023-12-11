import React from 'react';
import { Wrapper, SidePanelStyl, MainPanel } from './Layout-style';
import SidePanel from '../side-panel/SidePanel';
import AdminHeader from '../../admin-header/AdminHeader';

function AdminLayout({ children }) {
  return (
    <Wrapper>
      <SidePanelStyl>
        <SidePanel />
      </SidePanelStyl>
      <MainPanel>
        <AdminHeader />
        {children}
      </MainPanel>
    </Wrapper>
  );
}

export default AdminLayout;
