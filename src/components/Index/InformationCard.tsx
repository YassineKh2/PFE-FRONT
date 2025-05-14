import { Card, CardBody } from "@heroui/card";
import { subtitle, title } from "../primitives";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function InformationCard() {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between my-10">
      <div className="w-full flex flex-col gap-2">
        <img
          src="office-building.png"
          alt="office-building.png"
          className="size-28"
        />
        <p className={title({ size: "lg" }) + " text-default-700"}>
          Europe markets <br />
          at your{" "}
          <text className={title({ size: "xl", color: "pink" })}>
            fingertips.
          </text>
        </p>
        <p className={subtitle({ size: "sm" })}>
          Whether your investment term is long or short, and the risk is high or
          low, you have full control over your investments.
        </p>

        <div className="flex flex-col gap-4 mt-4 lg:w-10/12">
          <Link
            to="home"
            className="hover:shadow-lg hover:shadow-pink-200 rounded-xl"
          >
            <Card>
              <CardBody className="py-4">
                <div className="flex justify-between items-center">
                  <div className="flex justify-between items-center gap-8 ms-2">
                    <Icon
                      icon="ri:refund-2-fill"
                      className="size-10 text-[#fc3c61]"
                    />
                    <p className="text-lg font-semibold text-default-700">
                      Mutual Funds & SIPs
                    </p>
                  </div>
                  <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
              </CardBody>
            </Card>
          </Link>
          <Link
            to="home"
            className="hover:shadow-lg hover:shadow-pink-200 rounded-xl"
          >
            <Card>
              <CardBody className="py-4">
                <div className="flex justify-between items-center">
                  <div className="flex justify-between items-center gap-8 ms-2">
                    <Icon
                      icon="ant-design:stock-outlined"
                      className="size-10 text-[#fc3c61]"
                    />
                    <p className="text-lg font-semibold text-default-700">
                      Market Prediction
                    </p>
                  </div>
                  <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
              </CardBody>
            </Card>
          </Link>
          <Link
            to="home"
            className="hover:shadow-lg hover:shadow-pink-200 rounded-xl"
          >
            <Card>
              <CardBody className="py-4">
                <div className="flex justify-between items-center">
                  <div className="flex justify-between items-center gap-8 ms-2">
                    <Icon
                      icon="hugeicons:money-saving-jar"
                      className="size-10 text-[#fc3c61]"
                    />
                    <p className="text-lg font-semibold text-default-700">
                      Savings & Optimization
                    </p>
                  </div>
                  <Icon icon="weui:arrow-filled" width="12" height="24" />
                </div>
              </CardBody>
            </Card>
          </Link>
        </div>
      </div>
      <div>
        <img
          ref={imageRef}
          src="phonecity.gif"
          alt="phone city"
          className={`hidden lg:block ms-32 mt-20 w-[80rem] transition-opacity duration-1000 ${
            isVisible ? "animate-appearance-in" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}

export default InformationCard;
