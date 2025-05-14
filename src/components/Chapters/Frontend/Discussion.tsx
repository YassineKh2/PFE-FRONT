import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Textarea } from "@heroui/input";
import { Icon } from "@iconify/react/dist/iconify.js";

import React from "react";

function Comment({
  name,
  time,
  text,
  image,
  isAuthor,
  children,
}: {
  name: string;
  time: string;
  text: string;
  image: string;
  isAuthor?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 items-start">
      <Avatar as="button" className="transition-transform" src={image} />
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center">
            <p className="text-sm font-semibold">{name}</p>
            {isAuthor && (
              <Chip className="h-4" size="sm">
                Instructor
              </Chip>
            )}
            <p className="text-xs text-gray-500">{time}</p>
          </div>
          <p className="text-sm text-gray-700">{text}</p>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-end justify-start">
              <Icon
                icon="iconamoon:like"
                width="16"
                height="16"
                style={{ color: "#6b7280" }}
              />
              <button className="text-xs text-gray-500">Like</button>
            </div>
            <div className="flex gap-1 items-end justify-start">
              <Icon
                icon="bx:comment"
                width="14"
                height="14"
                style={{ color: "#6b7280" }}
              />
              <button className="text-xs text-gray-500">Reply</button>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function Discussion() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <p className="font-semibold">Discussions</p>
        <div className="flex gap-4 items-start">
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
          <div className="flex flex-col gap-2 w-full">
            <Textarea
              variant="bordered"
              placeholder="Ask a question or share your thoughts..."
            />
            <Button variant="flat" className="self-end">
              Post Comment
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full">
          <Comment
            image="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            name="John Doe"
            time="2 days ago"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          >
            <Comment
              image="https://i.pravatar.cc/150?u=a04258114e29026702d"
              name="Jane Smith"
              time="2 days ago"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              isAuthor
            />
          </Comment>
          <Comment
            image="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            name="John Doe"
            time="2 days ago"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </div>
      </div>
    </>
  );
}

export default Discussion;
