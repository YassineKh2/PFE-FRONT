import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Progress } from "@heroui/progress";

const EnrollmentStatistics = () => (
  <div className="p-6 border rounded-xl border-gray-300 space-y-4">
    <p className="text-2xl inline font-semibold ">Enrollment Statistics</p>
    <div className="flex gap-4  items-center">
      <Button isIconOnly className="rounded-full" size="md" disableAnimation>
        <Icon icon="tabler:users" width="24" height="24" style={{ color: "black" }} />
      </Button>
      <div>
        <p className="text-md text-gray-700 font-semibold">Total Enrolled</p>
        <p className="text-xl font-bold">20</p>
      </div>
    </div>
    <Progress size="sm" label="Completion Rate" showValueLabel={true} color="default" value={70} />
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col justify-center items-center border rounded-lg border-gray-300 p-3">
        <Icon icon="solar:user-check-broken" width="24" height="24" style={{ color: "#17C964" }} />
        <p className="text-sm text-gray-600">Total Enrolled</p>
        <p className="text-xl font-bold">20</p>
      </div>
      <div className="flex flex-col justify-center items-center border rounded-lg border-gray-300 p-3">
        <Icon icon="streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow" width="24" height="24" style={{ color: "#0f86fc" }} />
        <p className="text-sm text-gray-600">This Month</p>
        <p className="text-xl font-bold">+5</p>
      </div>
      <div className="flex flex-col justify-center items-center border rounded-lg border-gray-300 p-3">
        <Icon icon="mdi-light:clock" width="24" height="24" style={{ color: "fca60f" }} />
        <p className="text-sm text-gray-600">Avg. Completion</p>
        <p className="text-xl font-bold">8 days</p>
      </div>
      <div className="flex flex-col justify-center items-center border rounded-lg border-gray-300 p-3">
        <Icon icon="solar:quit-full-screen-circle-outline" width="24" height="24" style={{ color: "#F31260" }} />
        <p className="text-sm text-gray-600">Dropout Rate</p>
        <p className="text-xl font-bold">14%</p>
      </div>
    </div>
  </div>
);

export default EnrollmentStatistics;
