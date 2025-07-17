import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Banner({ name }: { name: string }) {
  const navigate = useNavigate();
  const [hidden, sethidden] = useState(false);

  return (
    <>
      {!hidden && (
        <div className="flex w-full items-center gap-x-3 border-b-1 border-divider bg-background/[0.15] px-6 py-2 backdrop-blur-xl sm:px-3.5 sm:before:flex-1">
          <p className="text-small text-foreground">
            <Link className="text-inherit">
              You are now acting as&nbsp;
              <p className="text-primary-500 font-bold">{name}</p>&nbsp;any
              action you do will be registered under their account&nbsp;
            </Link>
          </p>
          <Button
            as={Link}
            className="group relative h-9 overflow-hidden bg-transparent text-small font-normal"
            color="default"
            endContent={
              <Icon
                className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
                icon="solar:arrow-right-linear"
                width={16}
              />
            }
            style={{
              border: "solid 2px transparent",
              backgroundImage: `linear-gradient(hsl(var(--heroui-background)), hsl(var(--heroui-background))), linear-gradient(to right, #F871A0, #9353D3)`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
            variant="bordered"
            onPress={() => {
              navigate(-1);
            }}
          >
            Go Back
          </Button>
          <div className="flex flex-1 justify-end">
            <Button
              isIconOnly
              className="-m-1"
              size="sm"
              variant="light"
              onPress={() => {
                sethidden(true);
              }}
            >
              <span className="sr-only">Close Banner</span>
              <Icon className="text-default-500" icon="lucide:x" width={20} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
