import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Button, Tab, Tabs } from "@heroui/react";

import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { CheckIcon } from "@/components/Onboarding/Checkbox";

type DepositTier = {
  id: "silver" | "gold" | "platinum";
  name: string;
  icon: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  buttonColor: string;
  minDeposit: number;
  popular: boolean;
  benefits: string[];
  features: {
    transactionLimit: string;
    insights: string;
    support: string;
    processing: string;
    fees: string;
  };
};
const depositTiers: DepositTier[] = [
  {
    id: "silver",
    name: "Silver",
    icon: "material-symbols:shield-outline-rounded",
    color: "from-gray-400 to-gray-600",
    borderColor: "border-gray-300",
    bgColor: "bg-gray-50",
    textColor: "text-gray-700",
    buttonColor: "bg-gray-600 hover:bg-gray-700",
    minDeposit: 1000,
    popular: false,
    benefits: [
      "Transaction limit: €50,000/month",
      "Basic investment insights",
      "Email customer support",
      "Standard processing (2-3 days)",
      "Access to 50+ mutual funds",
      "Basic portfolio tracking",
      "Monthly market reports",
      "Standard transaction fees",
    ],
    features: {
      transactionLimit: "€50,000/month",
      insights: "Basic Reports",
      support: "Email Support",
      processing: "2-3 Business Days",
      fees: "Standard Fees",
    },
  },
  {
    id: "gold",
    name: "Gold",
    icon: "material-symbols:star-outline-rounded",
    color: "from-yellow-400 to-yellow-600",
    borderColor: "border-yellow-300",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    buttonColor: "bg-yellow-600 hover:bg-yellow-700",
    minDeposit: 5000,
    popular: true,
    benefits: [
      "Transaction limit: €2,00,000/month",
      "Advanced investment insights & analytics",
      "Priority email & chat support",
      "Fast processing (1-2 days)",
      "Access to 100+ mutual funds",
      "Advanced portfolio analysis",
      "Weekly market insights",
      "Reduced transaction fees (25% off)",
      "Early access to new fund launches",
      "Personalized investment recommendations",
    ],
    features: {
      transactionLimit: "€2,00,000/month",
      insights: "Advanced Analytics",
      support: "Priority Email & Chat",
      processing: "1-2 Business Days",
      fees: "25% Reduced Fees",
    },
  },
  {
    id: "platinum",
    name: "Platinum",
    icon: "material-symbols:crown-outline-rounded",
    color: "from-purple-400 to-purple-600",
    borderColor: "border-purple-300",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
    minDeposit: 25000,
    popular: false,
    benefits: [
      "Unlimited transaction limit",
      "Premium investment insights & AI-powered analytics",
      "Dedicated relationship manager",
      "Instant processing (same day)",
      "Access to all funds + exclusive opportunities",
      "Professional portfolio management",
      "Daily market insights & alerts",
      "No transaction fees",
      "First access to IPOs & new launches",
      "Personalized investment strategies",
      "Tax optimization guidance",
      "Quarterly portfolio review calls",
    ],
    features: {
      transactionLimit: "Unlimited",
      insights: "AI-Powered Premium",
      support: "Dedicated Manager",
      processing: "Same Day",
      fees: "Zero Fees",
    },
  },
];

function Deposit() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const handleSelectTier = (tierId: string, minDeposit: number) => {
    setSelectedTier(tierId);
    setDepositAmount(minDeposit.toString());
    setShowDepositModal(true);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-10 py-8 md:py-10">
        <Benefits />
        <InvestmentTiers
          depositTiers={depositTiers}
          handleSelectTier={handleSelectTier}
        />
        <BenefitsBreakdown />
        <Support />
        <FQA />
        <StartInvesting />
      </section>
    </DefaultLayout>
  );
}

export default Deposit;

const Benefits = () => (
  <div className="flex flex-col gap-8 w-full">
    <div className="flex flex-col items-center gap-2">
      <h1 className={title({ boldness: "bold" })}>
        Unlock Your{" "}
        <p className={title({ size: "lg", color: "pink", boldness: "bold" })}>
          Investment Potential
        </p>
      </h1>
      <p className={subtitle() + " text-center"}>
        Choose a deposit tier that matches your investment goals and unlock
        exclusive benefits, higher limits, and premium features to maximize your
        returns.
      </p>
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1">
          <Icon
            className="text-success-500"
            height="24"
            icon="material-symbols:check-rounded"
            width="24"
          />
          <p>Secure & Regulated</p>
        </div>
        <div className="flex items-center gap-1">
          <Icon
            className="text-success-500"
            height="24"
            icon="material-symbols:check-rounded"
            width="24"
          />
          <p>Instant Fund Access</p>
        </div>
        <div className="flex items-center gap-1">
          <Icon
            className="text-success-500"
            height="24"
            icon="material-symbols:check-rounded"
            width="24"
          />
          <p>Premium Investment Tools</p>
        </div>
      </div>
    </div>

    <div className="flex flex-col lg:flex-row gap-4 text-center">
      <div className="flex flex-col items-center gap-3 rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
        <div className="bg-[#0f86fc]/30 p-3  rounded-full">
          <Icon
            height="24"
            icon="streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow"
            style={{ color: "#0f86fc" }}
            width="24"
          />
        </div>
        <p className="font-bold">Higher Transaction Limits</p>
        <p className="text-sm">
          Invest larger amounts with increased monthly transaction limits based
          on your tier.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
        <div className="bg-success-500/30 p-3  rounded-full">
          <Icon
            className="text-success-700"
            height="24"
            icon="tabler:users"
            width="24"
          />
        </div>
        <p className="font-bold">Priority Support</p>
        <p className="text-sm">
          Get faster response times and dedicated support channels for your
          investment needs.
        </p>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
        <div className="bg-purple-500/30 p-3  rounded-full">
          <Icon
            className="text-purple-700"
            height="24"
            icon="material-symbols:bolt-outline"
            width="24"
          />
        </div>
        <p className="font-bold">Exclusive Insights </p>
        <p className="text-sm">
          Access advanced analytics, market insights, and AI-powered investment
          recommendations.
        </p>
      </div>
    </div>
  </div>
);

const InvestmentTiers = ({
  depositTiers,
  handleSelectTier,
}: {
  depositTiers: DepositTier[];
  handleSelectTier: any;
}) => {
  const [view, setView] = useState("cards");

  return (
    <div className="mb-12 w-full ">
      <h2 className="text-3xl font-bold text-center mb-8">
        Choose Your Investment Tier
      </h2>

      {/* View Switcher */}
      <div className="flex justify-center mb-8">
        <Tabs
          fullWidth
          className="max-w-lg "
          color="primary"
          onSelectionChange={(key) => {
            setView(key as string);
          }}
        >
          <Tab key={"cards"} title="Card View" />
          <Tab key={"table"} title="Compare Table" />
        </Tabs>
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {depositTiers.map((tier) => (
            <div
              key={tier.id}
              className={`border rounded-lg shadow-sm ${tier.popular ? "ring-2 ring-primary-500" : ""}`}
            >
              <div className={`text-center p-6 ${tier.bgColor} rounded-t-lg`}>
                <div
                  className={`bg-gradient-to-r w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${tier.color}`}
                >
                  <Icon
                    className="text-white"
                    height="24"
                    icon={tier.icon}
                    width="24"
                  />
                </div>
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <p className="text-3xl font-bold mt-2">
                  €{tier.minDeposit.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    minimum
                  </span>
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {Object.entries(tier.features).map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                    >
                      <span className="text-sm text-gray-600 capitalize">
                        {label.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">
                    Key Benefits:
                  </h4>
                  <ul className="space-y-1">
                    {tier.benefits.slice(0, 4).map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-sm text-gray-600"
                      >
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  {tier.benefits.length > 4 && (
                    <p className="text-xs text-gray-500 mt-1">
                      + {tier.benefits.length - 4} more benefits
                    </p>
                  )}
                </div>

                <button
                  className={`w-full px-4 py-2 rounded text-white ${tier.buttonColor}`}
                  onClick={() => handleSelectTier(tier.id, tier.minDeposit)}
                >
                  Choose {tier.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 font-medium">Features</th>
                {depositTiers.map((tier: DepositTier) => (
                  <th key={tier.id} className="text-center p-4 font-medium">
                    <div className="flex flex-col items-center">
                      <div
                        className={`bg-gradient-to-r bg-black w-16 h-16 rounded-full flex items-center justify-center mb-2 ${tier.color}`}
                      >
                        <Icon
                          className="text-white"
                          height="24"
                          icon={tier.icon}
                          width="24"
                        />
                      </div>
                      {tier.name}
                      {tier.popular && (
                        <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-lg mt-1">
                          Popular
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Minimum Deposit",
                  (tier: DepositTier) => `€${tier.minDeposit.toLocaleString()}`,
                ],
                [
                  "Transaction Limit",
                  (tier: DepositTier) => tier.features.transactionLimit,
                ],
                ["Insights", (tier: DepositTier) => tier.features.insights],
                ["Support", (tier: DepositTier) => tier.features.support],
                ["Processing", (tier: DepositTier) => tier.features.processing],
                ["Fees", (tier: DepositTier) => tier.features.fees],
              ].map(([label, getValue], key) => (
                <tr key={key} className="border-b">
                  <td className="p-4 font-medium">{label as string}</td>
                  {depositTiers.map((tier) => (
                    <td key={tier.id} className="p-4 text-center">
                      {typeof getValue === "function"
                        ? getValue(tier)
                        : getValue}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-4 font-medium">Action</td>
                {depositTiers.map((tier) => (
                  <td key={tier.id} className="p-4 text-center">
                    <button
                      className={`px-4 py-2 rounded text-white ${tier.buttonColor}`}
                      onClick={() => handleSelectTier(tier.id, tier.minDeposit)}
                    >
                      Choose {tier.name}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const BenefitsBreakdown = () => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-center mb-8">
      Detailed Benefits Breakdown
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {depositTiers.map((tier) => {
        return (
          <div
            key={tier.id}
            className={`border rounded-lg shadow-sm overflow-hidden ${tier.borderColor}`}
          >
            <div className={`px-6 py-4 ${tier.bgColor}`}>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center mr-3`}
                >
                  <Icon
                    className="text-white"
                    height="24"
                    icon={tier.icon}
                    width="24"
                  />
                </div>
                <h3 className="text-xl font-semibold ">{tier.name} Benefits</h3>
              </div>
            </div>

            <div className="p-6">
              <ul className="space-y-3">
                {tier.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-gray-700"
                  >
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />

                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const Support = () => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-center mb-8">
      Support Channels by Tier
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center border rounded-lg shadow-sm p-6">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon height="24" icon="material-symbols:mail-outline" width="24" />
        </div>
        <h3 className="font-semibold mb-2">Silver - Email Support</h3>
        <p className="text-sm text-gray-600 mb-4">
          Standard email support with 24-48 hour response time during business
          hours.
        </p>
        <span className="inline-block border border-gray-300 text-gray-600 px-2 py-1 text-xs rounded">
          Response: 24-48 hours
        </span>
      </div>

      <div className="text-center border border-yellow-300 rounded-lg shadow-sm p-6">
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon
            className="text-yellow-700"
            height="24"
            icon="mage:message-round"
            width="24"
          />
        </div>
        <h3 className="font-semibold mb-2">Gold - Priority Email & Chat</h3>
        <p className="text-sm text-gray-600 mb-4">
          Priority email support and live chat with 4-8 hour response time.
        </p>
        <span className="inline-block border border-yellow-300 text-yellow-600 px-2 py-1 text-xs rounded">
          Response: 4-8 hours
        </span>
      </div>

      <div className="text-center border border-purple-300 rounded-lg shadow-sm p-6">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon
            className="text-purple-600"
            height="24"
            icon="ic:outline-phone"
            width="24"
          />
        </div>
        <h3 className="font-semibold mb-2">Platinum - Dedicated Manager</h3>
        <p className="text-sm text-gray-600 mb-4">
          Dedicated relationship manager with phone, email, and chat support
          available 24/7.
        </p>
        <span className="inline-block border border-purple-300 text-purple-600 px-2 py-1 text-xs rounded">
          Response: 1-2 hours
        </span>
      </div>
    </div>
  </div>
);

const FQA = () => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-center mb-8">
      Frequently Asked Questions
    </h2>
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="border rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-2">Can I upgrade my tier later?</h3>
        <p className="text-sm text-gray-600">
          Yes, you can upgrade your tier at any time by making an additional
          deposit to meet the minimum requirement for the higher tier.
        </p>
      </div>

      <div className="border rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-2">Are there any hidden fees?</h3>
        <p className="text-sm text-gray-600">
          No, all fees are clearly disclosed. Higher tiers actually reduce or
          eliminate transaction fees, saving you money on investments.
        </p>
      </div>

      <div className="border rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-2">How secure are my deposits?</h3>
        <p className="text-sm text-gray-600">
          All deposits are held in segregated accounts with custodians
          authorised by the relevant financial regulators in the EU/EEA.
          Additionally, deposits are protected under the applicable national
          deposit guarantee schemes, which insure eligible funds up to €100,000
          per account
        </p>
      </div>

      <div className="border rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-2">
          Can I withdraw my deposit anytime?
        </h3>
        <p className="text-sm text-gray-600">
          Yes, you can withdraw your funds at any time. Processing times vary by
          tier, with Platinum members getting same-day processing.
        </p>
      </div>
    </div>
  </div>
);

const StartInvesting = () => (
  <div className="w-full text-center bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg p-8 text-white">
    <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
    <p className="text-xl mb-6 opacity-90">
      Choose your tier and unlock the full potential of your investments today.
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      {depositTiers.map((tier) => (
        <Button
          key={tier.id}
          className="bg-white text-gray-900 hover:bg-gray-100"
          variant="light"
        >
          Start with {tier.name}
        </Button>
      ))}
    </div>
  </div>
);
