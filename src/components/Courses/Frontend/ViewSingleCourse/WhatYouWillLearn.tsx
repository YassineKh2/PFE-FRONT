import { Icon } from "@iconify/react";

const learnList = [
  "Comprehensive understanding of the subject",
  "Practical skills applicable to real-world scenarios",
  "Industry-standard techniques and methodologies",
  "Portfolio-ready projects and assignments",
];

const WhatYouWillLearn = () => (
  <div className="w-full rounded-xl border border-gray-300 p-6 space-y-4 bg-white">
    <p className="text-xl font-bold">What you'll learn</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      {learnList.map((item, idx) => (
        <div className="flex items-center gap-1" key={idx}>
          <Icon icon="ic:round-check" width="24" height="24" style={{ color: "#18bc05" }} />
          <p>{item}</p>
        </div>
      ))}
    </div>
  </div>
);

export default WhatYouWillLearn;
