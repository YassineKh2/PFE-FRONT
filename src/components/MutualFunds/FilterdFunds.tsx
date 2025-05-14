/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import { Select, SelectItem } from "@heroui/select";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import {funds as fakeFundsData} from "@/database/MutualFunds.json"


interface Filters {
  amcs: string[];
  categories: string[];
  risks: string[];
  fundSizes: string[];
}
interface Fund {
  name: string;
  amc: string;
  risk: string;
  category: string;
  rating: number;
  fundSize: string;
  returns: { "1Y": string; "3Y": string; "5Y": string };
}

function FilterdFunds({ filters }: { filters: Filters }) {
  const [filteredFunds, setFilteredFunds] = useState(fakeFundsData);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = fakeFundsData;

      if (filters.amcs.length > 0) {
        filtered = filtered.filter((fund) => filters.amcs.includes(fund.amc));
      }
      if (filters.categories.length > 0) {
        filtered = filtered.filter((fund) => filters.categories.includes(fund.category));
      }
      if (filters.risks.length > 0) {
        filtered = filtered.filter((fund) => filters.risks.includes(fund.risk));
      }
      if (filters.fundSizes.length > 0) {
        filtered = filtered.filter((fund) => filters.fundSizes.includes(fund.fundSize));
      }

      setFilteredFunds(filtered);
    };

    applyFilters();
  }, [filters]);

  return (
    <div className="mt-14 w-[70%] space-y-5">
    <SortBy fundsfound={filteredFunds.length}/>
      <MutualFunds data={filteredFunds} />
    </div>
  );
}

export default FilterdFunds;

const SortBy = ({fundsfound}:{fundsfound:number}) => {
  return (
    <div className="flex justify-between items-end">
      <p className="text-gray-700">
        Search Results :{" "}
        <strong className="text-gray-600">{fundsfound} Mutual Funds</strong>
      </p>
      <Select
        className="max-w-xs"
        defaultSelectedKeys={["populatary"]}
        renderValue={(items) =>
          items.map((item) => (
            <p key={item.key} className="text-primary-700">
              {item.textValue}{" "}
            </p>
          ))
        }
        size="md"
        startContent={
          <p className="text-sm text-gray-600">Sorted&nbsp;by&nbsp;:</p>
        }
      >
        <SelectItem key="populatary" textValue={"Populatary"}>
          Populatary
        </SelectItem>
        <SelectItem key="rating" textValue={"Rating - High To Low"}>
          Rating - High To Low
        </SelectItem>
        <SelectItem key="returns" textValue={"Returns - High To Low"}>
          Returns - High To Low
        </SelectItem>
      </Select>
    </div>
  );
};


const MutualFunds = ({ data }: { data: Fund[] }) => {
  return (
    <div>
      <Table hideHeader aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Fund</TableColumn>
          <TableColumn>Returns</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((fund, index) => (
            <TableRow key={index} className="flex justify-between py-3 border-b-1 border-dashed group transform transition-all duration-300 hover:scale-[101%] hover:cursor-pointer">
              <TableCell>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-800 group-hover:text-primary-500 group-hover:underline">
                    {fund.name}
                  </p>
                  <div className="flex gap-2 text-gray-500 text-xs">
                    <p>{fund.risk} Risk ●</p>
                    <p> {fund.category} ●</p>
                    <p> {fund.rating}★</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-10">
                  <div className="flex flex-col items-center ">
                    <p className="font-semibold text-gray-800">{fund.returns["1Y"]}</p>
                    <p className="text-gray-600 text-xs">1Y</p>
                  </div>
                  <div className="flex flex-col items-center ">
                    <p className="font-semibold text-gray-800">{fund.returns["3Y"]}</p>
                    <p className="text-gray-600 text-xs">3Y</p>
                  </div>
                  <div className="flex flex-col items-center ">
                    <p className="font-semibold text-gray-800">{fund.returns["5Y"]}</p>
                    <p className="text-gray-600 text-xs">5Y</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};