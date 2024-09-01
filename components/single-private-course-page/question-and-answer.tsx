import { FC, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../form-input";
import BtnWithLoading from "../btn-with-loading";
import { createQuestion } from "@/lib/mutation-data";
import toast from "react-hot-toast";
import Comment from "../comment";

import useUserInfo from "@/hooks/useUserInfo";
import { IQuestion } from "@/types";

interface Props {
  questions?: IQuestion[];
  courseId: string;
  contentId: string;
  refetch: any;
  activeTitle: string;
}

const schema = Yup.object().shape({
  title: Yup.string()
    .required("Please write title or summary of the question")
    .min(5, "Please write at least 5 characters")
    .max(255, "Please write less than 255 characters"),
  question: Yup.string()
    .required("Please provide more information about your problem")
    .min(5, "Details must be at least 5 characters"),
});

interface FormValues {
  title: string;
  question: string;
}

const QuestionAndAnswer: FC<Props> = ({
  questions,
  courseId,
  contentId,
  refetch,
  activeTitle,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserInfo();

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      question: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    const res = await createQuestion(
      data.title,
      data.question,
      courseId,
      contentId
    );

    if (res.success) {
      setIsLoading(false);
      toast.success("Add New Question Successfully!");
      reset();
      refetch();
    }
  };

  const formattedQuestion = [...(questions || [])]?.reverse() as IQuestion[];

  return (
    <div>
      <div className="border dark:border-slate-700 rounded-sm p-4">
        <p className="text-black dark:text-white font-bold">
          Tips on getting your questions answered faster
        </p>
        <ul className="list-disc ml-6 space-y-1 mt-2">
          <li>Search to see if your question has been asked before</li>
          <li>
            Be detailed; provide screenshots, error messages, code, or other
            clues whenever possible
          </li>
          <li>Check grammar and spelling</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <FormInput
          id="name"
          label="Title or summary"
          register={register("title")}
          errorMsg={errors.title?.message}
          placeholder="Eg: Why do we have to use Functional Component in React?"
        />
        <FormInput
          textarea
          id="question"
          rows={3}
          label="Details"
          register={register("question")}
          errorMsg={errors.question?.message}
          placeholder="Eg: At 05:28, I didn't understand this part, here is a screenshot of what I tried..."
        />

        <BtnWithLoading content="PUBLISH" isLoading={isLoading} type="submit" />
      </form>

      <h3 className="font-bold text-black dark:text-dark_text text-xl mt-6 mb-4">
        All questions in this lecture ({questions?.length})
      </h3>
      <div>
        {formattedQuestion.reverse().map((question) => (
          <Comment
            refetch={refetch}
            courseId={courseId}
            contentId={contentId}
            key={question?._id.toString()}
            questionId={question?._id.toString()}
            name={question?.user?.name}
            avatar={question?.user?.avatar?.url}
            content={question?.question}
            createdAt={question?.createdAt}
            title={question?.title}
            isQuestion
            questionReplies={question?.questionReplies}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionAndAnswer;
