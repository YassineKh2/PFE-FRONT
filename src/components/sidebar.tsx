import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { User } from "@heroui/user";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useLocation } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { Accordion, AccordionItem } from "@heroui/accordion";

import { useOpen } from "@/store/SidebarStore";
import { useAuth } from "@/providers/AuthProvider";

function Sidebar() {
  const { Open, SetOpen } = useOpen();
  const location = useLocation();

  const sidebarSpring = useSpring({
    transform: Open ? "translateX(0%)" : "translateX(10%)",
    config: { tension: 30, friction: 10 },
  });

  return (
    <>
      <animated.div className="h-full" style={sidebarSpring}>
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
  const isActive = (to: string) =>
    currentPath === to || currentPath.startsWith(to + "/");

  const { currentUser } = useAuth();

  return (
    <aside className="flex flex-col gap-6 pt-5 items-start ms-8 me-5  bg-default-100 rounded-lg h-full">
      <div className="flex gap-24 items-center max-w-fit">
        <Link
          className="flex justify-start items-center gap-1"
          color="foreground"
          to="/"
        >
          <img alt="logo" className="w-48" src="/Morgenfund_Logo.png" />
        </Link>
        <Button isIconOnly variant="light" onPress={() => SetOpen(false)}>
          <Icon
            className="-rotate-90"
            height="28"
            icon="ei:arrow-up"
            style={{ color: "#9A9AA0" }}
            width="28"
          />
        </Button>
      </div>

      <div className="ms-1">
        <User
          avatarProps={{
            src: currentUser.photoURL,
            isBordered: true,
            size: "sm",
          }}
          classNames={{
            name: "font-semibold ms-1",
            description: "font-semibold text-default-400 ms-1",
          }}
          description={currentUser.role.toUpperCase()}
          name={currentUser.displayName}
        />
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        <Button
          as={Link}
          className={`text-default-500 justify-start !ps-2 ${isActive("/dashboard/home") ? "bg-gray-200 font-bold" : ""}`}
          size="lg"
          startContent={
            <Icon
              height="24"
              icon="mynaui:home"
              style={{ color: "#9A9AA0" }}
              width="24"
            />
          }
          to="/home"
          variant="light"
        >
          Home
        </Button>
        <Button
          as={Link}
          className={`text-default-500 justify-start !ps-2 ${isActive("/dashboard/manager") ? "bg-gray-200 font-bold" : ""}`}
          size="lg"
          startContent={
            <Icon
              height="24"
              icon="carbon:ibm-consulting-advantage-assistant"
              style={{ color: "#9A9AA0" }}
              width="24"
            />
          }
          to="/dashboard/manager"
          variant="light"
        >
          Manager
        </Button>
        <Button
          as={Link}
          className={`text-default-500 justify-start !ps-2 ${isActive("/dashboard/savedfunds") ? "bg-gray-200 font-bold" : ""}`}
          size="lg"
          startContent={
            <Icon
              height="24"
              icon="hugeicons:apple-stocks"
              style={{ color: "#9A9AA0" }}
              width="24"
            />
          }
          to="/dashboard/savedfunds"
          variant="light"
        >
          My Funds
        </Button>

        <Accordion
          className={`hover:bg-gray-200 "bg-gray-200 rounded-xl ${isActive("/dashboard/courses") ? "bg-gray-200 font-bold" : ""}`}
        >
          <AccordionItem
            key="1"
            aria-label="Courses"
            classNames={{
              title: "text-gray-500",
            }}
            startContent={
              <Icon
                height="24"
                icon="hugeicons:course"
                style={{ color: "#9A9AA0" }}
                width="24"
              />
            }
            title="Courses"
          >
            <div className="flex flex-col gap-2">
              <Button
                as={Link}
                className={`w-full text-default-500 justify-start ${isActive("/dashboard/courses/all") ? "bg-gray-100 font-bold" : ""}`}
                size="lg"
                startContent={
                  <Icon
                    height="20"
                    icon="material-symbols:all-out-outline-rounded"
                    style={{ color: "#9A9AA0" }}
                    width="20"
                  />
                }
                to="/dashboard/courses/all"
                variant="light"
              >
                All Courses
              </Button>

              <Button
                as={Link}
                className={`w-full text-default-500 justify-start ${isActive("/dashboard/courses/overview") ? "bg-gray-100 font-bold" : ""}`}
                size="lg"
                startContent={
                  <Icon
                    height="20"
                    icon="grommet-icons:overview"
                    style={{ color: "#9A9AA0" }}
                    width="20"
                  />
                }
                to="/dashboard/courses/overview"
                variant="light"
              >
                Overview
              </Button>
              <Button
                as={Link}
                className={`w-full text-default-500 justify-start ${isActive("/dashboard/courses/mycertificates") ? "bg-gray-100 font-bold" : ""}`}
                size="lg"
                startContent={
                  <Icon
                    height="20"
                    icon="tabler:certificate"
                    style={{ color: "#9A9AA0" }}
                    width="20"
                  />
                }
                to="/dashboard/courses/mycertificates"
                variant="light"
              >
                Certificates
              </Button>
            </div>
          </AccordionItem>
        </Accordion>
        <Button
          as={Link}
          className={`text-default-500 justify-start !ps-2 ${isActive("/dashboard/users") ? "bg-gray-200 font-bold" : ""}`}
          size="lg"
          startContent={
            <Icon
              height="24"
              icon="prime:users"
              style={{ color: "#9A9AA0" }}
              width="24"
            />
          }
          to="/users"
          variant="light"
        >
          Users
        </Button>
        <Button
          as={Link}
          className={`text-default-500 justify-start !ps-2 ${isActive("/dashboard/settings") ? "bg-gray-200 font-bold" : ""}`}
          size="lg"
          startContent={
            <Icon
              height="24"
              icon="mage:settings"
              style={{ color: "#9A9AA0" }}
              width="24"
            />
          }
          to="/dashboard/settings"
          variant="light"
        >
          Settings
        </Button>
      </div>

      <div className="flex flex-col w-full justify-end mt-auto mb-5">
        <Button
          as={Link}
          className="text-default-500 justify-start !ps-2"
          size="lg"
          startContent={
            <Icon
              height="24"
              icon="lsicon:minus-outline"
              style={{ color: "#9A9AA0" }}
              width="24"
            />
          }
          to="/home"
          variant="light"
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
  const isActive = (to: string) =>
    currentPath === to || currentPath.startsWith(to + "/");

  return (
    <aside className="flex flex-col gap-6 p-4 items-center bg-default-100 rounded-lg h-full">
      <div className="flex gap-24 items-center max-w-fit">
        <Link
          className="flex justify-start items-center gap-1"
          color="foreground"
          to="/"
        >
          <img alt="logo" className="w-8" src="/Morgenfund_Logo_4.png" />
        </Link>
      </div>

      <div className="ms-1">
        <Avatar
          isBordered
          size="sm"
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
        />
      </div>
      <div className="flex flex-col  w-full">
        <Button
          isIconOnly
          as={Link}
          className={`text-default-500 ${isActive("/dashboard/home") ? "bg-gray-200 font-bold" : ""}`}
          size="lg"
          to="/home"
          variant="light"
        >
          <Icon
            height="24"
            icon="mynaui:home"
            style={{ color: "#9A9AA0" }}
            width="24"
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          className={`text-default-500 ${isActive("/dashboard/manager") ? "bg-gray-200 font-bold" : ""}`}
          size="lg"
          to="/dashboard/manager"
          variant="light"
        >
          <Icon
            height="24"
            icon="carbon:ibm-consulting-advantage-assistant"
            style={{ color: "#9A9AA0" }}
            width="24"
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          className={`text-default-500 ${isActive("/dashboard/savedfunds") ? "bg-gray-200 font-bold" : ""}`}
          size="lg"
          to="/dashboard/savedfunds"
          variant="light"
        >
          <Icon
            height="24"
            icon="hugeicons:apple-stocks"
            style={{ color: "#9A9AA0" }}
            width="24"
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          className={`text-default-500 ${isActive("/dashboard/courses") ? "bg-gray-200 font-bold" : ""}`}
          size="lg"
          to="/dashboard/courses"
          variant="light"
        >
          <Icon
            height="24"
            icon="hugeicons:course"
            style={{ color: "#9A9AA0" }}
            width="24"
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          className={`text-default-500 ${isActive("/dashboard/users") ? "bg-gray-200 font-bold" : ""}`}
          size="lg"
          to="/dashboard/users"
          variant="light"
        >
          <Icon
            height="24"
            icon="prime:users"
            style={{ color: "#9A9AA0" }}
            width="24"
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          className={`text-default-500 ${isActive("/dashboard/settings") ? "bg-gray-200 font-bold" : ""}`}
          size="lg"
          to="/dashboard/settings"
          variant="light"
        >
          <Icon
            height="24"
            icon="mage:settings"
            style={{ color: "#9A9AA0" }}
            width="24"
          />
        </Button>
      </div>

      <div className="flex flex-col w-full items-center mt-auto mb-5">
        <Button isIconOnly variant="light" onPress={() => SetOpen(true)}>
          <Icon
            className="rotate-90"
            height="30"
            icon="ei:arrow-up"
            style={{ color: "#9A9AA0" }}
            width="30"
          />
        </Button>
        <Button
          isIconOnly
          as={Link}
          className="text-default-500"
          size="lg"
          to="/home"
          variant="light"
        >
          <Icon
            height="24"
            icon="lsicon:minus-outline"
            style={{ color: "#9A9AA0" }}
            width="24"
          />
        </Button>
      </div>
    </aside>
  );
};
