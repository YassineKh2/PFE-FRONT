import { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { Card } from "@heroui/react";
import { Tabs, Tab } from "@heroui/tabs";
import { Icon } from "@iconify/react/dist/iconify.js";
const Linebar = ({
  data,
  label = "Value",
}: {
  data: number[];
  label?: string;
}) => {
  const [tab, setTab] = useState("1Y");
  const [options] = useState({
    chart: {
      type: "line" as "line",
      toolbar: { show: false },
    },
    xaxis: {
      categories: data.map((_, idx) => idx + 1),
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 2 },
    grid: { show: false },
  });

  const [series, setSeries] = useState([
    {
      name: label,
      data: data,
      color: "#1A56DB",
    },
  ]);

  useEffect(() => {
    setSeries([{ name: label, data, color: "#1A56DB" }]);
  }, [data, label]);

  const items = [
    { key: "1Y", label: "1 Year" },
    { key: "3Y", label: "3 Years" },
    { key: "5Y", label: "5 Years" },
    { key: "Max", label: "Max" },
  ];

  return (
    <Card className="w-full bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 items-center pb-4">
          <Icon
            className="text-primary-500"
            icon="stash:chart-trend-up"
            width={40}
          />
          <h1 className="text-xl font-bold ">Portfolio Performance</h1>
        </div>
        <Tabs
          aria-label="Tabs sizes"
          color="primary"
          selectedKey={tab}
          size="sm"
          onSelectionChange={(key) => {
            if (typeof key === "string") setTab(key);
          }}
        >
          {items.map((item) => (
            <Tab key={item.key} title={item.label} />
          ))}
        </Tabs>
      </div>
      <ApexCharts height={120} options={options} series={series} type="line" />
    </Card>
  );
};

export default Linebar;
