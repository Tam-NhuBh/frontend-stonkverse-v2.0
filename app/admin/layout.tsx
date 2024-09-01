"use client";

import AdminHeader from "@/components/admin-pages/layout/admin-header";
import AdminSidebar from "@/components/admin-pages/layout/admin-sidebar";
// import AdminProtectedPage from "@/components/admin-protected-page";
import BreadCrumbsComp from "@/components/layout/breadcrumbs";
import { FC, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

const AdminLayout: FC<Props> = ({ children }): JSX.Element | null => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className={`${!isCollapsed ? "w-[20%]" : "w-[5%]"}`}>
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      <div className="flex-1 transition">
        <div className="breadcrumbs-container">
          <div className="breadcrumbs-content">
            <BreadCrumbsComp />
          </div>
        </div>
        <AdminHeader />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
