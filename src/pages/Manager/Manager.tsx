import { Card, CardBody, CardHeader, Chip } from "@heroui/react";

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
      <div className="flex flex-col lg:flex-row w-full">
        <Card className="w-full">
          <ChatInterface />
        </Card>
        <div className="p-6 space-y-6 w-[40%] ">
          <p className="font-semibold text-lg">Quick Help</p>
          <Card className="p-4">
            <CardHeader>
              <p className="font-bold">Frequently Asked</p>
            </CardHeader>
            <CardBody className="flex flex-col gap-2">
              <div className="hover:bg-gray-100 p-3 rounded-md">
                <p className="">Getting Started Guide</p>
                <Chip size="sm">Basics</Chip>
              </div>
              <div className="hover:bg-gray-100 p-3 rounded-md">
                <p className="">Investment Strategies</p>
                <Chip size="sm">Investing</Chip>
              </div>
              <div className="hover:bg-gray-100 p-3 rounded-md">
                <p className="">Account Security</p>
                <Chip size="sm">Security</Chip>
              </div>
              <div className="hover:bg-gray-100 p-3 rounded-md">
                <p className="">Tax Implications</p>
                <Chip size="sm">Tax</Chip>
              </div>
              <div className="hover:bg-gray-100 p-3 rounded-md">
                <p className="">Portfolio Rebalancing</p>
                <Chip size="sm">Management</Chip>
              </div>
              <div className="hover:bg-gray-100 p-3 rounded-md">
                <p className="">Risk Assessment</p>
                <Chip size="sm">Risk</Chip>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
