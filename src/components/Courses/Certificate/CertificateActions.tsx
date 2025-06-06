import { useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

interface CertificateActionsProps {
  certificateId: string;
}

export function CertificateActions({ certificateId }: CertificateActionsProps) {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Find the certificate element
      const certificateElement = document.querySelector(
        '[aria-label^="Certificate of completion"]',
      );

      if (!certificateElement) {
        throw new Error("Certificate element not found");
      }
      // Create a canvas from the certificate
      const canvas = await html2canvas(certificateElement as HTMLElement, {
        scale: 2, // higher quality
        logging: false,
        useCORS: true,
      });
      // Convert to image and download
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      link.href = image;
      link.download = `certificate-${certificateId}.png`;
      link.click();
      // Optionally show a toast here if you have a toast system
      // e.g. showToast('Certificate downloaded successfully!');
    } catch (error) {
      console.error("Error downloading certificate:", error);
      // Optionally show a toast for error
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Course Certificate",
          text: "Check out my course completion certificate!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Optionally show a toast for copied link
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
      <Button
        className="w-full sm:w-auto"
        variant="bordered"
        onClick={() => navigate(-1)}
      >
        <Icon className="mr-2 h-4 w-4" icon="mdi:arrow-left" />
        Back to Courses
      </Button>
      <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
        <Button
          className="flex-1 sm:flex-none"
          variant="bordered"
          onClick={handlePrint}
        >
          <Icon className="mr-2 h-4 w-4" icon="mdi:printer" />
          Print
        </Button>
        <Button
          className="flex-1 sm:flex-none"
          variant="bordered"
          onClick={handleShare}
        >
          <Icon className="mr-2 h-4 w-4" icon="mdi:share-variant" />
          Share
        </Button>
        <Button
          className="flex-1 sm:flex-none"
          disabled={isDownloading}
          onClick={handleDownload}
        >
          {isDownloading ? (
            <Icon className="mr-2 h-4 w-4 animate-spin" icon="mdi:loading" />
          ) : (
            <Icon className="mr-2 h-4 w-4" icon="mdi:download" />
          )}
          Download
        </Button>
      </div>
    </div>
  );
}

export default CertificateActions;
