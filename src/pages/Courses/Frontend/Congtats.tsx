import { Navbar } from "@/components/Chapters/Frontend/Navbar";
import { subtitle, title } from "@/components/primitives";
import { ProgressType } from "@/types/Courses";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
//@ts-ignore
import confetti from "canvas-confetti";
import { CertificateTemplate } from "@/components/Courses/Certificate/CertificateTemplate";


function CertificatePreview({ certificate }: { certificate: any }) {
  return (
    <div className="relative w-full aspect-[1.3/1] overflow-hidden rounded-lg shadow-lg">
      <div className="pointer-events-none select-none">
        <div style={{ height: "50%", overflow: "hidden" }}>
          <CertificateTemplate certificate={certificate} />
        </div>
        {/* Gradient overlay for grayed out effect */}
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{background: "linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(243,244,246,0.85) 100%)"}} />
      </div>
    </div>
  );
}

function Congtats() {
  const [progress, setprogress] = useState<ProgressType>({} as ProgressType);

  const certif = {
    id: "1",
    userName: "John Doe",
    courseName: "Frontend Development",
    completionDate: "2025-05-15",
    instructorName: "Jane Smith",
    certificateNumber: "CERT-123456",
    logoUrl: "/Morgenfund_Logo.png",
  };
  useEffect(() => {
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar inDashboard={true} progress={progress} />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-gray-100 rounded-full p-4">
              <Icon
                icon="material-symbols:trophy-outline-rounded"
                width="60"
                height="60"
              />
            </div>
            <p className={title({ size: "md", boldness: "bold" })}>
              Congratulations!
            </p>
            <p className={subtitle({ size: "sm" })}>
              You've successfully completed
              <strong> Introduction to Mutual Funds</strong>
            </p>
          </div>
          <div className="flex items-center gap-3 bg-gray-200 p-10 rounded-xl w-[80%]">
            <div className="flex flex-col gap-3 w-[50%]">
              <p className="text-2xl font-semibold">
                Your Certificate is Ready!
              </p>
              <p className="text-gray-600">
                Your hard work has paid off. Download your certificate and share
                your achievement with the world.
              </p>
              <div className="space-x-2 w-full">
                <Button color="primary">Download Certificate</Button>
                <Button variant="bordered">Share Achievement</Button>
              </div>
            </div>
            <div className="">
              <CertificatePreview certificate={certif} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Congtats;
