import { ChatInterface } from "@/components/Chat/chat-interface";
import { subtitle, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";

export default function Manager() {
  return (
    <DashboardLayout>
      <h1 className={title({ size: "sm", boldness: "bold" })}>Manager</h1>
      <div className={subtitle({ size: "xs" }) + " text-gray-400"}>
        Connect with your manager here
      </div>
      <div className="w-4/5">
        <ChatInterface />
      </div>
    </DashboardLayout>
  );
}
