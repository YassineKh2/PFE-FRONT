import { Card, CardBody, CardHeader } from "@heroui/react";

interface FormSectionsSidebarProps {
  currentSection: number;
  setCurrentSection: (section: number) => void;
}

function FormSectionsSidebar({
  currentSection,
  setCurrentSection,
}: FormSectionsSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-24 p-2">
        <CardHeader>
          <h3 className="text-lg font-semibold">Form Sections</h3>
        </CardHeader>
        <CardBody className="space-y-2">
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              currentSection === 1
                ? "bg-rose-50 text-primary-500 border border-rose-200"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setCurrentSection(1)}
          >
            <div className="font-medium">1. Deposit Details</div>
            <div className="text-sm text-gray-500">Amount & payment method</div>
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              currentSection === 2
                ? "bg-rose-50 text-primary-500 border border-rose-200"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setCurrentSection(2)}
          >
            <div className="font-medium">2. Personal Information</div>
            <div className="text-sm text-gray-500">
              KYC & verification details
            </div>
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              currentSection === 3
                ? "bg-rose-50 text-primary-500 border border-rose-200"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setCurrentSection(3)}
          >
            <div className="font-medium">3. Confirmation</div>
            <div className="text-sm text-gray-500">Review & submit</div>
          </button>
        </CardBody>
      </Card>
    </div>
  );
}

export default FormSectionsSidebar;
