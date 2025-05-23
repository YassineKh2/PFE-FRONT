import { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { Tabs, Tab } from "@heroui/tabs";
import { PredictMF, GetPredictions } from "@/services/PredictMF";
import { Fund } from "@/types/MutualFunds";

const Linebar = ({
  mutualFund,
  mutualFundDetails,
}: {
  mutualFund: any;
  mutualFundDetails: Fund;
}) => {
  const reversedData = mutualFund as any;
  const [predictions, setPredictions] = useState<{
    min: number[];
    max: number[];
    mean: number[];
    date: string[];
  }>(
    {} as {
      min: number[];
      max: number[];
      mean: number[];
      date: string[];
    }
  );

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const predictions = await GetPredictions(mutualFundDetails.isin);
        let data = predictions.data.data.predictions;
        setPredictions({
          min: data.map((entry: { min: number }) => entry.min),
          max: data.map((entry: { max: number }) => entry.max),
          mean: data.map((entry: { value: number }) => entry.value),
          date: data.map((entry: { date: string }) => entry.date),
        });
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          PredictMF(reversedData.reverse(), mutualFundDetails.isin).then(
            (predictions) => {
              let data = predictions.data.data.predictions;

              setPredictions({
                min: data.map((entry: { min: number }) => entry.min),
                max: data.map((entry: { max: number }) => entry.max),
                mean: data.map((entry: { value: number }) => entry.value),
                date: data.map((entry: { date: string }) => entry.date),
              });
            }
          );
        } else {
          console.error("Error fetching predictions:", error);
        }
      }
    };

    fetchPredictions();
  }, []);

  const [options, setOptions] = useState({
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area" as "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        borderRadius: "5px",
      },
      x: {
        show: false,
        format: "dd MMM yyyy",
      },
      y: {
        formatter: function (value: any) {
          return `$${value}`;
        },
        title: {
          formatter: function (seriesName: String) {
            return `${seriesName}: `;
          },
        },
      },
      marker: {
        show: true,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -26,
      },
    },
    xaxis: {
      categories: reversedData.map((data: any) => data[0]),
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  });

  const [series, setSeries] = useState([
    {
      name: "NAV Price",
      data: reversedData.map((data: any) => parseFloat(data[0])),
      color: "#1A56DB",
    },
    {
      name: "Predicted NAV Price",
      data: [],
      color: "#A020F0",
    },
  ]);

  useEffect(() => {
    if (predictions && predictions.date && predictions.date.length) {
      // Create the common date timeline from reversedData
      const commonDates = reversedData.map((data: any) => data[0]);
      // Find the starting index of predictions in the timeline
      const startIndex = commonDates.indexOf(predictions.date[0]);
      const offset = startIndex === -1 ? 0 : startIndex;
      // Create a padding array of nulls to align predictions with the x-axis
      const pad = new Array(offset).fill(null);

      const combinedMeanData = [...pad, ...predictions.mean];
      const combinedMinData = [...pad, ...predictions.min];
      const combinedMaxData = [...pad, ...predictions.max];

      setSeries([
        {
          name: "NAV Price",
          data: reversedData.map((data: any) => data[1]),
          color: "#1A56DB",
        },
        {
          name: "Predicted Mean NAV Price",
          data: combinedMeanData,
          color: "#A020F0",
        },
        {
          name: "Predicted Min NAV Price",
          data: combinedMinData,
          color: "#00C49F",
        },
        {
          name: "Predicted Max NAV Price",
          data: combinedMaxData,
          color: "#FF8042",
        },
      ]);
    }
  }, [predictions]);

  const items = [
    {
      key: "1 Year",
      label: "1 Year",
    },
    {
      key: "3 Years",
      label: "3 Years",
    },
    {
      key: "5 Years",
      label: "5 Years",
    },
    {
      key: "Max",
      label: "Max",
    },
  ];

  return (
    <div className="w-full self-start bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white pb-4">
          Performance
        </h1>
        <Tabs aria-label="Tabs sizes" size="sm" color="primary">
          {items.map((item) => (
            <Tab key={item.key} title={item.label} />
          ))}
        </Tabs>
      </div>
      <div className="flex justify-between"></div>
      <ApexCharts options={options} series={series} type="area" height="100%" />
      <div className="flex justify-around mt-5">
        <div className="flex flex-col  items-center">
          <p className="text-gray-600">1Y Return</p>
          <p className="text-green-500">{mutualFundDetails.returns["1Y"]}</p>
        </div>
        <div className="flex flex-col  items-center">
          <p className="text-gray-600">3Y Return</p>
          <p className="text-green-500">{mutualFundDetails.returns["3Y"]}</p>
        </div>
        <div className="flex flex-col  items-center">
          <p className="text-gray-600">5Y Return</p>
          <p className="text-green-500">{mutualFundDetails.returns["5Y"]}</p>
        </div>
      </div>
    </div>
  );
};

export default Linebar;
