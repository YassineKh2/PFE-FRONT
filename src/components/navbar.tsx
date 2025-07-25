import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useNavigate } from "react-router-dom";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import { useAuth } from "@/providers/AuthProvider";
import { doSignOut } from "@/services/Auth";
export const Navbar = () => {
  const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

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
            <img alt="logo" className="w-28" src="/Morgenfund_Logo.png" />
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        {userLoggedIn ? (
          <div className="flex items-center gap-2">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  src={currentUser.photoURL || ""}
                />
                {/* <img
                src={currentUser.photoURL || ""}
                referrerPolicy="no-referrer"
              /> */}
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{currentUser?.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="savedfunds"
                  onPress={() => {
                    navigate("/dashboard/home");
                  }}
                >
                  Home
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
                <DropdownItem
                  key="courses"
                  onPress={() => {
                    navigate("/dashboard/courses/overview");
                  }}
                >
                  Courses
                </DropdownItem>
                <DropdownItem key="settings">Settings</DropdownItem>
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
            {currentUser.depositTier &&
              (currentUser.depositTier === "Platinum" ? (
                <p className="font-bold text-sm bg-clip-text text-transparent inline-block bg-gradient-to-r from-purple-400 to-purple-600">
                  Platinum
                </p>
              ) : currentUser.depositTier === "Gold" ? (
                <p className="font-bold text-sm bg-clip-text text-transparent inline-block bg-gradient-to-r from-yellow-400 to-yellow-600">
                  Gold
                </p>
              ) : (
                <p className="font-bold text-sm bg-clip-text text-transparent inline-block bg-gradient-to-r from-gray-400 to-gray-600">
                  Silver
                </p>
              ))}
          </div>
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
        {searchInput}
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
