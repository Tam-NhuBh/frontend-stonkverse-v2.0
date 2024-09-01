"use client";

import FAQAccordion from "@/components/admin-pages/faq-page/faq-accordion";
import AdminProtectedPage from "@/components/admin-protected-page";
import { useMount } from "@/hooks/useMount";
import axios from "axios";
import { Types } from "mongoose";
import { NextPage } from "next";
import { useFieldArray, useForm } from "react-hook-form";

interface Props {}

export interface IFaq {
  _id: Types.ObjectId;
  answer: string;
  question: string;
}

export type FaqFormValues = {
  questions: { question: string; answer: string }[];
};

const FAQPage: NextPage<Props> = () => {
  const fetchInitialData = async () => {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-layout/FAQ`
    );

    const fetchedQuestions = data?.layout.faq.map((item: IFaq) => ({
      question: item.question,
      answer: item.answer,
    }));
    return { questions: fetchedQuestions };
  };

  const form = useForm<FaqFormValues>({
    defaultValues: async () => {
      return await fetchInitialData();
    },
  });

  const { register, control, handleSubmit, formState } = form;

  const { fields, remove, append } = useFieldArray({
    name: "questions",
    control,
  });

  const hasMounted = useMount();

  if (!hasMounted) return null;

  return (
    <AdminProtectedPage>
      <div className="w-[75%] mt-8 ml-8 mr-auto">
        <FAQAccordion
          fields={fields}
          register={register}
          remove={remove}
          append={append}
          handleSubmit={handleSubmit}
        />
      </div>
    </AdminProtectedPage>
  );
};

export default FAQPage;
