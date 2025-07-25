import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Progress } from "@heroui/progress";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { useAuth } from "@/providers/AuthProvider";
import { doSignOut } from "@/services/Auth";
import { ProgressType } from "@/types/Courses";
export const Navbar = ({
  inDashboard,
  progress,
  CourseTitle,
  countdown,
}: {
  inDashboard: boolean;
  progress?: ProgressType;
  CourseTitle: string;
  countdown?: number;
}) => {
  const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  let minutes;
  let seconds;

  if (countdown) {
    minutes = Math.floor(countdown / 60);
    seconds = countdown % 60;
  }

  const SignOut = async () => {
    await doSignOut();
    navigate("/login");
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <img alt="logo" className="w-8" src="/Morgenfund_Logo_4.png" />
          </Link>
          <NavbarItem className="hidden sm:flex ">
            {inDashboard ? (
              <Button
                as={Link}
                href="/dashboard/courses/all"
                startContent={
                  <Icon
                    className="-rotate-90"
                    height="20"
                    icon="majesticons:arrow-up"
                    width="20"
                  />
                }
                variant="light"
              >
                Back to dashboard
              </Button>
            ) : (
              <Button
                as={Link}
                href="/dashboard/courses/owned"
                startContent={
                  <Icon
                    className="-rotate-90"
                    height="20"
                    icon="majesticons:arrow-up"
                    width="20"
                  />
                }
                variant="light"
              >
                Back to courses
              </Button>
            )}
          </NavbarItem>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarItem className="hidden sm:flex gap-2 font-semibold text-lg">
          {CourseTitle}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex  sm:basis-full" justify="end">
        <NavbarItem className="hidden  justify-end sm:flex gap-6 w-full">
          {progress && (
            <Progress
              aria-label="Progress"
              classNames={{
                base: "max-w-[200px]",
                label: "text-xs mt-2",
                value: "text-xs mt-2",
              }}
              color="primary"
              label="Your Progress"
              showValueLabel={true}
              size="sm"
              value={progress.progress}
            />
          )}
          {countdown && (
            <span className="text-xs font-medium text-gray-500">
              {countdown > 0
                ? `Time left: ${minutes}:${seconds?.toString().padStart(2, "0")}`
                : "Time's up!"}
            </span>
          )}
          <ThemeSwitch />
        </NavbarItem>
        {userLoggedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{currentUser?.email}</p>
              </DropdownItem>
              <DropdownItem
                key="savedfunds"
                onPress={() => {
                  navigate("/dashboard/savedfunds");
                }}
              >
                Saved Funds
              </DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onPress={() => SignOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button
            className="bg-gradient-to-r from-[#E7649C] to-[#fc3c61] text-white"
            onPress={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
