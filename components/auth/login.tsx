"use client";

import { Dispatch, FC, SetStateAction, useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../form-input";
import BtnWithLoading from "../btn-with-loading";
import { useLoginMutation } from "@/store/auth/auth-api";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const schema = Yup.object({
  email: Yup.string()
    .email("Your email is invalid")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must has at least 6 characters")
    .required("Please enter your password"),
});

interface Props {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setRoute: Dispatch<SetStateAction<string>>;
  refetch: any;
}

interface FormValues {
  email: string;
  password: string;
}

const Login: FC<Props> = ({ setRoute, setOpenModal, refetch }): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    await login(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successfully!");
      setOpenModal(false);
      refetch();
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div>
      <h3 className="form-title">Login with Elearning</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          id="email"
          label="Email"
          register={register("email")}
          errorMsg={errors.email?.message}
          placeholder="Example@gmail.com"
        />

        <div className="relative">
          <FormInput
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            register={register("password")}
            errorMsg={errors.password?.message}
            placeholder="At least 6 characters"
          />
          <div
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </div>
        </div>

        <BtnWithLoading
          content="LOGIN"
          isLoading={isLoading}
          customClasses="mt-6 w-full"
          type="submit"
        />

        <p className="mt-8 mb-2 text-center">Or join with</p>
        <div className="flex items-center justify-center gap-x-2">
          <FcGoogle
            size={30}
            className="cursor-pointer"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={30}
            className="cursor-pointer"
            onClick={() => signIn("github")}
          />
        </div>

        <p className="text-center mt-8">
          Not have any account?
          <span className="form-link" onClick={() => setRoute("signup")}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
