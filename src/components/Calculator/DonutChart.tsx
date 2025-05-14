import { Button } from "@heroui/button";
import Chart from "react-apexcharts";


const DonutChart = ({ chartOptions, chartSeries }: any) => {
    return (
      <>
        <div className="w-[35%] flex flex-col items-center gap-4">
          <div className="flex gap-4 text-xs text-gray-600 font-normal">
            <div className="flex items-center gap-1">
              <div className="rounded-xl bg-slate-500 w-6 py-1.5"></div>
              <p>Invested Amount</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="rounded-xl bg-[#fc3c61] w-6 p-1.5"></div>
              <p>Est. Returns</p>
            </div>
          </div>
          <Chart options={chartOptions} series={chartSeries} type="donut" />
          <Button className="mt-28 bg-gradient-to-r from-[#E7649C] to-[#fc3c61] text-white ">
            INVEST NOW
          </Button>
        </div>
      </>
    );
};

export default DonutChart;  