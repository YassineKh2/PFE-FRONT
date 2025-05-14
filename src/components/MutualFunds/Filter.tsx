/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";

import { SearchIcon } from "../icons";
import { title } from "../primitives";

const fakeAMCData = [
  "Prosperity AMC",
  "HDFC AMC",
  "SBI Mutual Fund",
  "ICICI Prudential AMC",
  "Axis AMC",
  "Kotak AMC",
  "Franklin Templeton AMC",
  "DSP AMC",
  "Mirae Asset AMC",
  "UTI AMC",
  "Edelweiss AMC",
  "IDFC AMC",
  "Tata AMC",
];

const fakeCategoryData = ["Equity", "Hybrid", "Debt", "Thematic", "Index", "International"];
const fakeRiskData = [
  "Low",
  "Moderate",
  "High",
  "Very-High",
];
const fakeFundSizeData = ["50M","100M", "500M-1B", "100M-500M", "1B+"];

interface CheckboxChangeHandler {
  (
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ): void;
}
interface AMCProps {
  data: string[];
  selectedAMCs: string[];
  onCheckboxChange: (value: string) => void;
}
interface CategoryProps {
  data: string[];
  selectedCategories: string[];
  onCheckboxChange: (value: string) => void;
}
interface RiskProps {
  data: string[];
  selectedRisks: string[];
  onCheckboxChange: (value: string) => void;
}

interface FundSizeProps {
  data: string[];
  selectedFundSizes: string[];
  onCheckboxChange: (value: string) => void;
}

interface FilterProps {
  setFilters: React.Dispatch<React.SetStateAction<{
    amcs: string[];
    categories: string[];
    risks: string[];
    fundSizes: string[];
  }>>;
}

export default function Filter({ setFilters }: FilterProps) {
  const [selectedAMCs, setSelectedAMCs] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  const [selectedFundSizes, setSelectedFundSizes] = useState<string[]>([]);

  const handleCheckboxChange: CheckboxChangeHandler = (setSelected, value) => {
    setSelected((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handleClearAll = () => {
    setSelectedAMCs([]);
    setSelectedCategories([]);
    setSelectedRisks([]);
    setSelectedFundSizes([]);
  };

  useEffect(() => {
    setFilters({
      amcs: selectedAMCs,
      categories: selectedCategories,
      risks: selectedRisks,
      fundSizes: selectedFundSizes,
    });
  }, [selectedAMCs, selectedCategories, selectedRisks, selectedFundSizes]);

  return (
    <>
      <div className="space-y-4 w-[30%]">
        <h1 className={title({ size: "sm" })}>All Mutual Funds</h1>
        <div className="bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6 ">
          <div className="flex justify-between items-center border-b-2 font-semibold">
            <p className="text-gray-700 mb-2">FILTERS</p>
            <Button
              className="text-primary-500 mb-2"
              color="primary"
              variant="light"
              onPress={handleClearAll}
            >
              CLEAR ALL
            </Button>
          </div>
          <Accordion
            isCompact
            defaultExpandedKeys={["1","2","3","4"]}
            selectionMode="multiple"
          >
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title={<h1 className="text-gray-600 font-semibold">AMC</h1>}
            >
              <AMC
                data={fakeAMCData}
                selectedAMCs={selectedAMCs}
                onCheckboxChange={(value: string) =>
                  handleCheckboxChange(setSelectedAMCs, value)
                }
              />
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title={<h1 className="text-gray-600 font-semibold">Category</h1>}
            >
              <Category
                data={fakeCategoryData}
                selectedCategories={selectedCategories}
                onCheckboxChange={(value: string) =>
                  handleCheckboxChange(setSelectedCategories, value)
                }
              />
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              title={<h1 className="text-gray-600 font-semibold">Risk</h1>}
            >
              <Risk
                data={fakeRiskData}
                selectedRisks={selectedRisks}
                onCheckboxChange={(value: string) =>
                  handleCheckboxChange(setSelectedRisks, value)
                }
              />
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="Accordion 4"
              title={<h1 className="text-gray-600 font-semibold">Fund Size</h1>}
            >
              <FundSize
                data={fakeFundSizeData}
                selectedFundSizes={selectedFundSizes}
                onCheckboxChange={(value: string) =>
                  handleCheckboxChange(setSelectedFundSizes, value)
                }
              />
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}

const AMC = ({ data, selectedAMCs, onCheckboxChange }: AMCProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <>
      <Input
      aria-label="Search"
      labelPlacement="outside"
      placeholder="Search..."
      size="sm"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      variant="bordered"
      onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col h-full max-h-40 overflow-auto gap-2 my-2">
      {data
        .filter((amc) =>
        amc.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((amc) => (
        <Checkbox
          key={amc}
          isSelected={selectedAMCs.includes(amc)}
          onChange={() => onCheckboxChange(amc)}
        >
          {amc}
        </Checkbox>
        ))}
      </div>
    </>
  );
};

const Category = ({
  data,
  selectedCategories,
  onCheckboxChange,
}: CategoryProps) => {
  return (
    <>
      <div className="flex flex-col h-full gap-1 my-2">
        {data.map((category) => (
          <Checkbox
            key={category}
            isSelected={selectedCategories.includes(category)}
            onChange={() => onCheckboxChange(category)}
          >
            {category}
          </Checkbox>
        ))}
      </div>
    </>
  );
};

const Risk = ({ data, selectedRisks, onCheckboxChange }: RiskProps) => {
  return (
    <>
      <div className="flex flex-col h-full my-2 gap-1">
        {data.map((risk) => (
          <Checkbox
            key={risk}
            isSelected={selectedRisks.includes(risk)}
            onChange={() => onCheckboxChange(risk)}
          >
            {risk}
          </Checkbox>
        ))}
      </div>
    </>
  );
};

const FundSize = ({
  data,
  selectedFundSizes,
  onCheckboxChange,
}: FundSizeProps) => {
  return (
    <>
      <div className="flex flex-col h-full my-2 gap-1">
        {data.map((fundSize) => (
          <Checkbox
            key={fundSize}
            isSelected={selectedFundSizes.includes(fundSize)}
            onChange={() => onCheckboxChange(fundSize)}
          >
            {fundSize}
          </Checkbox>
        ))}
      </div>
    </>
  );
};