"use client";

import * as React from "react";

import { FaqFormValues } from "@/app/admin/faq/page";
import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import BtnWithIcon from "@/components/btn-with-icon";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import BtnWithLoading from "@/components/btn-with-loading";
import { useEditLayoutMutation } from "@/store/layout/layout-api";
import toast from "react-hot-toast";
import {
  AccordionDetails,
  AccordionSummary,
  AccordionWrapper,
} from "@/components/accordion-materials";

interface Props {
  fields: Record<"id", string>[];
  register: UseFormRegister<FaqFormValues>;
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<FaqFormValues, "questions">;
  handleSubmit: UseFormHandleSubmit<FaqFormValues, undefined>;
}

export default function FAQAccordion({
  fields,
  register,
  remove,
  append,
  handleSubmit,
}: Props) {
  const [expanded, setExpanded] = React.useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const [editLayout, { isSuccess, isLoading, error }] = useEditLayoutMutation();

  const onSubmit = async (data: FaqFormValues) => {
    if (!isLoading) {
      await editLayout({ type: "FAQ", faq: data.questions });
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Update FAQ Successfully!");
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
      <div className="shadow-md">
        {fields.map((field, index) => (
          <AccordionWrapper
            key={field.id}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              aria-controls={`panel${{ index }}d-content`}
              id={`panel${{ index }}d-header`}
              className="relative"
            >
              <div className="relative w-full flex justify-center items-center">
                <input
                  type="text"
                  className="w-full bg-transparent outline-none px-2"
                  {...register(`questions.${index}.question`)}
                />
              </div>
              <BtnWithIcon
                customClasses="absolute -right-20 -top-[3px] !bg-red-important"
                content="x"
                iconSize={18}
                onClick={() => remove(index)}
              />
            </AccordionSummary>
            <AccordionDetails>
              <textarea
                className="w-full bg-transparent outline-none"
                {...register(`questions.${index}.answer`)}
              />
            </AccordionDetails>
          </AccordionWrapper>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <BtnWithIcon
          content="Add FAQ"
          icon={AiOutlinePlusCircle}
          iconSize={18}
          onClick={() => append({ question: "", answer: "" })}
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
}
