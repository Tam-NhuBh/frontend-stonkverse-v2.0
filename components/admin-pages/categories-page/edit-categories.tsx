"use client";

import { CategoriesFormValues } from "@/app/admin/categories/page";
import BtnWithIcon from "@/components/btn-with-icon";
import BtnWithLoading from "@/components/btn-with-loading";
import FormInput from "@/components/form-input";
import { useEditLayoutMutation } from "@/store/layout/layout-api";
import { RemoveCircle } from "@mui/icons-material";
import { FC, useEffect } from "react";
import {
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface Props {
  fields: Record<"id", string>[];
  register: UseFormRegister<CategoriesFormValues>;
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<CategoriesFormValues, "categories">;
  handleSubmit: UseFormHandleSubmit<CategoriesFormValues, undefined>;
  errors: FieldErrors<CategoriesFormValues>;
}

const EditCategories: FC<Props> = ({
  fields,
  register,
  remove,
  append,
  handleSubmit,
  errors,
}): JSX.Element => {
  const [editLayout, { isSuccess, isLoading, error }] = useEditLayoutMutation();

  const onSubmit = async (data: CategoriesFormValues) => {
    if (!isLoading) {
      await editLayout({ type: "Categories", categories: data.categories });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Update Categories Successfully!");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center font-bold text-2xl mb-8">ALL CATEGORIES</h1>
      {fields.map((field, index) => (
        <div className="relative" key={field.id}>
          <FormInput
            id={`categories ${index}`}
            label={`Categories ${index + 1}`}
            register={register(`categories.${index}.title` as const)}
            errorMsg={errors?.categories?.[index]?.title?.message}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-0 right-0 flex items-center gap-1 text-sm"
          >
            <RemoveCircle style={{ fontSize: "15px" }} /> Remove this
          </button>
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <BtnWithIcon
          content="Add Category"
          icon={AiOutlinePlusCircle}
          iconSize={18}
          onClick={() => append({ title: "" })}
          customClasses="!bg-[#3e4396]"
          type="button"
        />
        <BtnWithLoading
          content="Save"
          isLoading={isLoading}
          customClasses="!w-[130px] !bg-[#3e4396]"
          type="submit"
        />
      </div>
    </form>
  );
};

export default EditCategories;
