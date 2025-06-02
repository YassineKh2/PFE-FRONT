import { User } from "firebase/auth";

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: User;
}
