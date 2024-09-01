import {
  useElements,
  useStripe,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { IFetchedCourse } from "../home-page/courses";
import BtnWithLoading from "../btn-with-loading";
import { AiOutlineWarning } from "react-icons/ai";
import { createOrder } from "@/lib/mutation-data";
import { useLoadUserQuery } from "@/store/api-slice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useUserInfo from "@/hooks/useUserInfo";

interface Props {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  courseDetail: IFetchedCourse;
}

const CheckOutForm: FC<Props> = ({ courseDetail }): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const user = useUserInfo();

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setIsLoading(false);
      setMessage(error.message as string);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      const orderData = await createOrder(
        courseDetail._id.toString(),
        paymentIntent
      );

      if (orderData) {
        toast.success("Purchased Course Sucessfully!");
        setLoadUser(true);
        router.push(`/course-access/${courseDetail._id}`);
      }
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <BtnWithLoading
        disabled={isLoading || !stripe || !elements}
        id="submit"
        type="submit"
        content={`Pay Now`}
        isLoading={isLoading}
        customClasses="my-4"
      />
      {message && (
        <p className="text-xs text-red-700 mt-1 flex items-center gap-[2px]">
          <AiOutlineWarning />
          {message}
        </p>
      )}
    </form>
  );
};

export default CheckOutForm;