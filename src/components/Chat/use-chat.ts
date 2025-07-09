import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { addToast } from "@heroui/react";

import { useAuth } from "@/providers/AuthProvider";
import { GetManagerId } from "@/services/User";
import { Message } from "@/types/Chat";

const yesterday = new Date();

yesterday.setDate(yesterday.getDate() - 1);

let socket: Socket | null = null;

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setchatId] = useState<string | null>(null);
  const [otherUser, setOtherUser] = useState<{
    name: string;
    photoURL: string;
  } | null>(null);
  const chatIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { currentUser } = useAuth();
  const location = useLocation();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) {
      socket = io("http://127.0.0.1:5000", {
        transports: ["websocket"],
        autoConnect: true,
      });
      let managerId;
      let userId;

      if (currentUser.role === "manager") {
        const searchParams = new URLSearchParams(location.search);

        userId = searchParams.get("userId");
        managerId = currentUser.uid;
        if (userId && socket) {
          socket.emit("join", { user1: managerId, user2: userId });
        }
      } else {
        GetManagerId(currentUser.uid).then((data) => {
          managerId = data.managerId;
          if (socket)
            socket.emit("join", { user1: managerId, user2: currentUser.uid });
        });
      }

      socket.on("chat_data", (data) => {
        if (!data || !data.chatId) return;
        setchatId(data.chatId);
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
          const firstMsg = data.messages[0];

          if (firstMsg && firstMsg.sender.id !== currentUser.uid) {
            setOtherUser({
              name: firstMsg.sender.name,
              photoURL: firstMsg.sender.photoURL,
            });
          } else if (firstMsg && data.messages.length > 1) {
            const secondMsg = data.messages[1];

            if (secondMsg && secondMsg.sender.id !== currentUser.uid) {
              setOtherUser({
                name: secondMsg.sender.name,
                photoURL: secondMsg.sender.photoURL,
              });
            }
          }
        }
      });

      socket.on("error", () => {
        addToast({
          title: "Error",
          description: "An error occurred while connecting to the chat.",
          color: "danger",
        });
      });

      socket.on("new_message", (msg: Message) => {
        if (msg.chatId !== chatIdRef.current) return;

        if (msg.sender.id !== currentUser.uid) {
          setMessages((prev) => [...prev, msg]);
          setIsTyping(false);
        }
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  useEffect(() => {
    chatIdRef.current = chatId;
  }, [chatId]);

  const sendMessage = () => {
    if (!newMessage.trim() || !chatId) return;

    const newMsg: Message = {
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender: {
        id: currentUser.uid,
        name: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      chatId: chatId,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    if (socket && chatId) {
      socket.emit("message", newMsg);
    }
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    isTyping,
    scrollRef,
    chatId,
    otherUser,
  };
};
