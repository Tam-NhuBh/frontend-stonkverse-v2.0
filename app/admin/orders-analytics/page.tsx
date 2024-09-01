"use client";

import OrdersAnalytics from "@/components/admin-pages/orders-analytics-page/orders-analytics";
import AdminProtectedPage from "@/components/admin-protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const OrdersAnalyticsPage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;
  return (
    <AdminProtectedPage title="Orders Analytics">
      <OrdersAnalytics />
    </AdminProtectedPage>
  );
};

export default OrdersAnalyticsPage;
