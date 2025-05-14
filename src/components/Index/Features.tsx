import { Button } from "@heroui/button";
import { subtitle, title } from "../primitives";

function Features() {
  return (
    <div className="flex my-10  md:text-end">
      <div>
        <img src="calculator.gif" alt="calculator gif " className="hidden md:block" />
      </div>
      <div className="flex flex-col items-start md:items-end gap-2 md:gap-0">
        <img src="profits.png" alt="profits.png" className="size-28" />
        <p className={title({ size: "lg" }) + " text-default-700"}>
          Calculate and refine your
          <text className={title({ size: "xl", color: "pink" })}>
            {" "}
            Profits.
          </text>
        </p>
        <p className={subtitle({ size: "sm" })}>
        Easily calculate your profits with our intuitive tools and refine your strategies while maximize your earnings with real-time data and insights.
        </p>
        <Button className="mt-4 bg-gradient-to-r from-[#E7649C] to-[#fc3c61] text-white">
            Know more
          </Button>
      </div>
    </div>
  );
}

export default Features;
