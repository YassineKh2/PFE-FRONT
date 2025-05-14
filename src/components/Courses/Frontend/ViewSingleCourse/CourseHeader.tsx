import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Icon } from "@iconify/react";

interface CourseHeaderProps {
  image: string;
  category: string;
  level: string;
  title: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
}

const CourseHeader = ({
  image,
  category,
  level,
  title,
  description,
  duration,
  students,
  rating,
}: CourseHeaderProps) => (
  <div className="w-full rounded-xl border border-gray-300 bg-white">
    <Image radius="none" className="rounded-t-xl" src={image} />
    <div className="py-6 px-4 space-y-3">
      <div className="space-x-4">
        <Chip className="px-2" size="sm">{category}</Chip>
        <Chip className="px-2" size="sm" variant="bordered">{level}</Chip>
      </div>
      <p className="font-bold text-3xl">{title}</p>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="text-sm flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Icon icon="mdi-light:clock" width="20" height="20" />
          <p>{duration} hours</p>
        </div>
        <div className="flex items-center gap-1">
          <Icon icon="tabler:users" width="20" height="20" />
          <p>{students.toLocaleString()} students</p>
        </div>
        <div className="flex items-center text-[#dea529] gap-1">
          <Icon icon="material-symbols:star-rounded" width="20" height="20" style={{ color: "#dea529" }} />
          <p>{rating}</p>
        </div>
      </div>
    </div>
  </div>
);

export default CourseHeader;
