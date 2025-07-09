import { useState } from "react";

import Filter from "@/components/MutualFunds/Filter";
import FilterdFunds from "@/components/MutualFunds/FilterdFunds";
import DefaultLayout from "@/layouts/default";

export default function FilterFunds() {
  const [filters, setFilters] = useState<{
    amcs: string[];
    categories: string[];
    risks: string[];
    fundSizes: string[];
  }>({
    amcs: [],
    categories: [],
    risks: [],
    fundSizes: [],
  });

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex justify-between w-full gap-6">
          <Filter setFilters={setFilters} />
          <FilterdFunds filters={filters} />
        </div>
      </section>
    </DefaultLayout>
  );
}
