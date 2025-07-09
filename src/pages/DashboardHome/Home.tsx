import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, CardBody } from "@heroui/react";

import { subtitle, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";
import { useAuth } from "@/providers/AuthProvider";
import Cards from "@/components/DashboardHome/Cards";
import Linebar from "@/components/DashboardHome/Linebar";
import Holding from "@/components/Manager/Holding";
import AssetAllocation from "@/components/Manager/AssetAllocation";
import RecentTransactions from "@/components/DashboardHome/RecentTransactions";
import QuickActions from "@/components/DashboardHome/QuickActions";

const depositTiers = [
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

export default function Home() {
  const { currentUser } = useAuth();

  // Fake portfolio funds data
  const portfolioFunds = [
    {
      id: 1,
      shortName: "L&T Midcap",
      category: "Equity",
      risk: "High",
      value: 45000,
      todayChange: 2.2,
      units: 358.2,
      currentPrice: 125.75,
      gains: 5420,
      gainsPercentage: 13.7,
    },
    {
      id: 2,
      shortName: "HDFC Equity",
      category: "Equity",
      risk: "Medium",
      value: 35000,
      todayChange: -0.5,
      units: 350,
      currentPrice: 100,
      gains: 735,
      gainsPercentage: -2.1,
    },
    {
      id: 3,
      shortName: "SBI Blue Chip",
      category: "Equity",
      risk: "Low",
      value: 28750,
      todayChange: 1.1,
      units: 239.6,
      currentPrice: 120,
      gains: 3250,
      gainsPercentage: 12.8,
    },
    {
      id: 4,
      shortName: "Axis Growth",
      category: "Equity",
      risk: "High",
      value: 17000,
      todayChange: -1.2,
      units: 170,
      currentPrice: 100,
      gains: 1200,
      gainsPercentage: 7.6,
    },
    {
      id: 5,
      shortName: "Axis Growth",
      category: "Equity",
      risk: "High",
      value: 17000,
      todayChange: -1.2,
      units: 170,
      currentPrice: 100,
      gains: 1200,
      gainsPercentage: 7.6,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div>
            <h1 className={title({ size: "sm", boldness: "bold" })}>
              Welcome back, {currentUser.displayName} !
            </h1>

            <p className={subtitle({ size: "xs" }) + " text-gray-400"}>
              Here&apos;s your portfolio overview for today
            </p>
          </div>
          <div className="text-white">
            {depositTiers
              .filter((tier) => tier.name === currentUser.depositTier)
              .map((tier) => (
                <div
                  key={tier.id}
                  className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r rounded-lg border ${tier.borderColor} ${tier.color} shadow-sm`}
                >
                  <Icon className={`text-xl`} icon={tier.icon} width={24} />
                  <span className={`font-semibold`}>{tier.name} Member</span>
                </div>
              ))}
          </div>
        </div>

        <QuickActions />
        <Cards userid={currentUser.uid} />

        <div className="flex flex-col lg:flex-row justify-between w-full gap-6">
          <div className="lg:w-[70%] flex flex-col gap-6">
            <Linebar data={[1, 2, 3, 2, 4, 5]} />
            <Holding userid={currentUser.uid} />
          </div>
          <div className="lg:w-[30%] flex flex-col gap-6">
            <AssetAllocation userid={currentUser.uid} />
            <Card className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-outline-rounded"
                  width={22}
                />
                <p className="text-xl font-bold">Gold Membership</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">
                  Progress to{" "}
                  <span className="text-purple-600 font-semibold">
                    Platinum
                  </span>
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-purple-500 h-2.5 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>75%</span>
                  <span>€74,250 more to reach Platinum</span>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">Your Benefits</p>
                <ul className="ml-1 text-sm text-gray-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <Icon
                      className="text-primary-500"
                      icon="mdi:shield-check-outline"
                      width={18}
                    />
                    Enhanced portfolio protection
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      className="text-primary-500"
                      icon="mdi:headset"
                      width={18}
                    />
                    Priority customer support
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      className="text-primary-500"
                      icon="mdi:chart-line-variant"
                      width={18}
                    />
                    Quarterly investment insights
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      className="text-primary-500"
                      icon="mdi:percent-outline"
                      width={18}
                    />
                    Reduced transaction fees
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2 text-gray-700">
                  Unlock with Platinum
                </p>
                <ul className="ml-1 text-sm text-gray-500 space-y-1">
                  <li className="flex items-center gap-2">
                    <Icon
                      className="text-purple-500"
                      icon="material-symbols:crown-outline-rounded"
                      width={18}
                    />
                    Premium portfolio management
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      className="text-purple-500"
                      icon="mdi:account-tie"
                      width={18}
                    />
                    Dedicated relationship manager
                  </li>
                </ul>
              </div>
            </Card>
            <Card>
              <CardBody className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Icon
                    className="text-primary-500"
                    icon="bx:stats"
                    width={22}
                  />
                  <p className="text-xl font-bold">Quick Stats</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Invested</span>
                  <span className="font-semibold">125,750€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Number of Funds</span>
                  <span className="font-semibold">{portfolioFunds.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Best Performer</span>
                  <span className="font-semibold text-green-600">
                    L&T Midcap (+13.7%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Portfolio Age</span>
                  <span className="font-semibold">2 years 4 months</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icon
                  className="h-5 w-5 text-pink-500"
                  icon="mdi:credit-card-outline"
                  width={20}
                />
                <span className="text-lg font-semibold">
                  Recent Transactions
                </span>
              </div>
              <Button size="sm" variant="bordered">
                <Icon
                  className="h-4 w-4 mr-2"
                  icon="mdi:eye-outline"
                  width={16}
                />
                View All
              </Button>
            </div>
            <RecentTransactions userid={currentUser.uid} />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
