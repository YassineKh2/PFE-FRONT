import { Input } from "@heroui/input";
import { useEffect, useState } from "react";

import { SearchIcon } from "@/components/icons";
import Cards from "@/components/Manager/Cards";
import { subtitle, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";
import { useAuth } from "@/providers/AuthProvider";
import { User as UserType } from "@/types/User";
import { GetManagedUsers } from "@/services/User";
import FilteredClients from "@/components/Manager/FilteredClients";
import { GetManagedUsersAssets, GetManagerStats } from "@/services/Deposit";
import { ManagerStats, UserAssets as UserAssetsType } from "@/types/Deposit";

function ClientList() {
  const [Clients, setClients] = useState<UserType[]>([] as UserType[]);
  const [UserAssets, SetUserAssets] = useState<UserAssetsType[]>(
    [] as UserAssetsType[],
  );
  const [ManagerStats, SetManagerStats] = useState<ManagerStats>(
    {} as ManagerStats,
  );
  const [SearchTerm, setSearchTerm] = useState<string>();
  const { currentUser } = useAuth();

  useEffect(() => {
    GetManagedUsers(currentUser.uid).then((response) => {
      setClients(response.managedUsers);
    });
    GetManagedUsersAssets(currentUser.uid).then((response) => {
      SetUserAssets(response);
    });
    GetManagerStats(currentUser.uid).then((response) => {
      SetManagerStats(response);
    });
  }, []);

  // Filter Clients based on SearchTerm
  const filteredClients = SearchTerm
    ? Clients.filter((course) =>
        course.name?.toLowerCase().includes(SearchTerm.toLowerCase()),
      )
    : Clients;

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div>
          <h1 className={title({ size: "sm", boldness: "bold" })}>
            Client Portfolio Manager
          </h1>

          <p className={subtitle({ size: "xs" }) + " text-gray-400"}>
            Manage and monitor your clients investments
          </p>
        </div>

        <Input
          aria-label="Search"
          className="max-w-xs"
          labelPlacement="outside"
          placeholder="Search Clients..."
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
          variant="bordered"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full gap-12 mt-8 lg:mt-0">
        <Cards ManagerStats={ManagerStats} />
        <FilteredClients
          ClientAssets={UserAssets}
          filteredClients={filteredClients}
        />
      </div>
    </DashboardLayout>
  );
}

export default ClientList;
