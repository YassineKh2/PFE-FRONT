import {Card} from "@heroui/card";
import {Icon} from "@iconify/react";

// Mocked course and user progress data
const course = {
  id: "1",
  title: "React for Beginners",
  description: "Learn React from scratch.",
  duration: "120", // in minutes
  level: "Beginner",
  category: "Web Development",
  image: "",
  status: "published",
  instructor: "Jane Doe",
  chapters: [
    { id: "c1", title: "Intro", duration: "10" },
    { id: "c2", title: "JSX", duration: "20" },
    { id: "c3", title: "Components", duration: "30" },
    { id: "c4", title: "State", duration: "30" },
    { id: "c5", title: "Hooks", duration: "30" },
  ],
};

const userProgress = {
  completedChapters: ["c1", "c2", "c3"], // user has completed 3 out of 5
};

const totalChapters = course.chapters.length;
const completed = userProgress.completedChapters.length;
const progress = `${completed} / ${totalChapters}`;
const completionRate = ((completed / totalChapters) * 100).toFixed(0) + "%";
const totalDuration = course.chapters.reduce((sum, ch) => sum + Number(ch.duration), 0);

const courseStats = [
  {
    title: "Total Chapters",
    value: totalChapters,
    sub: progress + " completed",
    iconName: "solar:book-2-linear",
    color: "info",
  },
  {
    title: "Total Duration",
    value: totalDuration + " min",
    sub: "",
    iconName: "solar:clock-circle-linear",
    color: "warning",
  },
  {
    title: "Completion Rate",
    value: completionRate,
    sub: "",
    iconName: "solar:chart-2-linear",
    color: "success",
  },
  {
    title: "Level",
    value: course.level,
    sub: course.instructor,
    iconName: "solar:ranking-linear",
    color: "primary",
  },
];

export default function Cards() {
  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
      {courseStats.map(({ title, value, sub, iconName, color }, index) => (
        <Card key={index} className="border border-transparent dark:border-default-100">
          <div className="flex p-4 items-center gap-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-md bg-${color}-50`}>
              <Icon className={`text-${color}`} icon={iconName} width={24} />
            </div>
            <div className="flex flex-col gap-y-1">
              <dt className="text-small font-medium text-default-500">{title}</dt>
              <dd className="text-2xl font-semibold text-default-700">{value}</dd>
              {sub && <span className="text-xs text-default-400">{sub}</span>}
            </div>
          </div>
        </Card>
      ))}
    </dl>
  );
}
