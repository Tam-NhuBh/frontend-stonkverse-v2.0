import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { CourseContentDataType } from "./create-course-form";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import FormInput from "@/components/form-input";
import { BsLink45Deg } from "react-icons/bs";
import toast from "react-hot-toast";
import BtnWithIcon from "@/components/btn-with-icon";
import BottomNavigator from "./bottom-navigator";
import { title } from "process";

interface Props {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
  courseContentData: CourseContentDataType;
  setCourseContentData: Dispatch<SetStateAction<CourseContentDataType>>;
  submitCourseHandler: () => void;
}

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  submitCourseHandler,
}): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const handleRemoveQuiz = (index: number, quizIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].quiz.splice(quizIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddQuiz = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].quiz.push({ title: "", correctAnswer: [], mockAnswer: [] });
    setCourseContentData(updatedData);
  };

  const handleCorrectAnswerChange = (index: number, quizIndex: number, answerIndex: number, value: string) => {
    const updatedData = [...courseContentData];
    updatedData[index].quiz[quizIndex].correctAnswer[answerIndex] = value;
    setCourseContentData(updatedData);
  };

  const handleChooseAnswerChange = (index: number, quizIndex: number, answerIndex: number, value: string) => {
    const updatedData = [...courseContentData];
    updatedData[index].quiz[quizIndex].mockAnswer[answerIndex] = value;
    setCourseContentData(updatedData);
  };

  const handleAddCorrectAnswer = (index: number, quizIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].quiz[quizIndex].correctAnswer.push("");
    setCourseContentData(updatedData);
  };

  const handleAddChooseAnswer = (index: number, quizIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].quiz[quizIndex].mockAnswer.push("");
    setCourseContentData(updatedData);
  };

  // const handleAnswerChange = (sectionIndex: number, questionIndex: number, option: string) => {
  //   const updatedAnswers = [...userAnswers];
  //   if (!updatedAnswers[sectionIndex]) {
  //     updatedAnswers[sectionIndex] = [];
  //   }
  //   updatedAnswers[sectionIndex][questionIndex] = option;
  //   setUserAnswers(updatedAnswers);
  // };

  // const submitQuiz = () => {
  //   let score = 0;
  //   courseContentData.forEach((section, sectionIndex) => {
  //     section.quiz.forEach((question, questionIndex) => {
  //       if (question.correctAnswer.includes(userAnswers[sectionIndex]?.[questionIndex])) {
  //         score += 1;
  //       }
  //     });
  //   });
  //   toast(`Your score is ${score} out of ${courseContentData.flatMap(section => section.quiz).length}`);
  // };


  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.length === 0 ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields");
    } else if (
      item.quiz.length > 0 &&
      (item.quiz[0].title === "" ||
        item.quiz[0].correctAnswer.length === 0 ||
        item.quiz[0].mockAnswer.length === 0)
    ) {
      toast.error("Please fill in all quiz fields or remove the quiz");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        videoLength: 0,
        links: [{ title: "", url: "" }],
        quiz: []

      };

      setCourseContentData([
        ...courseContentData,
        newContent,
      ] as CourseContentDataType);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].videoLength === 0 ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else if (
      courseContentData[courseContentData.length - 1].quiz.length > 0 &&
      (courseContentData[courseContentData.length - 1].quiz[0].title === "" ||
        courseContentData[courseContentData.length - 1].quiz[0].correctAnswer.length === 0 ||
        courseContentData[courseContentData.length - 1].quiz[0].mockAnswer.length === 0)
    ) {
      toast.error("Please fill in all quiz fields or remove the quiz");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: 0,
        videoSection: `${activeSection}`,
        links: [{ title: "", url: "" }],
        quiz: []

      };
      setCourseContentData([
        ...courseContentData,
        newContent,
      ] as CourseContentDataType);
    }
  };

  const backHandler = () => {
    setActive(active - 1);
  };

  const optionsHandler = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].videoLength === 0 ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill in all information");
    } else if (
      courseContentData[courseContentData.length - 1].quiz.length > 0 &&
      (courseContentData[courseContentData.length - 1].quiz[0].title === "" ||
        courseContentData[courseContentData.length - 1].quiz[0].correctAnswer.length === 0 ||
        courseContentData[courseContentData.length - 1].quiz[0].mockAnswer.length === 0)
    ) {
      toast.error("Please fill in all quiz fields or remove the quiz");
    } else {
      setActive(active + 1);
      submitCourseHandler();
    }
  };

  return (
    <>
      <div className="w-[80%] mx-auto mt-8 pb-6 border shadow-md dark:border-slate-700">
        <form onSubmit={handleSubmit}>
          {courseContentData?.map((item: any, index) => {
            const showSectionInput =
              index === 0 ||
              item.videoSection !== courseContentData[index - 1].videoSection;

            return (
              <div key={index} className="w-full pb-4">
                {showSectionInput && (
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      className="w-full cursor-pointer outline-slate-900 bg-gradient-to-r from-[#098b99] to-[#057fa8] text-dark_text text-2xl py-3 pl-6"
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoSection = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                      value={item.videoSection}
                    />
                  </div>
                )}

                <div className="flex w-full items-center justify-between p-6 pb-3">
                  {isCollapsed[index] ? (
                    <p className="dark:text-dark_text text-tertiary">
                      {index + 1}. {item.title || "Untitled"}
                    </p>
                  ) : (
                    <p className="text-lg font-semibold text-tertiary dark:text-dark_text">
                      Video Details
                    </p>
                  )}

                  <div className="flex items-center">
                    <div
                      className={`dark:text-dark_text mr-4 flex items-center gap-1 text-tertiary ${index > 0 ? "cursor-pointer" : "cursor-no-drop"
                        }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    >
                      <span className="underline text-sm">Delete Video</span>
                      <AiOutlineDelete size={18} className="-mt-[3px]" />
                    </div>

                    <div
                      className="dark:text-dark_text text-tertiary flex items-center gap-1 cursor-pointer"
                      onClick={() => handleCollapseToggle(index)}
                    >
                      <span className="underline text-sm">Collapse</span>
                      <MdOutlineKeyboardArrowDown
                        fontSize="large"
                        style={{
                          transform: isCollapsed[index]
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {!isCollapsed[index] && (
                  <>
                    <div className="my-3 px-6">
                      <FormInput
                        label="Video Title"
                        id="title"
                        placeholder="Project plan ..."
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />

                      <FormInput
                        label="Video URL"
                        id="video-url"
                        placeholder="https://..."
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />

                      <FormInput
                        label="Video Length"
                        type="number"
                        id="video-length"
                        placeholder="10"
                        value={item.videoLength}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoLength = Number(e.target.value);
                          setCourseContentData(updatedData);
                        }}
                      />

                      <FormInput
                        textarea
                        rows={8}
                        label="Video Description"
                        id="description"
                        placeholder="Write something about this video"
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />

                      {item.links.map((link: any, linkIndex: number) => (
                        <div key={linkIndex} className="mb-3 block">
                          <div className="w-full flex items-center justify-between mb-1">
                            <label className="form-input-label">
                              Link {linkIndex + 1}
                            </label>

                            <div
                              className={`${linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                                } text-tertiary dark:text-dark_text flex items-center gap-1`}
                              onClick={() => {
                                if (linkIndex !== 0) handleRemoveLink(index, linkIndex);
                              }}
                            >
                              <span className="underline text-sm">
                                Delete Link
                              </span>
                              <AiOutlineDelete
                                size={18}
                                className="-mt-[3px]"
                              />
                            </div>
                          </div>

                          <FormInput
                            label=""
                            id={`link-title-${linkIndex}`}
                            placeholder="Source Code ... (Link Title)"
                            value={link.title}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].links[linkIndex].title = e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />

                          <FormInput
                            label=""
                            id={`link-url-${linkIndex}`}
                            placeholder="Source Code URL... (Link URL)"
                            value={link.url}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].links[linkIndex].url = e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />
                        </div>
                      ))}

                      <div className="inline-block mb-6">
                        <p
                          className="flex items-center gap-1 dark:text-dark_text text-sm text-tertiary cursor-pointer"
                          onClick={() => handleAddLink(index)}
                        >
                          <span className="underline">Add More Link</span>
                          <BsLink45Deg className="-mt-[3px]" size={18} />
                        </p>
                      </div>

                      {item.quiz.map((quizs: any, quizIndex: number) => (
                        <div key={quizIndex} className="px-4 mb-4">
                          <FormInput
                            id={`quiz-title-${quizIndex}`}
                            label={`Quiz Title ${quizIndex + 1}`}
                            value={quizs.title}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].quiz[quizIndex].title = e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />

                          {quizs.correctAnswer.map((answer: string, answerIndex: number) => (
                            <FormInput
                              id={`correct-answer-${answerIndex}`}
                              key={answerIndex}
                              label={`Correct Answer ${answerIndex + 1}`}
                              value={answer}
                              onChange={(e) => handleCorrectAnswerChange(index, quizIndex, answerIndex, e.target.value)}
                            />
                          ))}

                          <div className="px-4 mb-4">
                            <BtnWithIcon
                              customClasses="mx-auto text-dark_text !bg-slate-700 w-fit !rounded-sm"
                              onClick={() => handleAddCorrectAnswer(index, quizIndex)}
                              icon={AiOutlinePlusCircle}
                              content="Add Correct Answer"
                            />
                          </div>

                          {quizs.mockAnswer.map((answer: string, answerIndex: number) => (
                            <FormInput
                              id={`choose-answer-${answerIndex}`}
                              key={answerIndex}
                              label={`Multiple-Choice Option ${answerIndex + 1}`}
                              value={answer}
                              onChange={(e) => handleChooseAnswerChange(index, quizIndex, answerIndex, e.target.value)}
                            />
                          ))}

                          <div className="px-4 mb-4">
                            <BtnWithIcon
                              content="Add Multiple-Choice Option"
                              icon={AiOutlinePlusCircle}
                              onClick={() => handleAddChooseAnswer(index, quizIndex)}
                            />
                          </div>

                          <AiOutlineDelete
                            className="cursor-pointer dark:text-dark_text mt-4"
                            onClick={() => handleRemoveQuiz(index, quizIndex)}
                          />
                        </div>
                      ))}

                      <div className="px-4 mb-4">
                        <BtnWithIcon
                          content="Add Quiz"
                          icon={AiOutlinePlusCircle}
                          onClick={() => handleAddQuiz(index)}
                        />
                      </div>


                    </div>


                    {index === courseContentData.length - 1 && (
                      <BtnWithIcon
                        customClasses="mx-auto text-dark_text !bg-slate-700 w-fit !rounded-sm !mt-6"
                        onClick={() => newContentHandler(item)}
                        icon={AiOutlinePlusCircle}
                        iconSize={20}
                        content="Add New Video"
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}

          <BtnWithIcon
            customClasses="mx-auto text-dark_text !bg-slate-700 w-fit !rounded-sm"
            onClick={addNewSection}
            icon={AiOutlinePlusCircle}
            iconSize={20}
            content="Add New Section"
          />

        </form>
      </div>

      <BottomNavigator
        backHandler={backHandler}
        nextHandler={optionsHandler}
        customClasses="w-[80%] my-12 mx-auto"
      />

    </>
  );
};
export default CourseContent;
