import React from "react";

import { MessageBubble } from "./message-bubble";

import { Message } from "@/types/Chat";

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  // Group messages by date
  const groupedMessages = React.useMemo(() => {
    const groups: { [key: string]: Message[] } = {};

    messages.forEach((message) => {
      const date = new Date(message.timestamp);
      const dateKey = date.toLocaleDateString();

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(message);
    });

    return groups;
  }, [messages]);

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="flex flex-col gap-3">
          <div className="flex justify-center">
            <span className="rounded-full bg-default-100 px-3 py-1 text-tiny text-default-600">
              {date === new Date().toLocaleDateString() ? "Today" : date}
            </span>
          </div>

          {dateMessages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              showAvatar={
                index === 0 ||
                dateMessages[index - 1]?.sender.uid !== message.sender.uid
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};
