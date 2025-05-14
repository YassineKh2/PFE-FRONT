import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

function Resources() {
  return (
    <div className="flex flex-col gap-8">
      <p className="font-semibold">Resources</p>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center w-full py-3 px-4 rounded-md border border-gray-300">
          <div className="flex justify-start gap-2 items-center">
            <div className="flex gap-2 items-center bg-gray-200 rounded-full p-3">
              <Icon icon="mingcute:paper-line" width="24" height="24" />
            </div>
            <div>
              <p className="text-sm font-semibold">Lesson Slides</p>
              <p className="text-xs text-gray-500">PDF • 1.2 MB</p>
            </div>
          </div>
          <Button isIconOnly variant="light" size="sm">
            <Icon icon="flowbite:download-outline" width="24" height="24" />
          </Button>
        </div>
        <div className="flex justify-between items-center w-full py-3 px-4 rounded-md border border-gray-300">
          <div className="flex justify-start gap-2 items-center">
            <div className="flex gap-2 items-center bg-gray-200 rounded-full p-3">
              <Icon icon="gg:website" width="24" height="24" />
            </div>
            <div>
              <p className="text-sm font-semibold">How to buy Mutual Funds</p>
              <p className="text-xs text-gray-500">Website</p>
            </div>
          </div>
          <Button isIconOnly variant="light" size="sm">
            <Icon icon="akar-icons:link-out" width="18" height="18" />
          </Button>
        </div>
        <div className="flex justify-between items-center w-full py-3 px-4 rounded-md border border-gray-300">
          <div className="flex justify-start gap-2 items-center">
            <div className="flex gap-2 items-center bg-gray-200 rounded-full p-3">
              <Icon icon="gg:website" width="24" height="24" />
            </div>
            <div>
              <p className="text-sm font-semibold">Mutual Fund Prices</p>
              <p className="text-xs text-gray-500">Website</p>
            </div>
          </div>
          <Button isIconOnly variant="light" size="sm">
            <Icon icon="akar-icons:link-out" width="18" height="18" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Resources;
