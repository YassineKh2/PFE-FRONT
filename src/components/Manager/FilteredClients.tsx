import { Button, Card, CardBody, CardHeader, Chip, User } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

import { User as UserType } from "@/types/User";

function FilteredClients({ filteredClients }: { filteredClients: UserType[] }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold p-3">Client Portfolios</h2>
      </CardHeader>
      <CardBody className="overflow-visible py-2 space-y-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="flex flex-col gap-4 border border-gray-200 rounded-md hover:bg-gray-50"
          >
            <div className="flex items-center justify-between p-4 ">
              <User
                avatarProps={{
                  src: client.photoURL,
                }}
                description={client.role || "Client"}
                name={client.name}
              />
              <div className="flex justify-between gap-4">
                <div className="flex flex-col items-start font-semibold">
                  <p>€5000</p>
                  <div className="flex items-center text-sm text-success">
                    <Icon icon={"stash:chart-trend-up"} width={24} />
                    <p>2%</p>
                  </div>
                </div>
                <div className="flex justify-between gap-1">
                  <Button
                    as={Link}
                    startContent={
                      <Icon
                        className="text-gray-600"
                        icon={"mage:message-round"}
                        width={16}
                      />
                    }
                    to={"/dashboard/managerchat?userId=" + client.id}
                    variant="bordered"
                  >
                    Chat
                  </Button>
                  <Button
                    startContent={
                      <Icon
                        className="text-gray-600"
                        icon={"solar:eye-outline"}
                        width={16}
                      />
                    }
                    variant="bordered"
                  >
                    View
                  </Button>
                  <Button isIconOnly variant="light">
                    <Icon icon={"tabler:dots"} width={24} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex w-full px-4 py-2 gap-4 mb-2">
              <div className="flex overflow-auto w-full ">
                <div className="border border-gray-200 rounded-xl flex justify-between items-center p-4 w-full">
                  <div className="flex flex-col items-start text-sm">
                    <p>Growth Portfolio</p>
                    <p className="font-semibold text-lg">€10,000</p>
                  </div>
                  <Chip className="bg-primary-500 text-white">+5%</Chip>
                </div>
              </div>
              <div className="flex overflow-auto w-full ">
                <div className="border border-gray-200 rounded-xl flex justify-between items-center p-4 w-full">
                  <div className="flex flex-col items-start text-sm">
                    <p>Income Portfolio</p>
                    <p className="font-semibold text-lg">€7,500</p>
                  </div>
                  <Chip className="bg-black text-white">-2%</Chip>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

export default FilteredClients;
