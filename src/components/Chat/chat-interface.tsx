import React from "react";
import { Avatar, Button, Input, ScrollShadow } from "@heroui/react";
import { Icon } from "@iconify/react";

import { useChat } from "./use-chat";
import { MessageList } from "./message-list";

export const ChatInterface: React.FC = () => {
  const {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    isTyping,
    scrollRef,
  } = useChat();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[87vh] max-h-[87vh]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-default-200 bg-content1 px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar
            isBordered
            size="sm"
            src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
          />
          <div>
            <h2 className="text-medium font-semibold">Sarah Johnson</h2>
            <p className="text-tiny text-default-500">
              {isTyping ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button isIconOnly size="sm" variant="light">
            <Icon icon="lucide:phone" width={18} />
          </Button>
          <Button isIconOnly size="sm" variant="light">
            <Icon icon="lucide:video" width={18} />
          </Button>
          <Button isIconOnly size="sm" variant="light">
            <Icon icon="lucide:more-vertical" width={18} />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollShadow
        ref={scrollRef}
        className="flex-1 bg-content2/50 p-4"
        hideScrollBar={false}
      >
        <MessageList messages={messages} />
      </ScrollShadow>

      {/* Input Area */}
      <div className="border-t border-default-200 bg-content1 p-3">
        <div className="flex gap-2 items-center">
          <Button isIconOnly size="md" variant="flat">
            <Icon icon="lucide:plus" width={18} />
          </Button>
          <Input
            classNames={{
              input: "text-small",
            }}
            endContent={
              <div className="flex gap-1">
                <Button isIconOnly size="sm" variant="light">
                  <Icon icon="lucide:smile" width={18} />
                </Button>
                <Button isIconOnly size="sm" variant="light">
                  <Icon icon="lucide:paperclip" width={18} />
                </Button>
              </div>
            }
            placeholder="Type a message..."
            value={newMessage}
            onKeyDown={handleKeyDown}
            onValueChange={setNewMessage}
          />
          <Button
            isIconOnly
            color="primary"
            isDisabled={!newMessage.trim()}
            onPress={sendMessage}
          >
            <Icon icon="lucide:send" width={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
