//@ts-nocheck
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
const yesterday = new Date();

yesterday.setDate(yesterday.getDate() - 1);

// Create a date for today
const today = new Date();

const mockMessages: Message[] = [
  {
    uid: "msg-1",
    content: "Hi there! How are you doing today?",
    timestamp: yesterday.toISOString(),
    sender: {
      uid: "other-user",
      displayName: "Sarah Johnson",
      photoURL: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
    },
  },
  {
    uid: "msg-2",
    content: "I'm doing well, thanks for asking! How about you?",
    timestamp: yesterday.toISOString(),
    sender: {
      uid: "current-user",
      displayName: "You",
      photoURL: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2",
    },
  },
  {
    uid: "msg-3",
    content: "I'm great! Just finishing up some work for the day.",
    timestamp: yesterday.toISOString(),
    sender: {
      uid: "other-user",
      displayName: "Sarah Johnson",
      photoURL: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
    },
  },
  {
    uid: "msg-4",
    content:
      "By the way, duid you get a chance to look at the project proposal I sent over?",
    timestamp: yesterday.toISOString(),
    sender: {
      uid: "other-user",
      displayName: "Sarah Johnson",
      photoURL: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
    },
  },
  {
    uid: "msg-5",
    content:
      "Yes, I reviewed it yesterday. It looks really promising! I especially liked the section on market analysis.",
    timestamp: today.toISOString(),
    sender: {
      uid: "current-user",
      displayName: "You",
      photoURL: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2",
    },
  },
  {
    uid: "msg-6",
    content: "That's great to hear! I put a lot of effort into that section.",
    timestamp: today.toISOString(),
    sender: {
      uid: "other-user",
      displayName: "Sarah Johnson",
      photoURL: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
    },
  },
  {
    uid: "msg-7",
    content:
      "I do have a few suggestions for the timeline though. Do you have time to discuss them?",
    timestamp: today.toISOString(),
    sender: {
      uid: "current-user",
      displayName: "You",
      photoURL: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2",
    },
  },
  {
    uid: "msg-8",
    content:
      "Absolutely! I'm free for the next hour if you want to go over them now.",
    timestamp: today.toISOString(),
    sender: {
      uid: "other-user",
      displayName: "Sarah Johnson",
      photoURL: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
    },
  },
];

import { Message } from "@/types/Chat";

let socket: Socket | null = null;

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender.uid !== "current-user"
    ) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) {
      socket = io("http://127.0.0.1:5000", {
        transports: ["websocket"],
        autoConnect: true,
      });

      socket.on("join", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      uid: `msg-${Date.now()}`,
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender: {
        uid: "current-user",
        displayName: "You",
        photoURL: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2",
      },
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    if (socket) {
      socket.emit("join", newMsg);
    }

    // Simulate response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(
        () => {
          const responses = [
            "That sounds great!",
            "I'll check and get back to you.",
            "Can you provuide more details?",
            "Let me think about that for a moment.",
            "I'm not sure I understand. Could you explain?",
            "That's an interesting perspective.",
            "I agree with your point.",
            "Let's discuss this further tomorrow.",
          ];
          const responseMsg: Message = {
            uid: `msg-${Date.now()}`,
            content: responses[Math.floor(Math.random() * responses.length)],
            timestamp: new Date().toISOString(),
            sender: {
              uid: "other-user",
              displayName: "Sarah Johnson",
              photoURL: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
            },
          };

          setMessages((prev) => [...prev, responseMsg]);
          setIsTyping(false);
        },
        1500 + Math.random() * 1500,
      );
    }, 1000);
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    isTyping,
    scrollRef,
  };
};
