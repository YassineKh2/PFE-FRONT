import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Radio, RadioGroup } from "@heroui/radio";

import { useAuth } from "@/providers/AuthProvider";
import { GetCourse } from "@/services/Course";
import { GetSingleProgress } from "@/services/User";
import { CourseType, ProgressType } from "@/types/Courses";
import { Navbar } from "@/components/Chapters/Frontend/Navbar";
import { title } from "@/components/primitives";
import { cn } from "@/lib/tiptap-utils";

function Quiz() {
  const [progress, setprogress] = useState<ProgressType>({} as ProgressType);
  const [Course, setCourse] = useState<CourseType>({} as CourseType);
  const [started, setStarted] = useState(false);

  const { id } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!id) return;
    GetCourse(id).then((response) => {
      setCourse(response.data);
    });
  }, []);

  useEffect(() => {
    if (!Course) return;

    GetSingleProgress(currentUser.uid, Course.id || "").then((res) => {
      setprogress(res.data);
    });
  }, [Course]);

  if (!Course) return <p>Loading...</p>;

  return (
    <>
      <Navbar
        CourseTitle={Course.title}
        inDashboard={true}
        progress={progress}
      />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-20 ">
        <div className="text-center">
          <p className={title({ size: "sm", boldness: "bold" })}>
            {Course.title} - Final Quiz
          </p>
          <p className="text-gray-500 ">
            Test your knowledge of {Course.title}
          </p>
        </div>
        <div className="flex flex-col gap-6 border border-gray-300 rounded-xl p-6 w-[95%] lg:w-[80%] xl:w-[45%]">
          {!started ? (
            <>
              <QuizRules />
              <Button
                className="self-start p-6"
                color="primary"
                onPress={() => setStarted(true)}
              >
                Start Quiz
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Quiz Details</p>
                <p className="text-gray-600 text-sm">
                  0 of 10 questions answered
                </p>
                <Progress value={0} />
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(10)].map((_, idx) => (
                  <Button key={idx} isIconOnly variant="bordered">
                    <Icon
                      height="24"
                      icon="material-symbols:circle-outline"
                      width="24"
                    />
                  </Button>
                ))}
              </div>
              <QuizQuestion />
              <Divider />
              <div className="flex justify-between">
                <Button variant="bordered">Previous</Button>
                <Button color="primary">Next</Button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Quiz;

const QuizRules = () => (
  <>
    <div className="flex flex-col">
      <p className="text-xl font-semibold">Course Final Quiz</p>
      <p className="text-gray-600">
        This quiz will test your knowledge of the concepts covered in this
        course. You&apos;ll need to score at least 70% to pass.
      </p>
    </div>
    <Divider />
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-lg font-semibold mb-2">Quiz Details</p>
        <ul className="text-gray-700 text-sm list-disc list-inside space-y-2">
          <li>Number of questions: 10</li>
          <li>Time limit: 15 minutes</li>
          <li>Question types: Multiple choice</li>
          <li>Passing score: 70%</li>
        </ul>
      </div>
      <Divider />
      <div>
        <p className="text-lg font-semibold mb-2">Instructions</p>
        <ul className="text-gray-700 text-sm list-disc list-inside space-y-2">
          <li>Read each question carefully before answering</li>
          <li>
            You can navigate between questions using the navigation buttons
          </li>
          <li>You can review and change your answers before submitting</li>
          <li>The timer will start once you begin the quiz</li>
          <li>
            If the timer runs out, your quiz will be automatically submitted
          </li>
        </ul>
      </div>
    </div>
  </>
);

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "border-gray-300 inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-4 p-3 border-2 max-w-4xl",
          "data-[selected=true]:border-primary",
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const QuizQuestion = () => {
  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <p className="text-xl font-semibold">
          Which hook is used to perform side effects in a function component?
        </p>
        <RadioGroup>
          <CustomRadio value="free">Free</CustomRadio>
          <CustomRadio value="Pro">Pro</CustomRadio>
          <CustomRadio value="Enterprise">Enterprise</CustomRadio>
          <CustomRadio value="Custom">Custom</CustomRadio>
        </RadioGroup>
      </div>
    </>
  );
};
