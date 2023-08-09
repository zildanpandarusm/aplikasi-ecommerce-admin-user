import React from 'react';
import Sidebar from '../../components/AdminComponents/AdminSidebar';
import '../../components/css/AdminStyle.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <main className="layoutKonten">{children}</main>
    </div>
  );
};

export default Layout;
