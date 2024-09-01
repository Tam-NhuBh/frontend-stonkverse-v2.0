import FormInput from "@/components/form-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import BottomNavigator from "./bottom-navigator";

type IValue = { title: string }[];

interface Props {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
  initialBenefits?: IValue;
  benefits: IValue;
  setBenefits: Dispatch<SetStateAction<IValue>>;
  initialPrerequisites?: IValue;
  prerequisites: IValue;
  setPrerequisites: Dispatch<SetStateAction<IValue>>;
  initialForWho?: IValue;
  forWho: IValue;
  setForWho: Dispatch<SetStateAction<IValue>>;
}

type CourseDataValues = {
  benefits: IValue;
  prerequisites: IValue;
  forWho: IValue;
};

const schema: any = yup.object({
  benefits: yup.lazy(() =>
    yup.array().of(
      yup.object({
        title: yup.string().required("Please fill this benefit field"),
      })
    )
  ),
  prerequisites: yup.lazy(() =>
    yup.array().of(
      yup.object({
        title: yup.string().required("Please fill this prerequisite field"),
      })
    )
  ),
  forWho: yup.lazy(() =>
    yup.array().of(
      yup.object({
        title: yup.string().required("Please fill this field first"),
      })
    )
  ),
});

const CourseData: FC<Props> = ({
  active,
  setActive,
  setBenefits,
  setPrerequisites,
  benefits,
  prerequisites,
  forWho,
  setForWho,
  initialBenefits,
  initialPrerequisites,
  initialForWho,
}): JSX.Element => {
  const form = useForm<CourseDataValues>({
    defaultValues: {
      benefits: [{ title: "" }],
      prerequisites: [{ title: "" }],
      forWho: [{ title: "" }],
    },
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  const {
    fields: benefitFields,
    append: benefitAppend,
    remove: benefitRemove,
  } = useFieldArray({
    name: "benefits",
    control,
  });

  const {
    fields: prerequisiteFields,
    append: prerequisiteAppend,
    remove: prerequisiteRemove,
  } = useFieldArray({
    name: "prerequisites",
    control,
  });

  const {
    fields: forWhoFields,
    append: forWhoAppend,
    remove: forWhoRemove,
  } = useFieldArray({
    name: "forWho",
    control,
  });

  const backHandler = () => {
    setActive(active - 1);
  };

  const onSubmit = (data: CourseDataValues) => {
    setActive(active + 1);
    setBenefits(data.benefits);
    setPrerequisites(data.prerequisites);
    setForWho(data.forWho);
  };

  useEffect(() => {
    setValue("benefits", benefits);
    setValue("prerequisites", prerequisites);
    setValue("forWho", forWho);
  }, [active]);

  useEffect(() => {
    if (initialBenefits && initialBenefits.length) {
      setValue("benefits", initialBenefits);
    }

    if (initialPrerequisites && initialPrerequisites.length) {
      setValue("prerequisites", initialPrerequisites);
    }

    if (initialForWho && initialForWho.length) {
      setValue("forWho", initialForWho);
    }
  }, [initialBenefits, initialPrerequisites, initialForWho]);

  return (
    <form
      className="w-[80%] mx-auto mt-8 my-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Benefits */}
      <h2 className="text-xl font-bold mb-4">
        What are some benefits when take part in this course?
      </h2>
      <div className="">
        {benefitFields.map((field, index) => (
          <div className="relative" key={field.id}>
            <FormInput
              id="benefits"
              label={`Benefit ${index + 1}`}
              register={register(`benefits.${index}.title` as const)}
              placeholder="You will be able to build a full stack LMS Platform ..."
              errorMsg={errors?.benefits?.[index]?.title?.message}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => benefitRemove(index)}
                className="absolute top-0 right-0 flex items-center gap-1 text-sm"
              >
                <RemoveCircle style={{ fontSize: "15px" }} /> Remove this
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => benefitAppend({ title: "" })}
          className="flex items-center gap-1"
        >
          <AddCircle /> Add more benefit
        </button>
      </div>

      {/* Prerequisites */}
      <h2 className="text-xl font-bold mb-4 mt-12">
        What are some prequesites for starting this course?
      </h2>
      <div className="">
        {prerequisiteFields.map((field, index) => (
          <div className="relative" key={field.id}>
            <FormInput
              id="prerequisites"
              label={`Prerequisite ${index + 1}`}
              register={register(`prerequisites.${index}.title` as const)}
              placeholder="You need basic knowledge of MERN stack"
              errorMsg={errors?.prerequisites?.[index]?.title?.message}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => prerequisiteRemove(index)}
                className="absolute top-0 right-0 flex items-center gap-1 text-sm"
              >
                <RemoveCircle style={{ fontSize: "15px" }} /> Remove this
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => prerequisiteAppend({ title: "" })}
          className="flex items-center gap-1"
        >
          <AddCircle /> Add more prerequisite
        </button>
      </div>

      {/* Who is this course for */}
      <h2 className="text-xl font-bold mb-4 mt-12">Who is this course for?</h2>
      <div className="">
        {forWhoFields.map((field, index) => (
          <div className="relative" key={field.id}>
            <FormInput
              id="forWho"
              label={`Who is this course for ${index + 1}`}
              register={register(`forWho.${index}.title` as const)}
              placeholder="This course are for those who want to live life with fitness"
              errorMsg={errors?.forWho?.[index]?.title?.message}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => forWhoRemove(index)}
                className="absolute top-0 right-0 flex items-center gap-1 text-sm"
              >
                <RemoveCircle style={{ fontSize: "15px" }} /> Remove this
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => forWhoAppend({ title: "" })}
          className="flex items-center gap-1"
        >
          <AddCircle /> Add more
        </button>
      </div>

      <BottomNavigator backHandler={backHandler} />
    </form>
  );
};

export default CourseData;
