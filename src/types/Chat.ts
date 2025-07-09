export interface Message {
  content: string;
  timestamp: string;
  sender: {
    id: string;
    name: string;
    photoURL?: string;
  };
  chatId?: string;
}
