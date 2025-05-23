import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Radio, RadioGroup } from "@heroui/radio";

import { useAuth } from "@/providers/AuthProvider";
import { GetCourse } from "@/services/Course";
import { CourseType, QuizQuestion as QuizQuestionType } from "@/types/Courses";
import { Navbar } from "@/components/Chapters/Frontend/Navbar";
import { title } from "@/components/primitives";
import { cn } from "@/lib/tiptap-utils";
import { GetQuizzes } from "@/services/Quiz";

function Quiz() {
  const [Course, setCourse] = useState<CourseType>({} as CourseType);
  const [started, setStarted] = useState(false);
  const [Questions, setQuestions] = useState<QuizQuestionType[]>(
    [] as QuizQuestionType[]
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [QuizProgress, setProgress] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [countdown, setCountdown] = useState(900);

  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    GetCourse(id).then((response) => {
      setCourse(response.data);
      GetQuizzes(id).then((response) => {
        setQuestions(response.data[0].questions);
      });
    });
  }, []);

  if (!Course) return <p>Loading...</p>;

  const handleOptionChange = (qid: number, value: string) => {
    setAnswers((prev) => {
      console.log(prev);
      return { ...prev, [qid]: value };
    });
  };

  const handlePrev = () => {
    setCurrentIdx((idx) => Math.max(0, idx - 1));
  };

  const handleNext = () => {
    setCurrentIdx((idx) => Math.min(Questions.length - 1, idx + 1));
  };

  useEffect(() => {
    setProgress(Object.keys(answers).length);
  }, [answers]);

  useEffect(() => {
    if (
      Object.keys(answers).length === Questions.length &&
      Questions.length > 0
    ) {
      let correct = 0;
      Questions.forEach((q, idx) => {
        if (answers[idx] === q.answer) correct++;
      });
      setScore(correct);
      setPassed((correct / Questions.length) * 100 >= 70);
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [answers, Questions]);

  useEffect(() => {
    if (!started) return;
    if (countdown <= 0) {
      let correct = 0;
      Questions.forEach((q, idx) => {
        if (answers[idx] === q.answer) correct++;
      });
      setScore(correct);
      setPassed((correct / Questions.length) * 100 >= 70);
      setShowResult(true);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 900);
    return () => clearInterval(timer);
  }, [started, countdown, Questions, answers]);

  return (
    <>
      <Navbar
        CourseTitle={Course.title}
        inDashboard={true}
        countdown={countdown}
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
        <div className="flex flex-col gap-6 border border-gray-300 rounded-xl p-6 w-[95%] lg:w-[80%] xl:w-[50%]">
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
          ) : showResult ? (
            <div className="flex flex-col items-center text-center gap-8">
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`p-4 rounded-full ${passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  <Icon
                    height="60"
                    icon={passed ? "iconoir:medal" : "material-symbols:cancel"}
                    width="60"
                  />
                </div>
                <p className="text-2xl font-bold">
                  {passed ? "Congratulations! You Passed!" : "You Did Not Pass"}
                </p>
                <p className="text-sm text-gray-600">
                  {passed
                    ? "You've successfully completed the quiz and demonstrated your understanding of the course material."
                    : "You did not reach the passing score. Please review the material and try again."}
                </p>
              </div>
              <Progress
                showValueLabel
                classNames={{
                  indicator: passed ? "bg-green-500" : "bg-red-500",
                }}
                className="max-w-md"
                label="Your Score"
                value={Math.round((score / Questions.length) * 100)}
              />
              <div className="flex gap-1">
                <Icon
                  className={passed ? "text-green-500" : "text-red-500"}
                  height="24"
                  icon={
                    passed
                      ? "material-symbols:check-circle"
                      : "material-symbols:cancel"
                  }
                  width="24"
                />
                <strong>{score}</strong>
                <p>Out of</p>
                <strong>{Questions.length}</strong>
                <p>questions answered correctly</p>
              </div>
              <div className="flex justify-center gap-2">
                <Button
                  startContent={
                    <Icon icon="iconamoon:restart" width="18" height="18" />
                  }
                  variant="bordered"
                  onPress={() => {
                    setCountdown(900);
                    setAnswers({});
                    setCurrentIdx(0);
                    setShowResult(false);
                  }}
                >
                  Restart Quiz
                </Button>
                {passed && (
                  <Button
                    endContent={
                      <Icon
                        className="rotate-90"
                        height="20"
                        icon="majesticons:arrow-up"
                        width="20"
                      />
                    }
                    className="text-white"
                    color="success"
                    onPress={() => {
                      navigate(`/courses/congrats/${id}`);
                    }}
                  >
                    Complete Course
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <QuizPanel
              QuizProgress={QuizProgress}
              Questions={Questions}
              currentIdx={currentIdx}
              setCurrentIdx={setCurrentIdx}
              answers={answers}
              handleOptionChange={handleOptionChange}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
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
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const QuizQuestion = ({
  question,
  selected,
  onChange,
  id,
}: {
  question: QuizQuestionType;
  selected: string;
  onChange: (qid: number, value: string) => void;
  id: number;
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <p className="text-xl font-semibold">{question.question}</p>
      <RadioGroup value={selected} onValueChange={(val) => onChange(id, val)}>
        {question.options.map((opt: string) => (
          <CustomRadio key={opt} value={opt}>
            {opt}
          </CustomRadio>
        ))}
      </RadioGroup>
    </div>
  );
};

const QuizPanel = ({
  QuizProgress,
  Questions,
  currentIdx,
  setCurrentIdx,
  answers,
  handleOptionChange,
  handlePrev,
  handleNext,
}: {
  QuizProgress: number;
  Questions: QuizQuestionType[];
  currentIdx: number;
  setCurrentIdx: (idx: number) => void;
  answers: { [key: string]: string };
  handleOptionChange: (qid: number, value: string) => void;
  handlePrev: () => void;
  handleNext: () => void;
}) => (
  <>
    <div className="flex flex-col gap-2">
      <p className="font-semibold">Quiz Details</p>
      <p className="text-gray-600 text-sm">
        {QuizProgress} of {Questions.length} questions answered
      </p>
      <Progress value={(QuizProgress / Questions.length) * 100} />
    </div>
    <div className="flex flex-wrap gap-2">
      {Questions.map((q, idx) => (
        <Button
          key={idx}
          isIconOnly
          variant="bordered"
          onPress={() => setCurrentIdx(idx)}
          color={
            currentIdx === idx
              ? "primary"
              : answers[idx]
                ? "success"
                : undefined
          }
          aria-label={`Go to question ${idx + 1}`}
        >
          <Icon
            height="24"
            icon={
              currentIdx === idx
                ? "material-symbols:radio-button-checked"
                : answers[idx]
                  ? "material-symbols:check-circle"
                  : "material-symbols:circle-outline"
            }
            width="24"
          />
        </Button>
      ))}
    </div>
    {Questions.length > 0 && (
      <QuizQuestion
        id={currentIdx}
        question={Questions[currentIdx]}
        selected={answers[currentIdx]}
        onChange={handleOptionChange}
      />
    )}
    <Divider />
    <div className="flex justify-between">
      <Button
        variant="bordered"
        onPress={handlePrev}
        disabled={currentIdx === 0}
      >
        Previous
      </Button>
      <Button
        color="primary"
        onPress={handleNext}
        disabled={currentIdx === Questions.length - 1}
      >
        Next
      </Button>
    </div>
  </>
);
