"use client";

import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { formatDate } from "@/Helpers/Utils";
import { Image } from "@heroui/image";
import { Icon } from "@iconify/react/dist/iconify.js";

export type CertificateData = {
  id: string;
  userName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
  certificateNumber: string;
  logoUrl?: string;
};

interface CertificateProps {
  certificate: CertificateData;
}

export function CertificateTemplate({ certificate }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={certificateRef}
      className="relative bg-white p-8 md:p-12 border-8 border-gray-100 rounded-md w-full aspect-[1.4/1] flex flex-col items-center justify-between text-center"
      aria-label={`Certificate of completion for ${certificate.courseName}`}
    >
      {/* Certificate Header */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-[#E7649C] to-[#fc3c61]" />

      <div className="relative z-10 flex flex-col items-center pt-8">
        {certificate.logoUrl ? (
          <Image
            src={certificate.logoUrl || "/placeholder.svg"}
            alt="Course logo"
            width={260}
            className="mb-4 bg-white p-2"
          />
        ) : (
          <div className="mb-4 rounded-full bg-blue-100 p-4">
            <Icon
              icon="lucide:award"
              width="24"
              height="24"
              style={{ color: "#2563eb" }}
            />
          </div>
        )}

        <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-1">
          Certificate of Completion
        </h1>
        <div className="w-24 h-1 bg-gradient-to-l from-[#E7649C] to-[#fc3c61] my-4" />
      </div>

      {/* Certificate Body */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
        <p className="text-gray-600 mb-4">This certifies that</p>
        <h2 className="text-2xl md:text-4xl  font-bold  text-[#fc3c61] mb-4 font-serif">
          {certificate.userName}
        </h2> 
        <p className="text-gray-600 mb-4">has successfully completed</p>
        <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
          {certificate.courseName}
        </h3>
        <p className="text-gray-600">
          on{" "}
          <span className="font-medium">
            {formatDate(certificate.completionDate)}
          </span>
        </p>
      </div>

      {/* Certificate Footer */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-gray-100">
        <div className="text-left mb-4 md:mb-0">
          <p className="text-sm text-gray-500">Instructor</p>
          <p className="font-medium">{certificate.instructorName}</p>
        </div>

        <div className="flex items-center gap-1">
          <Icon
            icon="lucide:circle-check-big"
            width="24"
            height="24"
            style={{ color: "#22c55e" }}
          />
          <p className="text-sm text-gray-500">
            Certificate ID: {certificate.certificateNumber}
          </p>
        </div>

        <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-center">
          <QRCodeSVG
            value={`${typeof window !== "undefined" ? window.location.origin : ""}/verify/${certificate.id}`}
            size={80}
            level="H"
            includeMargin={true}
          />
          <p className="text-xs text-gray-500 mt-1">Scan to verify</p>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-50 rounded-tl-full opacity-30" />
      <div className="absolute top-16 left-0 w-24 h-24 bg-purple-50 rounded-br-full opacity-30" />
    </div>
  );
}
