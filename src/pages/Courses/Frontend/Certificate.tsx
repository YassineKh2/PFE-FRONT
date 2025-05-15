import { Suspense, useEffect, useState } from "react";
import { CertificateTemplate } from "@/components/Courses/Certificate/CertificateTemplate";
import { CertificateActions } from "@/components/Courses/Certificate/CertificateActions";
import "@/components/Courses/Certificate/Certificates.css";


// Mock getCertificate function (replace with real data fetching as needed)
async function getCertificate(id: string) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        userName: "John Doe",
        courseName: "Frontend Development",
        completionDate: "2025-05-15",
        instructorName: "Jane Smith",
        certificateNumber: "CERT-123456",
        logoUrl: "/Morgenfund_Logo.png",
      });
    }, 500);
  });
}

function CertificateContent({ id }: { id: string }) {
  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertificate(id).then((data) => {
      setCertificate(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Loading certificate...</div>;
  }
  if (!certificate) {
    return <div className="text-center py-12 text-red-500">Certificate not found.</div>;
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
  const id = "demo-id";
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto">
        <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
          <CertificateContent id={id} />
        </Suspense>
      </div>
    </main>
  );
}

export default Certificate;