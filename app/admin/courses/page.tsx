"use client";

import AllCourses from "@/components/admin-pages/courses-page/all-courses";
import ProtectedPage from "@/components/protected-page";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const AllCoursesPage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <ProtectedPage>
      <AllCourses />
    </ProtectedPage>
  );
};

export default AllCoursesPage;
