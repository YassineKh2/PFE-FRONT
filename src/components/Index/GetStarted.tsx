import { Button } from "@heroui/button";
import { title, subtitle } from "../primitives";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./typing-animation.css";
import { useEffect, useState } from "react";

function GetStarted() {
  const Navigate = useNavigate();
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Mutual Funds", "Investments", "Predictions"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((current) => (current + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center my-10 gap-4">
        <div className="inline-block max-w-6xl text-center justify-center">
          <span className={title({ size: "xl",boldness:"bold" })}>All the&nbsp;</span>
          <div className="typing-container">
            <span
              className={`${title({ color: "pink", size: "xl",boldness:"bold" })} typing-text`}
              key={texts[textIndex]}
            >
              {texts[textIndex]}
            </span>
          </div>
          <br />
          <span className={title({ size: "xl",boldness:"bold" })}>grouped here.</span>
        </div>
        <p className={subtitle() + " max-w-xl text-center"}>
          Trading made easy with MutualFundy
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <Button
          size="lg"
          onPress={() => Navigate("/home")}
          className="bg-gradient-to-r from-[#E7649C] to-[#fc3c61] text-white self-center"
        >
          Start Trading
        </Button>
        <img src="City_GIF_01.gif" alt="citygif" />
      </div>
      <div className="flex justify-around items-end gap-2">
        <div className="relative w-screen max-w-sm">
          <hr className="border-2 w-full" />
          <div className="absolute top-0 left-0 w-1/12 h-full bg-gradient-to-r from-white to-transparent"></div>
        </div>
        <p className="w-max text-sm text-default-600 flex flex-col items-center relative top-2">
          <Icon
            icon="game-icons:laurel-crown"
            className="size-16 text-green-800"
          />
          Trusted by over 10M users
        </p>
        <div className="relative w-screen max-w-sm">
          <hr className="border-2 w-full" />
          <div className="absolute top-0 right-0 w-1/12 h-full bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>
    </>
  );
}

export default GetStarted;
