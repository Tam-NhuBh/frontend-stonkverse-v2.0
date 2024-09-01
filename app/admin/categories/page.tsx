"use client"; 

import EditCategories from "@/components/admin-pages/categories-page/edit-categories";
import AdminProtectedPage from "@/components/admin-protected-page";
import { useMount } from "@/hooks/useMount";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { NextPage } from "next";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

interface Props {}

export interface ICategory {
  title: string;
}

export type CategoriesFormValues = {
  categories: ICategory[];
};

const schema: any = yup.object({
  categories: yup.lazy(() =>
    yup.array().of(
      yup.object({
        title: yup.string().required("Please fill this category"),
      })
    )
  ),
});

const CategoriesPage: NextPage<Props> = () => {
  const fetchInitialData = async () => {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-layout/Categories`
    );

    const fetchCategories = data?.layout.categories.map((item: ICategory) => ({
      title: item.title,
    }));

    return { categories: fetchCategories };
  };

  const form = useForm<CategoriesFormValues>({
    defaultValues: async () => {
      return await fetchInitialData();
    },
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;

  const { errors } = formState;

  const { fields, remove, append } = useFieldArray({
    name: "categories",
    control,
  });

  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <AdminProtectedPage title="Edit Categories | E-Learning">
      <div className="w-1/2 mx-auto my-24">
        <EditCategories
          fields={fields}
          register={register}
          remove={remove}
          append={append}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </AdminProtectedPage>
  );
};

export default CategoriesPage;
