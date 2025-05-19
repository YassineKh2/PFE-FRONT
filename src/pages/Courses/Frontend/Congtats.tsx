import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
//@ts-ignore
import confetti from "canvas-confetti";
import { Progress } from "@heroui/progress";
import { Chip } from "@heroui/chip";
import { Card, CardBody } from "@heroui/card";
import { User } from "@heroui/user";
import { Image } from "@heroui/image";
import { Link, useParams } from "react-router-dom";

import { CertificateType, CourseType, ProgressType } from "@/types/Courses";
import { subtitle, title } from "@/components/primitives";
import { Navbar } from "@/components/Chapters/Frontend/Navbar";
import { CertificateTemplate } from "@/components/Courses/Certificate/CertificateTemplate";
import { GetCourse } from "@/services/Course";
import { useAuth } from "@/providers/AuthProvider";
import { AddCertificate, GetMyCertificates } from "@/services/Certificate";
import { formatDate } from "@/Helpers/Utils";
import { GetSingleProgress } from "@/services/User";

function CertificatePreview({ certificate }: { certificate: any }) {
  return (
    <div className="relative w-full aspect-[1.3/1] overflow-hidden rounded-lg shadow-lg">
      <div className="pointer-events-none select-none">
        <div style={{ height: "50%", overflow: "hidden" }}>
          <CertificateTemplate certificate={certificate} />
        </div>
        <div
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(243,244,246,0.85) 100%)",
          }}
        />
      </div>
    </div>
  );
}

function Congtats() {
  const [progress, setprogress] = useState<ProgressType>({} as ProgressType);

  const [Course, setCourse] = useState<CourseType>({} as CourseType);
  const [Certificate, setCertificate] = useState<CertificateType>(
    {} as CertificateType,
  );
  const { currentUser } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    if (!Course) return;

    GetSingleProgress(currentUser.uid, Course.id || "").then((res) => {
      setprogress(res.data);
    });
  }, [Course]);

  // Trigger confetti
  useEffect(() => {
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

  useEffect(() => {
    if (!id) return;
    GetCourse(id).then((response) => {
      setCourse(response.data);
      const date = new Date().toISOString();

      const generateCertificateNumber = () => {
        const randomNumber = Math.floor(100000 + Math.random() * 900000);

        return `CERT-${randomNumber}`;
      };

      const certificateNumber = generateCertificateNumber();

      const certif = {
        certificateNumber: certificateNumber,
        courseName: response.data.title,
        completionDate: date,
        instructorName: response.data.instructor,
        userName: currentUser.displayName,
        idUser: currentUser.uid,
        courseId: id,
        CourseDescription: response.data.description,
        courseImage: response.data.image,
      };

      GetMyCertificates(currentUser.uid).then((response) => {
        const certifs = response.data.data;
        const existingCert = certifs.filter(
          (cert: CertificateType) =>
            cert.certificateNumber !== certif.courseName,
        );

        if (existingCert.length === 0) {
          AddCertificate(certif);
        } else {
          setCertificate(existingCert[0]);
        }
      });
    });
  }, []);

  if (!Course || !Certificate) return <p>Loading...</p>;

  return (
    <>
      <Navbar
        CourseTitle={Course.title}
        inDashboard={true}
        progress={progress}
      />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-gray-100 rounded-full p-4">
              <Icon
                height="60"
                icon="material-symbols:trophy-outline-rounded"
                width="60"
              />
            </div>
            <p className={title({ size: "md", boldness: "bold" })}>
              Congratulations!
            </p>
            <p className={subtitle({ size: "sm" })}>
              You&apos;ve successfully completed
              <strong> {Course.title}</strong>
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
                <Button
                  as={Link}
                  color="primary"
                  to={"/courses/Certificate/" + Certificate.certificateNumber}
                >
                  Download Certificate
                </Button>
                <Button variant="bordered">Share Achievement</Button>
              </div>
            </div>
            <div className="">
              <CertificatePreview certificate={Certificate} />
            </div>
          </div>

          <div className="flex flex-col gap-4  w-[80%]">
            <p className=" font-bold text-2xl w-full">Your Achievements</p>
            <div className="flex flex-col lg:flex-row justify-between  gap-8">
              <div className="flex flex-col items-start border border-gray-300 rounded-xl w-full p-4">
                <p>Completion Date</p>
                <p className="text-xl font-bold">
                  {formatDate(Certificate.completionDate)}
                </p>
              </div>
              <div className="flex flex-col items-start border border-gray-300 rounded-xl w-full p-4">
                <p>Course Duration </p>
                <p className="text-2xl font-bold">
                  {Math.round(Number(Course.duration) / 60)} Houres
                </p>
              </div>
              <div className="flex flex-col items-start border border-gray-300 rounded-xl w-full p-4">
                <p>Lessons Completed</p>
                <p className="text-2xl font-bold">12/12</p>
              </div>
              <div className="flex flex-col items-start border border-gray-300 rounded-xl w-full p-4">
                <p>Quiz Score</p>
                <Progress
                  classNames={{
                    label: "text-xl font-bold",
                    indicator: "bg-black",
                  }}
                  label="92%"
                  value={97}
                />
              </div>
            </div>
            <div className="flex flex-col items-start border border-gray-300 rounded-xl w-full p-4 gap-4">
              <p className=" font-bold text-2xl w-full">Your Achievements</p>
              <div className="flex  gap-2">
                <Chip>Mutual Funds</Chip>
                <Chip>Mutual Funds</Chip>
                <Chip>Mutual Funds</Chip>
                <Chip>Mutual Funds</Chip>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4  max-w-6xl">
            <div className="flex flex-col lg:flex-row justify-between gap-2">
              <p className=" font-bold text-2xl w-full">
                Continue Your Learning Journey
              </p>
              <div className="flex justify-between gap-2">
                <Button as={Link} to={"/courses/all"} variant="bordered">
                  Browse All Courses
                </Button>
                <Button color="primary">Leave a Review</Button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-12 p-6">
              <div className=" flex gap-4 flex-col md:flex-row ">
                {[1, 2, 3].map((_, idx) => (
                  <Card key={idx} className="w-full">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-none w-full"
                      src="https://heroui.com/images/hero-card-complete.jpeg"
                    />
                    <CardBody className="overflow-visible py-2">
                      <div className="flex flex-col gap-5 items-start">
                        <div>
                          <p className="text-lg font-semibold">
                            Web Development Masterclass
                          </p>
                          <p className="text-sm text-gray-500">
                            Learn modern web development with HTML, CSS,
                            JavaScript, React, and Node.js
                          </p>
                        </div>
                        <User
                          avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                          }}
                          description="Product Designer"
                          name="Jane Doe"
                        />
                        <div className="flex gap-1">
                          <Icon
                            height="20"
                            icon="mdi-light:clock"
                            style={{ color: "6b7280" }}
                            width="20"
                          />
                          <p className="text-sm text-gray-500">4 Weeks</p>
                        </div>
                        <Button
                          className="w-full mb-2 bg-black text-white"
                          variant="shadow"
                        >
                          View Course
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
              <Button
                as={Link}
                className="px-6 py-5"
                to={"all"}
                variant="ghost"
              >
                View All Courses
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Congtats;
