"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";
import FormInput from "../form-input";
import BtnWithLoading from "../btn-with-loading";
import { addNewContact } from "@/lib/mutation-data";

interface Props {}

const schema = Yup.object({
  email: Yup.string()
    .email("Your email is invalid")
    .required("Please enter your email"),
  problem: Yup.string().required("Please enter your problem"),
  explain: Yup.string().required("Please explain about your problem"),
});

interface FormValues {
  email: string;
  problem: string;
  explain: string;
}

const MailForm: FC<Props> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  console.log("test:",isLoading)
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      problem: "",
      explain: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const res = await addNewContact(data);
      if (res.success) {
        toast.success("Sent Message Successfully!");
        setIsLoading(false);
        reset();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <form
      className="w-full bg-white dark:bg-slate-800 custom-shadow py-3 pb-5 px-5 rounded-sm space-y-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        id="email"
        label="Email"
        register={register("email")}
        errorMsg={errors.email?.message}
        placeholder="Eg: example@gmail.com"
      />

      <FormInput
        id="problem"
        label="Problem"
        register={register("problem")}
        errorMsg={errors.problem?.message}
        placeholder="Eg: Exchange, ..."
      />

      <FormInput
        textarea
        rows={1}
        id="explain"
        label="Explain your problem"
        register={register("explain")}
        errorMsg={errors.explain?.message}
      />

      <BtnWithLoading
        content="SEND"
        isLoading={isLoading}
        customClasses="mt-6 w-full"
        type="submit"
      />
    </form>
  );
};

export default MailForm;
