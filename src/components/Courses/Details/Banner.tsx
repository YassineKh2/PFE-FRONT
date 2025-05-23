import { GetStaticImages } from "@/services/GetStaticFiles";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = ({ imageSrc }: { imageSrc: string }) => {
  const [image, setimage] = useState<string>();

  useEffect(() => {
    setimage(GetStaticImages(imageSrc));
  }, [imageSrc]);

  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Button
          as={Link}
          to="/dashboard/courses/all"
          size="sm"
          startContent={
            <Icon
              className="-rotate-90"
              icon="majesticons:arrow-up"
              width="20"
              height="20"
            />
          }
          variant="light"
        >
          Back to courses
        </Button>
        <Chip radius="lg" className="text-white px-2" size="sm" color="success">
          Published
        </Chip>
        <Chip
          radius="lg"
          className="px-2"
          variant="bordered"
          size="sm"
          color="default"
        >
          Equity
        </Chip>
        <Chip
          radius="lg"
          className="px-2"
          variant="bordered"
          size="sm"
          color="default"
        >
          Intermediate
        </Chip>
      </div>
      <div className="w-full h-72 overflow-hidden rounded-xl">
        <img
          alt="Cover Image For Course"
          src={image}
          className="size-full object-cover"
        />
      </div>
    </section>
  );
};

export default Banner;
