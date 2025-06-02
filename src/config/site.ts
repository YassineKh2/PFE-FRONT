export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "MutualFundy",
  description: "Make Trading easy.",
  navItems: [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Trending",
      href: "/trending",
    },
    {
      label: "Calculators",
      href: "/Calculator",
    },
    {
      label: "Discover",
      href: "/recommended",
    },
    {
      label: "Deposit",
      href: "/deposit",
    },
    {
      label: "Learn",
      href: "/courses",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Saved Funds",
      href: "/dashboard/savedfunds",
    },
    {
      label: "My Courses",
      href: "/dashboard/courses/overview",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Calculators",
      href: "/Calculator",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
