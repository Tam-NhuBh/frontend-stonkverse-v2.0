import React, { FC, useEffect, useState } from "react";
import LoadingSpinner from "../loading-spinner";
import useUserInfo from "@/hooks/useUserInfo";
import { getCurrentUserProgress } from "@/lib/fetch-data";
import NoContentYet from "../no-content-yet";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  AccordionDetails,
  AccordionSummary,
  AccordionWrapper,
} from "../accordion-materials";

interface CourseScore {
  courseId: string;
  courseName: string;
  totalScore: number;
  totalMaxScore: number;
  completionRate: number;
  quizScores: { title: string; score: number }[];
}

interface Props {}

const UserLearningProgress: FC<Props> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [courseScores, setCourseScores] = useState<CourseScore[]>([]);
  const user = useUserInfo();
  const courseIds = user.courses.map((course: any) => course.courseId);

  const fetchUserTotalScore = async () => {
    setIsLoading(true);
    try {
      const fetchedData = await getCurrentUserProgress(courseIds);
      if (fetchedData) {
        setCourseScores(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching user scores:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTotalScore();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : courseScores.length === 0 ? (
        <NoContentYet description="You have not bought any courses" isSearch />
      ) : (
        <div className="max-h-screen overflow-y-auto">
          {courseScores.map((course) => (
            <AccordionWrapper key={course.courseId}>
              <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                <div className="flex justify-between w-full">
                  <div className="text-lg font-bold">{course.courseName}</div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-md font-bold mb-2">Learning Progress:</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[{ name: "Completion Rate", Rate: course.completionRate }]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: any) => `${value}%`} />
                        <Legend />
                        <Bar dataKey="Rate" fill="#0d9eae" name="Rate (%)"/>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="overflow-x-auto max-h-72">
                    <h4 className="text-md font-semibold mb-2">Quiz Scores:</h4>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Quiz Title
                          </th>
                          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">
                            Score
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {course.quizScores?.length > 0 ? (
                          course.quizScores.map((quiz) => (
                            <tr key={quiz.title}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">{quiz.title}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{quiz.score}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">None</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionDetails>
            </AccordionWrapper>
          ))}
        </div>
      )}
    </>
  );
};

export default UserLearningProgress;
