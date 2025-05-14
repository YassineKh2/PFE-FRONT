import { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { Tabs, Tab } from "@heroui/tabs";
import {PredictMF,GetPredictions} from "@/services/PredictMF"
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "@/providers/AuthProvider";
import { Fund } from "@/types/MutualFunds";

const Linebar = ({ mutualFund,mutualFundDetails }: { mutualFund: any,mutualFundDetails:Fund }) => {
  const reversedData = mutualFund as any;
  const [pourcentage, setPourcentage] = useState<string>();
  const [IsSaved, setIsSaved] = useState<Boolean>(false);
  const [predictions, setPredictions] = useState<{
    min:number[],
    max:number[],
    mean:number[],
    date:string[],
  }>({} as {
    min:number[],
    max:number[],
    mean:number[],
    date:string[],
  });

  const { currentUser } = useAuth();
  useEffect(() => {
    const userUID = currentUser.uid;
    if (!userUID) return;

    const savedFunds = localStorage.getItem(`savedFunds_${userUID}`);
    if (!savedFunds) return;

    let savedFundsTable = JSON.parse(savedFunds) as String[];
    setIsSaved(savedFundsTable.includes(mutualFundDetails.isin));
  }, []);

  const SaveFund = () => {
    const userUID = currentUser.uid;
    if (!userUID) return;

    const savedFunds = localStorage.getItem(`savedFunds_${userUID}`);
    let savedFundsTable = savedFunds ? JSON.parse(savedFunds) : [];

    if (savedFundsTable.includes(mutualFundDetails.isin)) return;
    savedFundsTable.push(mutualFundDetails.isin);
    localStorage.setItem(
      `savedFunds_${userUID}`,
      JSON.stringify(savedFundsTable)
    );
    setIsSaved(true);
  };

  const RemoveFund = () => {
    const userUID = currentUser.uid;
    if (!userUID) return;

    const savedFunds = localStorage.getItem(`savedFunds_${userUID}`);
    if (!savedFunds) return;

    let savedFundsTable = JSON.parse(savedFunds) as String[];
    savedFundsTable = savedFundsTable.filter(
      (code) => code !== mutualFundDetails.isin
    );

    localStorage.setItem(
      `savedFunds_${userUID}`,
      JSON.stringify(savedFundsTable)
    );
    setIsSaved(false);
  };

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
      categories: reversedData.map((data:any) => data[0]),
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
      data: reversedData.map((data:any) => parseFloat(data[0])),
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
      key: "All Time",
      label: "All Time",
    },
    {
      key: "30 Days",
      label: "30 Days",
    },
    {
      key: "6 Months",
      label: "6 Months",
    },
    {
      key: "1 Year",
      label: "1 Year",
    },
    {
      key: "Custom",
      label: "Custom",
    },
  ];


  

  return (
    <div className="max-w-7xl w-full bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white pb-4">
          {mutualFundDetails.name}
        </h1>
        <Button
          isIconOnly
          className="bg-white dark:bg-[#18181B] hover:bg-orange-300 dark:hover:bg-orange-500"
        >
          {IsSaved ? (
            <Icon
              icon="material-symbols:star-rounded"
              width="24"
              height="24"
              color="#fdba74"
              onClick={()=>{RemoveFund()}}
            />
          ) : (
            <Icon
              icon="material-symbols:star-outline-rounded"
              width="24"
              height="24"
              onClick={()=>{SaveFund()}}
            />
          )}
        </Button>
      </div>
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            32.4k
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Traded this week
          </p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500">
          {predictions?.mean?.length > 0 ? `${pourcentage}%` : "N/A"}
          <svg
            className="w-3 h-3 ms-1"
            viewBox="0 0 10 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </div>
      </div>
      <ApexCharts options={options} series={series} type="area" height="100%" />
      <div className="flex items-center justify-center border-gray-200 border-t dark:border-gray-700 pt-5">
        <Tabs aria-label="Tabs sizes" size="sm" >
          {items.map((item) => (
            <Tab key={item.key} title={item.label} />
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Linebar;
