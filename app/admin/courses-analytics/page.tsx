"use client";

import CoursesAnalytics from "@/components/admin-pages/courses-analytics-page/courses-analytics";
import AdminProtectedPage from "@/components/admin-protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const CourseAnalyticsPage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;
  return (
    <AdminProtectedPage title="Courses Analytics">
      <CoursesAnalytics />
    </AdminProtectedPage>
  );
};

export default CourseAnalyticsPage;
