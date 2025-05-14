import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#E7649C] to-[#fc3c61]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
      xl: "text-5xl lg:text-[5rem]",
    },
    fullWidth: {
      true: "w-full block",
    },
    boldness: {
      bold: "font-bold",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    size: "md",
    semibold: "font-semibold",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full my-2 text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
    size: {
      sm: "md:w-1/2 text-md lg:text-lg ",
      md: "md:w-1/2 text-lg lg:text-xl ",
      xs: "text-sm lg:text-base"
    }
  },
  defaultVariants: {
    fullWidth: true,
    size: "md",
  },
});
