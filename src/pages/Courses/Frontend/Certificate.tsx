import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CertificateTemplate } from "@/components/Courses/Certificate/CertificateTemplate";
import { CertificateActions } from "@/components/Courses/Certificate/CertificateActions";
import "@/components/Courses/Certificate/Certificates.css";
import { GetCertificate } from "@/services/Certificate";
import { CertificateType } from "@/types/Courses";

function CertificateContent({ id }: { id: string }) {
  const [certificate, setCertificate] = useState<CertificateType>(
    {} as CertificateType,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCertificate(id).then((response) => {
      setCertificate(response.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Loading certificate...</div>;
  }

  if (!certificate) {
    return (
      <div className="text-center py-12 text-red-500">
        Certificate not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <CertificateTemplate certificate={certificate} />
      </div>
      <CertificateActions certificateId={id} />
    </div>
  );
}

function Certificate() {
  const { id } = useParams();

  if (!id) return <p>Loading ..</p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto">
        <Suspense
          fallback={<div className="text-center py-12">Loading...</div>}
        >
          <CertificateContent id={id} />
        </Suspense>
      </div>
    </main>
  );
}

export default Certificate;
