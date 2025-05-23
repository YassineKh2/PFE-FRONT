/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { subtitle, title } from "@/components/primitives";
import { SearchIcon } from "@/components/icons";

const fakeCategoryData = [
  "General",
  "Equity",
  "Debt",
  "Hybrid",
];
const fakeLevelData = ["Beginner", "Intermediate", "Advanced"];
const fakeDurationData = ["< 1 Month", "1-3 Months", "> 3 Months"];
const fakeInstructorData = [
  "Jane Doe",
  "John Smith",
  "Alice Johnson",
  "Bob Lee",
];

interface FilterProps {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      categories: string[];
      levels: string[];
      durations: string[];
      instructors: string[];
    }>
  >;
}

export default function Filter({ setFilters }: FilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([]);

  const handleCheckboxChange = (
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setSelected((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedDurations([]);
    setSelectedInstructors([]);
  };

  useEffect(() => {
    setFilters({
      categories: selectedCategories,
      levels: selectedLevels,
      durations: selectedDurations,
      instructors: selectedInstructors,
    });
  }, [
    selectedCategories,
    selectedLevels,
    selectedDurations,
    selectedInstructors,
  ]);

  return (
    <div className="space-y-4 w-[30%] hidden lg:block">
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
          defaultExpandedKeys={["1", "2", "3", "4"]}
          selectionMode="multiple"
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
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
            key="2"
            aria-label="Accordion 2"
            title={<h1 className="text-gray-600 font-semibold">Level</h1>}
          >
            <Level
              data={fakeLevelData}
              selectedLevels={selectedLevels}
              onCheckboxChange={(value: string) =>
                handleCheckboxChange(setSelectedLevels, value)
              }
            />
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            title={<h1 className="text-gray-600 font-semibold">Duration</h1>}
          >
            <Duration
              data={fakeDurationData}
              selectedDurations={selectedDurations}
              onCheckboxChange={(value: string) =>
                handleCheckboxChange(setSelectedDurations, value)
              }
            />
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Accordion 4"
            title={<h1 className="text-gray-600 font-semibold">Instructor</h1>}
          >
            <Instructor
              data={fakeInstructorData}
              selectedInstructors={selectedInstructors}
              onCheckboxChange={(value: string) =>
                handleCheckboxChange(setSelectedInstructors, value)
              }
            />
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

const Category = ({
  data,
  selectedCategories,
  onCheckboxChange,
}: {
  data: string[];
  selectedCategories: string[];
  onCheckboxChange: (value: string) => void;
}) => (
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
);

const Level = ({
  data,
  selectedLevels,
  onCheckboxChange,
}: {
  data: string[];
  selectedLevels: string[];
  onCheckboxChange: (value: string) => void;
}) => (
  <div className="flex flex-col h-full gap-1 my-2">
    {data.map((level) => (
      <Checkbox
        key={level}
        isSelected={selectedLevels.includes(level)}
        onChange={() => onCheckboxChange(level)}
      >
        {level}
      </Checkbox>
    ))}
  </div>
);

const Duration = ({
  data,
  selectedDurations,
  onCheckboxChange,
}: {
  data: string[];
  selectedDurations: string[];
  onCheckboxChange: (value: string) => void;
}) => (
  <div className="flex flex-col h-full gap-1 my-2">
    {data.map((duration) => (
      <Checkbox
        key={duration}
        isSelected={selectedDurations.includes(duration)}
        onChange={() => onCheckboxChange(duration)}
      >
        {duration}
      </Checkbox>
    ))}
  </div>
);

const Instructor = ({
  data,
  selectedInstructors,
  onCheckboxChange,
}: {
  data: string[];
  selectedInstructors: string[];
  onCheckboxChange: (value: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <>
      <Input
        aria-label="Search"
        labelPlacement="outside"
        placeholder="Search instructor..."
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
          .filter((instructor) =>
            instructor.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((instructor) => (
            <Checkbox
              key={instructor}
              isSelected={selectedInstructors.includes(instructor)}
              onChange={() => onCheckboxChange(instructor)}
            >
              {instructor}
            </Checkbox>
          ))}
      </div>
    </>
  );
};
