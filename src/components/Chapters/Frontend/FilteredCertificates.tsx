import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Link } from "react-router-dom";

import { GetStaticImages } from "@/services/GetStaticFiles";
import { CertificateType } from "@/types/Courses";
import { formatDate } from "@/Helpers/Utils";

function FilteredCertificates({
  Certificates,
}: {
  Certificates: CertificateType[];
}) {
  const [SearchTerm, setSearchTerm] = useState<string>("");

  const filteredCertificates = Certificates.filter((Certificate) => {
    const term = SearchTerm.toLowerCase();

    return (
      Certificate.courseName.toLowerCase().includes(term) ||
      Certificate.CourseDescription.toLowerCase().includes(term) ||
      Certificate.certificateNumber.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCertificates.map((Certificate, index) => (
          <Card key={index} className="w-full">
            <Image
              alt="Card background"
              className="object-cover rounded-none w-full"
              height={300}
              src={GetStaticImages(Certificate.courseImage)}
            />
            <CardBody className="overflow-visible py-2">
              <div className="flex flex-col gap-2 items-start">
                <div className="py-2">
                  <p className="text-lg font-semibold">
                    {Certificate.courseName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {Certificate.CourseDescription}
                  </p>
                </div>

                <div className="flex items-end text-xs mb-2 text-gray-500">
                  <div className="flex items-end gap-1">
                    <Icon
                      height="16"
                      icon="uil:calender"
                      style={{ color: "6b7280" }}
                      width="16"
                    />
                    <p>Issued On:&nbsp;</p>
                  </div>
                  <p> {formatDate(Certificate.completionDate)}</p>
                </div>
                <div className="flex items-end text-xs mb-2 text-gray-500">
                  <div className="flex items-end gap-1">
                    <Icon
                      height="16"
                      icon="ix:id"
                      style={{ color: "6b7280" }}
                      width="16"
                    />
                    <p>Credential ID:&nbsp;</p>
                  </div>
                  <p> {Certificate.certificateNumber}</p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="bg-gray-100/90 flex justify-between gap-2 p-4">
              <Button
                as={Link}
                size="sm"
                to={"/courses/congrats/" + Certificate.courseId}
                variant="bordered"
              >
                View
              </Button>
              <Button
                as={Link}
                size="sm"
                startContent={
                  <Icon
                    className="text-default-700"
                    height="18"
                    icon="flowbite:download-outline"
                    width="18"
                  />
                }
                to={"/courses/Certificate/" + Certificate.certificateNumber}
              >
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FilteredCertificates;
