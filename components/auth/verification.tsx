"use client";

import {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  FormEvent,
} from "react";
import { toast } from "react-hot-toast";
import OtpInput from "react-otp-input";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/store/auth/auth-api";
import BtnWithLoading from "../btn-with-loading";

interface Props {
  setRoute: Dispatch<SetStateAction<string>>;
}

const Verification: FC<Props> = ({ setRoute }): JSX.Element => {
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error, isLoading }] = useActivationMutation();
  const [otp, setOtp] = useState("");
  const [invalidError, setInvalidError] = useState(false);

  const verifyHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setInvalidError(true);
      return;
    }

    await activation({ activation_token: token, activation_code: otp });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully!");
      setRoute("login");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occured:", error);
      }
    }
  }, [isSuccess, error]);

  return (
    <form onSubmit={verifyHandler}>
      <h3 className="form-title">Verify Your Account</h3>

      <div className="mx-auto mt-2 w-20 h-20 rounded-full text-dark_text main-gradient flex items-center justify-center">
        <VscWorkspaceTrusted size={45} />
      </div>

      <div className="validate-inputs">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderInput={(props) => <input {...props} />}
          inputStyle={invalidError ? "shake !border-red-500" : ""}
        />
      </div>

      <div className="text-center">
        <BtnWithLoading
          content="Verify OTP"
          isLoading={isLoading}
          customClasses="mt-6 mb-0 !w-[74%] !mx-auto"
          type="submit"
        />
      </div>

      <p className="text-center pt-4 text-slate-700 dark:text-dark_text my-3">
        Go back to sign in?
        <span className="form-link" onClick={() => setRoute("login")}>
          Sign in
        </span>
      </p>
    </form>
  );
};

export default Verification;
