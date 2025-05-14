import { ChapterType } from "@/types/Courses";

const CourseChapters = ({Chapters}:{Chapters:ChapterType[]}) => (
    <div className="w-full rounded-xl border border-gray-300 p-6 space-y-4 bg-white">
        <p className="text-xl font-bold">Course Content</p>
        <div className="flex flex-col gap-4 text-sm">
            {Chapters.slice(0, 3).map((ch, idx) => (
                <div className="rounded-md border border-gray-300 p-4 flex justify-between" key={idx}>
                    <p>Chapter {ch.order} : {ch.title}</p>
                    <p className="text-gray-600">{ch.duration} Min</p>
                </div>
            ))}
            <p className="text-gray-600 text-xs">+ {Math.max(Chapters.length - 3, 0)} more sections (total of {Chapters.length} lectures)</p>
        </div>
    </div>
);

export default CourseChapters;
