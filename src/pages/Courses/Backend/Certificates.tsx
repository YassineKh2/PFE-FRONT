import { useEffect, useState } from "react";

import DashboardLayout from "@/layouts/dashboard";
import { subtitle, title } from "@/components/primitives";
import FilteredCertificates from "@/components/Chapters/Frontend/FilteredCertificates";
import { CertificateType } from "@/types/Courses";
import { GetMyCertificates } from "@/services/Certificate";
import { useAuth } from "@/providers/AuthProvider";

function Certificates() {
  const [Certificates, setCertificates] = useState<CertificateType[]>(
    [] as CertificateType[],
  );
  const { currentUser } = useAuth();

  useEffect(() => {
    GetMyCertificates(currentUser.uid).then((response) => {
      setCertificates(response.data.data);
    });
  }, []);

  return (
    <>
      <DashboardLayout>
        <h1 className={title({ size: "sm", boldness: "bold" })}>
          Certificates
        </h1>
        <div className={subtitle({ size: "xs" }) + " text-gray-400"}>
          View and download your earned certificates
        </div>
        <FilteredCertificates Certificates={Certificates} />
      </DashboardLayout>
    </>
  );
}

export default Certificates;
