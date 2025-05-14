import { Avatar } from "@heroui/avatar";

const InstructorInfo = ({Instructor}:{Instructor:string}) => (
  <div className="w-full rounded-xl border border-gray-300 p-6 space-y-4 bg-white">
    <p className="text-xl font-bold">Instructor</p>
    <div className="flex flex-col lg:flex-row gap-3 items-center">
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" size="lg" />
      <div className="space-y-2 text-center lg:text-start">
        <div>
          <p className="text-lg font-semibold">{Instructor}</p>
          <p className="text-xs text-gray-500">Expert In Funds</p>
        </div>
        <p className="text-xs">
          Professional with over 10 years of experience in the field, passionate about teaching and helping students achieve their goals.
        </p>
      </div>
    </div>
  </div>
);

export default InstructorInfo;
