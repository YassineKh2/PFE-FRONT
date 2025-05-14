import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { User } from "@heroui/user";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { useOpen } from "@/store/SidebarStore";

function Sidebar() {
  const { Open, SetOpen } = useOpen();
  const location = useLocation();

  const sidebarSpring = useSpring({
    transform: Open ? "translateX(0%)" : "translateX(10%)",
    config: { tension: 30, friction: 10 },
  });

  return (
    <>
      <animated.div style={sidebarSpring} className="h-full">
        {Open ? (
          <OpenedSidebar SetOpen={SetOpen} currentPath={location.pathname} />
        ) : (
          <ClosedSidebar SetOpen={SetOpen} currentPath={location.pathname} />
        )}
      </animated.div>
    </>
  );
}

export default Sidebar;

const OpenedSidebar = ({
  SetOpen,
  currentPath,
}: {
  SetOpen: (open: boolean) => void;
  currentPath: string;
}) => {
  const isActive = (href: string) =>
    currentPath === href || currentPath.startsWith(href + "/");

  return (
    <aside className="flex flex-col gap-6 pt-5 items-start ms-8 me-5  bg-default-100 rounded-lg h-full">
      <div className="flex gap-24 items-center max-w-fit">
        <Link
          className="flex justify-start items-center gap-1"
          color="foreground"
          href="/"
        >
          <img alt="logo" className="w-32" src="/Morgenfund_Logo.png" />
        </Link>
        <Button
          onPress={() => SetOpen(false)}
          variant="light"
          isIconOnly
        >
          <Icon
            icon="ei:arrow-up"
            width="28"
            height="28"
            style={{ color: "#9A9AA0" }}
            className="-rotate-90"
          />
        </Button>
      </div>

      <div className="ms-1">
        <User
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            isBordered: true,
            size: "sm",
          }}
          description="Product Designer"
          name="Jane Doe"
          classNames={{
            name: "font-semibold ms-1",
            description: "font-semibold text-default-400 ms-1",
          }}
        />
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        <Button
          startContent={
            <Icon
              icon="mynaui:home"
              width="24"
              height="24"
              style={{ color: "#9A9AA0" }}
            />
          }
          as={Link}
          variant="light"
          href="/home"
          size="lg"
          className={`text-default-500 justify-start !ps-2 ${isActive("/dashboard/home") ? "bg-gray-200 font-bold" : ""}`}
        >
          Home
        </Button>
        <Button
          startContent={
            <Icon
              icon="hugeicons:apple-stocks"
              width="24"
              height="24"
              style={{ color: "#9A9AA0" }}
            />
          }
          as={Link}
          variant="light"
          href="/dashboard/funds"
          size="lg"
          className={`text-default-500 justify-start !ps-2 ${isActive("/dashboard/funds") ? "bg-gray-200 font-bold" : ""}`}
        >
          Funds
        </Button>
        <Button
          startContent={
            <Icon
              icon="hugeicons:course"
              width="24"
              height="24"
              style={{ color: "#9A9AA0" }}
            />
          }
          endContent={
            <Icon
              icon="ei:plus"
              width="30"
              height="30"
              style={{ color: "#9A9AA0" }}
              className="ms-20 mt-1 items-center hidden xl:block"
            />
          }
          as={Link}
          variant="light"
          href="/dashboard/courses"
          size="lg"
          className={`text-default-500 justify-start !ps-2 ${isActive("/dashboard/courses") ? "bg-gray-200 font-bold" : ""}`}
        >
          Courses
        </Button>
        <Button
          startContent={
            <Icon
              icon="prime:users"
              width="24"
              height="24"
              style={{ color: "#9A9AA0" }}
            />
          }
          as={Link}
          variant="light"
          href="/users"
          size="lg"
          className={`text-default-500 justify-start !ps-2 ${isActive("/dashboard/users") ? "bg-gray-200 font-bold" : ""}`}
        >
          Users
        </Button>
        <Button
          startContent={
            <Icon
              icon="mage:settings"
              width="24"
              height="24"
              style={{ color: "#9A9AA0" }}
            />
          }
          as={Link}
          variant="light"
          href="/dashboard/settings"
          size="lg"
          className={`text-default-500 justify-start !ps-2 ${isActive("/dashboard/settings") ? "bg-gray-200 font-bold" : ""}`}
        >
          Settings
        </Button>
      </div>

      <div className="flex flex-col w-full justify-end mt-auto mb-5">
        <Button
          startContent={
            <Icon
              icon="lsicon:minus-outline"
              width="24"
              height="24"
              style={{ color: "#9A9AA0" }}
            />
          }
          as={Link}
          variant="light"
          href="/home"
          size="lg"
          className="text-default-500 justify-start !ps-2"
        >
          Log Out
        </Button>
      </div>
    </aside>
  );
};

const ClosedSidebar = ({
  SetOpen,
  currentPath,
}: {
  SetOpen: (open: boolean) => void;
  currentPath: string;
}) => {
  const isActive = (href: string) =>
    currentPath === href || currentPath.startsWith(href + "/");

  return (
    <aside className="flex flex-col gap-6 p-4 items-center bg-default-100 rounded-lg h-full">
      <div className="flex gap-24 items-center max-w-fit">
        <Link
          className="flex justify-start items-center gap-1"
          color="foreground"
          href="/"
        >
          <img alt="logo" className="w-8" src="/Morgenfund_Logo_4.png" />
        </Link>
      </div>

      <div className="ms-1">
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          isBordered
          size="sm"
        />
      </div>
      <div className="flex flex-col  w-full">
        <Button
          isIconOnly
          as={Link}
          variant="light"
          href="/home"
          size="lg"
          className={`text-default-500 ${isActive("/dashboard/home") ? "bg-gray-200 font-bold" : ""}`}
        >
          <Icon
            icon="mynaui:home"
            width="24"
            height="24"
            style={{ color: "#9A9AA0" }}
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          variant="light"
          href="/dashboard/funds"
          size="lg"
          className={`text-default-500 ${isActive("/dashboard/funds") ? "bg-gray-200 font-bold" : ""}`}
        >
          <Icon
            icon="hugeicons:apple-stocks"
            width="24"
            height="24"
            style={{ color: "#9A9AA0" }}
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          variant="light"
          href="/dashboard/courses"
          size="lg"
          className={`text-default-500 ${isActive("/dashboard/courses") ? "bg-gray-200 font-bold" : ""}`}
        >
          <Icon
            icon="hugeicons:course"
            width="24"
            height="24"
            style={{ color: "#9A9AA0" }}
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          variant="light"
          href="/dashboard/users"
          size="lg"
          className={`text-default-500 ${isActive("/dashboard/users") ? "bg-gray-200 font-bold" : ""}`}
        >
          <Icon
            icon="prime:users"
            width="24"
            height="24"
            style={{ color: "#9A9AA0" }}
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          variant="light"
          href="/dashboard/settings"
          size="lg"
          className={`text-default-500 ${isActive("/dashboard/settings") ? "bg-gray-200 font-bold" : ""}`}
        >
          <Icon
            icon="mage:settings"
            width="24"
            height="24"
            style={{ color: "#9A9AA0" }}
          />
        </Button>
      </div>

      <div className="flex flex-col w-full items-center mt-auto mb-5">
        <Button
          onPress={() => SetOpen(true)}
          variant="light"
          isIconOnly
        >
          <Icon
            icon="ei:arrow-up"
            width="30"
            height="30"
            style={{ color: "#9A9AA0" }}
            className="rotate-90"
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          variant="light"
          href="/home"
          size="lg"
          className="text-default-500"
        >
          <Icon
            icon="lsicon:minus-outline"
            width="24"
            height="24"
            style={{ color: "#9A9AA0" }}
          />
        </Button>
      </div>
    </aside>
  );
};
