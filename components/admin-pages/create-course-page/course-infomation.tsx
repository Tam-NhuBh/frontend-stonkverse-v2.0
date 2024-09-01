"use client";

import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import FormInput from "@/components/form-input";
import { MdUpload } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import BottomNavigator from "./bottom-navigator";
import FormSelect from "@/components/form-select";
import axios from "axios";
import { CourseInfoValues } from "./create-course-form";
import ContainNextImage from "@/components/contain-next-image";
import toast from "react-hot-toast";


interface Props {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
  courseInfo: CourseInfoValues;
  initialCourseInfo?: any;
  setCourseInfo: Dispatch<SetStateAction<CourseInfoValues>>;
}

const courseInfoSchema = Yup.object({
  name: Yup.string().required("Please enter course's name"),
  description: Yup.string().required("Please enter course's description"),
  // category: Yup.string().required("Please choose course's category"),
  price: Yup.string().required("Please enter course's price"),
  estimatedPrice: Yup.string().required(
    "Please enter course's estimated price"
  ),
  tags: Yup.string().required("Please enter course's tags"),
  level: Yup.string().required("Please choose course's level"),
  demoUrl: Yup.string().required("Please enter course's demo video url"),
  thumbnail: Yup.string().required("Please upload course thumbnail image"),
  curriculum: Yup.string().required("Please upload curriculum pdf file of course"),
});

const level = ["Beginner", "Intermediate", "Expert"];

const CourseInfomation: FC<Props> = ({
  active,
  setActive,
  setCourseInfo,
  initialCourseInfo,
  courseInfo,
}): JSX.Element => {
  const [dragging, setDragging] = useState(false);
  const [draggingPDF, setDraggingPDF] = useState(false);

  // const [categories, setCategories] = useState([]);

  const courseInfoForm = useForm<CourseInfoValues>({
    defaultValues: initialCourseInfo,
    resolver: yupResolver(courseInfoSchema),
  });

  // const getAllCategories = async () => {
  //   const { data } = await axios(
  //     `${process.env.NEXT_PUBLIC_SERVER_URL}/get-layout/Categories`
  //   );
  //   const fetchCategories = data?.layout.categories.map(
  //     (item: { title: string }) => item.title
  //   );

  //   setCategories(fetchCategories);
  // };

  // useEffect(() => {
  //   getAllCategories();
  // }, []);

  const { register, handleSubmit, formState, setValue, watch } = courseInfoForm;
  const { errors } = formState;

  const thumbnail = watch("thumbnail");
  const curriculum = watch("curriculum");


  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setValue("thumbnail", reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  async function blobUrlToBase64(blobUrl: string): Promise<string> {
    const blob = await fetch(blobUrl).then(res => res.blob());

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async function base64ToBlobUrl(base64Data: string, mimeType: string): Promise<string> {
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    return URL.createObjectURL(blob);
  }

  const onSubmit = async (data: CourseInfoValues) => {
    setActive(active + 1);
    console.log(data);
    
    const file = await blobUrlToBase64(data.curriculum);

    data.curriculum = file;
    setCourseInfo(data);

  };

  const dragOverHandler = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const dragLeaveHandler = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const dropHandler = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setValue("thumbnail", reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    async function convertAndSetCurriculum() {
      if (courseInfo.curriculum && typeof courseInfo.curriculum === 'string') {
        //check base64 
        if (courseInfo.curriculum.startsWith('data:')) {
          const blobUrl = await base64ToBlobUrl(courseInfo.curriculum, 'application/pdf');
          setValue("curriculum", blobUrl);
        }
      }
    }
  
    convertAndSetCurriculum();
  }, [courseInfo.curriculum, setValue]);
  
  // // giải phóng blobUrl
  // useEffect(() => {
  //   return () => {
  //     if (curriculum?.startsWith('blob:')) {
  //       URL.revokeObjectURL(curriculum);
  //     }
  //   };
  // }, [curriculum]);

  const handleUploadPDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file && file.type === "application/pdf") {
        const pdfUrl = URL.createObjectURL(file);
        setValue("curriculum", pdfUrl);
        console.log("curriculum: ",pdfUrl)
      } else {
        toast.error("Only PDF files are allowed for the course curriculum.");
      }
    }
  };

  const dragOverHandlerPDF = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDraggingPDF(true);
  };

  const dragLeaveHandlerPDF = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDraggingPDF(false);
  };

  const dropHandlerPDF = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDraggingPDF(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        const pdfUrl = URL.createObjectURL(file);
        setValue("curriculum", pdfUrl);
      } else {
        toast.error("Only PDF files are allowed for the course curriculum.");
      }
    }
  };
  useEffect(() => {
    if (initialCourseInfo && initialCourseInfo.thumbnail) {
      const thumbnailUrl = initialCourseInfo.thumbnail.url;
      
      if (thumbnailUrl) {
        const updateThumbnail = async () => {
          const thumbnailBlobUrl = await blobUrlToBase64(thumbnailUrl);
          setValue("thumbnail", thumbnailBlobUrl);
        };
        
        updateThumbnail();
      }
    }
  }, [initialCourseInfo]);

  useEffect(() => {
    setValue("name", courseInfo.name);
    setValue("description", courseInfo.description);
    // setValue("category", courseInfo.category);
    setValue("price", courseInfo.price);
    setValue("estimatedPrice", courseInfo.estimatedPrice);
    setValue("level", courseInfo.level);
    setValue("tags", courseInfo.tags);
    setValue("demoUrl", courseInfo.demoUrl);
    setValue("thumbnail", courseInfo.thumbnail);
    setValue("curriculum", courseInfo.curriculum);

  }, [active]);

  useEffect(() => {
    if (initialCourseInfo) {
      setValue("name", initialCourseInfo.name);
      setValue("description", initialCourseInfo.description);
      // setValue("category", initialCourseInfo.category);
      setValue("price", initialCourseInfo.price);
      setValue("estimatedPrice", initialCourseInfo.estimatedPrice);
      setValue("level", initialCourseInfo.level);
      setValue("tags", initialCourseInfo.tags);
      setValue("demoUrl", initialCourseInfo.demoUrl);
      setValue("thumbnail", initialCourseInfo?.thumbnail?.url);
      setValue("curriculum", initialCourseInfo?.curriculum?.url);

    }
  }, [initialCourseInfo]);

  return (
    <div className="w-[80%] mx-auto mt-8 mb-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="name"
          label="Course Name"
          register={register("name")}
          errorMsg={errors.name?.message}
          placeholder="Enter course's name"
        />

        <FormInput
          id="description"
          label="Course Description"
          register={register("description")}
          errorMsg={errors.description?.message}
          textarea
          rows={10}
          placeholder="Write something"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            type="number"
            id="price"
            label="Dicounted Price"
            register={register("price")}
            errorMsg={errors.price?.message}
            placeholder="29"
      
          />

          <FormInput
            type="number"
            id="estimatedPrice"
            label="Price"
            register={register("estimatedPrice")}
            errorMsg={errors.estimatedPrice?.message}
            placeholder="79"

          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="tags"
            label="Course Tags"
            register={register("tags")}
            errorMsg={errors.tags?.message}
            placeholder="Stock, Marketing..."
          />
          {/* <FormSelect
            id="category"
            label="Category"
            options={categories}
            errorMsg={errors.category?.message}
            register={register("category")}
          /> */}


          {/* <div className="grid grid-cols-2 gap-4"> */}
           <FormSelect
            options={level}
            id={"level"} 
            label="Course Level"
            register={register("level")}
            errorMsg={errors.level?.message}          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="demoUrl"
            label="Demo URL"
            register={register("demoUrl")}
            errorMsg={errors.demoUrl?.message}
            placeholder="URL"
          />
        </div>

        <label htmlFor="thumbnail" className="form-input-label">
          Course Thumbnail
        </label>
        <label
          htmlFor="thumbnail"
          className={`w-full min-h-[350px] relative dark:border-white p-3 rounded-[5px] cursor-pointer border flex flex-col justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
            }`}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={dropHandler}
        >
          {thumbnail ? (
            <ContainNextImage
              src={thumbnail}
              alt="Thumbnail"
              className="py-3"
            />
          ) : (
            <span className="text-center">
              <MdUpload size={40} className="mx-auto mb-2" />
              Drag and drop your thumbnail here or click to browse
            </span>
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          id="thumbnail"
          hidden
          onChange={fileChangeHandler}
        />

        <label htmlFor="curriculum" className="form-input-label">
          Course Curriculum
        </label>
        <label
          htmlFor="curriculum"
          className={`w-full min-h-[550px] relative dark:border-white p-3 rounded-[5px] cursor-pointer border flex flex-col justify-center ${draggingPDF ? "bg-blue-500" : "bg-transparent"}`}
          onDragOver={dragOverHandlerPDF}
          onDragLeave={dragLeaveHandlerPDF}
          onDrop={dropHandlerPDF}
        >
          {curriculum ? (
            <object
            data={curriculum}
            type="application/pdf"
            width="100%"
            height="500px"
            style={{ marginTop: '20px'}}
          >
          </object>         
          ) : (
            <span className="text-center">
              <MdUpload size={40} className="mx-auto mb-2" />
              Drag and drop PDF file here or click to browse
            </span>
          )}
        </label>

        <input
          type="file"
          id="curriculum"
          accept="application/pdf"
          hidden
          onChange={(e) => handleUploadPDF(e)}
        /> 
        <BottomNavigator onlyNext customClasses="mt-4" />
      </form>
    </div>
  );
};

export default CourseInfomation;