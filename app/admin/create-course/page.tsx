"use client";

import CreateCourseForm from "@/components/admin-pages/create-course-page/create-course-form";
import AdminProtectedPage from "@/components/admin-protected-page";
import Heading from "@/components/heading";
import { useMount } from "@/hooks/useMount";
import { NextPage } from "next";

interface Props {}

const CreateCoursePage: NextPage<Props> = () => {
  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <AdminProtectedPage>
      <Heading
        title="Create Courses"
     />
      <CreateCourseForm />
    </AdminProtectedPage>
  );
};

export default CreateCoursePage;
