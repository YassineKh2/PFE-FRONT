import { Icon } from "@iconify/react/dist/iconify.js";
import { Switch } from "@heroui/switch";
import { cn } from "@heroui/theme";

const Settings = () => (
  <div className="p-6 border rounded-xl border-gray-300 space-y-4">
    <div className="flex items-center gap-1">
      <Icon icon="mage:settings" width="20" height="20" style={{ color: "black" }} />
      <p className="text-2xl inline font-semibold ">Course Settings</p>
    </div>
    <div className="space-y-6">
      <Switch
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md ",
            "justify-between cursor-pointer"
          ),
        }}
        color="default"
        size="sm"
      >
        <div className="flex flex-col -ms-1.5">
          <p className="text-sm font-semibold">Public Visibility</p>
          <p className="text-xs text-gray-500">Make this course visible to everyone</p>
        </div>
      </Switch>
      <Switch
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md ",
            "justify-between cursor-pointer"
          ),
        }}
        color="default"
        size="sm"
      >
        <div className="flex flex-col -ms-1.5">
          <p className="text-sm font-semibold">Open Enrollment</p>
          <p className="text-xs text-gray-500">Allow new students to enroll</p>
        </div>
      </Switch>
      <Switch
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md ",
            "justify-between cursor-pointer"
          ),
        }}
        color="default"
        size="sm"
      >
        <div className="flex flex-col -ms-1.5">
          <p className="text-sm font-semibold">Student Discussions</p>
          <p className="text-xs text-gray-500">Enable discussion forum</p>
        </div>
      </Switch>
      <Switch
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md ",
            "justify-between cursor-pointer"
          ),
        }}
        color="default"
        size="sm"
      >
        <div className="flex flex-col -ms-1.5">
          <p className="text-sm font-semibold">Email Notifications</p>
          <p className="text-xs text-gray-500">Send updates to enrolled students</p>
        </div>
      </Switch>
    </div>
  </div>
);

export default Settings;
