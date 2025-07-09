import React from "react";
import { Avatar } from "@heroui/react";

import { Message } from "@/types/Chat";
import { useAuth } from "@/providers/AuthProvider";

interface MessageBubbleProps {
  message: Message;
  showAvatar: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  showAvatar,
}) => {
  const { currentUser } = useAuth();
  const isCurrentUser = message.sender.id === currentUser?.uid;
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex gap-2 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {showAvatar ? (
        <Avatar
          className={`mt-1 ${!isCurrentUser ? "block" : "invisible"}`}
          size="sm"
          src={message.sender.photoURL || ""}
        />
      ) : (
        <div className="w-8" />
      )}

      <div
        className={`flex max-w-[75%] flex-col ${isCurrentUser ? "items-end" : "items-start"}`}
      >
        {showAvatar && !isCurrentUser && (
          <span className="mb-1 ml-1 text-tiny font-medium text-default-600">
            {message.sender.name}
          </span>
        )}

        <div
          className={`rounded-large px-4 py-2 text-small ${
            isCurrentUser
              ? "bg-primary text-primary-foreground"
              : "bg-content1 text-foreground shadow-sm"
          }`}
        >
          {message.content}
        </div>

        <span className="mt-1 px-1 text-tiny text-default-400">{time}</span>
      </div>
    </div>
  );
};
