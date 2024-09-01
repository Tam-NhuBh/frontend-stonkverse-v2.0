"use client";

import BtnWithLoading from "@/components/btn-with-loading";
import NextImage from "@/components/next-image";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/store/layout/layout-api";
import { ChangeEvent, FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

interface Props {}

const EditHero: FC<Props> = (props): JSX.Element => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [touched, setTouched] = useState(false);

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  const updateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const editHandler = async () => {
    await editLayout({ type: "Banner", image, title, subTitle });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Update Hero Successfully!");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image.url);
    }
  }, [data]);

  useEffect(() => {
    if (
      title !== data?.layout?.banner.title ||
      subTitle !== data?.layout?.banner.subTitle ||
      image !== data?.layout?.banner?.image.url
    ) {
      setTouched(true);
    } else {
      setTouched(false);
    }
  }, [data, title, subTitle, image]);

  return (
    <>
      <div className="grid grid-cols-2 gap-10 mt-16 max-[1000px]:grid-cols-1">
        <div className="w-[80%] max-w-[500px] aspect-square relative mx-auto">
          <NextImage src={image} alt="Hero banner" priority />
          <label
            className="absolute w-16 h-16 right-5 bottom-5 bg-slate-500 rounded-full grid place-items-center cursor-pointer hover:scale-105 transition"
            htmlFor="banner"
          >
            <AiOutlineCamera className="text-dark_text" size={30} />
          </label>
          <input
            type="file"
            name="banner"
            id="banner"
            accept="image/*"
            hidden
            onChange={updateHandler}
          />
          <div className="hero-animation w-full h-full absolute -z-10 rounded-full transition"></div>
        </div>

        <div className="w-[90%] mx-auto flex flex-col justify-center">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="resize-none min-h-fit capitalize dark:text-dark_text text-[#000000c7] text-4xl leading-[60px] font-semibold bg-transparent outline-none"
          >
            {title}
          </textarea>
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="resize-none dark:text-[#edfff4] text-[#000000ac] text-medium mt-6 bg-transparent outline-none"
          >
            {subTitle}
          </textarea>
        </div>
      </div>
      <div className="w-[95%]">
        <BtnWithLoading
          content="SAVE"
          isLoading={isLoading}
          onClick={touched ? editHandler : null}
          customClasses={`ml-auto !w-[150px] ${
            touched
              ? "!bg-[#3e4396] cursor-pointer"
              : "text-slate-300 dark:!text-slate-900 !bg-[#8f8f8f34] dark:!bg-[#cccccc34] cursor-not-allowed"
          }`}
        />
      </div>
    </>
  );
};

export default EditHero;
