import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { User } from "@heroui/user";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import { subtitle, title } from "@/components/primitives";

function HeroSection() {
  return (
    <div className="flex flex-col-reverse xl:flex-row gap-4 justify-between">
      <div className="flex flex-col gap-4">
        <p className={title({ size: "lg", boldness: "bold" })}>
          Unlock Your{" "}
          <text
            className={title({
              size: "xl",
              boldness: "bold",
              color: "pink",
            })}
          >
            Potential
          </text>{" "}
          With Expert-Led Online Courses
        </p>
        <p className={subtitle({}) + " text-gray-500"}>
          Discover a world of knowledge with our curated collection of courses
          designed to help you master new skills, advance your career, and
          achieve your goals.
        </p>
        <div className="flex gap-2">
          <Button
            as={Link}
            className="w-full max-w-xs "
            color="primary"
            to={"all"}
          >
            Explore Courses{" "}
          </Button>
          <Button variant="bordered">Learn More</Button>
        </div>
      </div>
      <div className="w-full">
        <img
          alt="hero"
          className="rounded-xl object-cover "
          src="https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png"
        />
      </div>
    </div>
  );
}

function TrustedSection() {
  return (
    <div className="flex justify-around items-end gap-2">
      <div className="relative w-screen max-w-sm">
        <hr className="border-2 w-full" />
        <div className="absolute top-0 left-0 w-1/12 h-full bg-gradient-to-r from-white to-transparent" />
      </div>
      <p className="w-max text-sm text-default-600 flex flex-col items-center relative top-2">
        <Icon
          className="size-16 text-green-800"
          icon="game-icons:laurel-crown"
        />
        Trusted by over 10M users
      </p>
      <div className="relative w-screen max-w-sm">
        <hr className="border-2 w-full" />
        <div className="absolute top-0 right-0 w-1/12 h-full bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  );
}

export function FeaturedCoursesSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-12 p-6">
      <div className="w-full flex flex-col gap-2 items-center">
        <p className={title({ size: "md", boldness: "bold" })}>
          Featured Courses
        </p>
        <p className="text-sm lg:text-xl text-gray-500 ">
          Browse our most popular courses and start learning today
        </p>
      </div>
      <div className="w-full flex gap-4 flex-col md:flex-row ">
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
                    Learn modern web development with HTML, CSS, JavaScript,
                    React, and Node.js
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
      <Button as={Link} className="px-6 py-5" to={"all"} variant="ghost">
        View All Courses
      </Button>
    </div>
  );
}

function WhyChooseUsSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-12 p-6">
      <div className="w-full flex flex-col gap-2 items-center">
        <p className={title({ size: "md", boldness: "bold" })}>
          Why Choose Us?
        </p>
        <p className="text-sm lg:text-xl text-gray-500 ">
          Discover the benefits of learning with our platform
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Each benefit card */}
        <div className="w-full flex flex-col items-center gap-2">
          <div className="bg-gray-100 p-4 rounded-full">
            <Icon
              height="24"
              icon="tabler:users"
              style={{ color: "black" }}
              width="24"
            />
          </div>
          <p className="font-bold text-lg">Flexible Learning</p>
          <p className=" text-gray-500">
            Study at your own pace with lifetime access to course materials
          </p>
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <div className="bg-gray-100 p-4 rounded-full">
            <Icon
              height="24"
              icon="tabler:certificate"
              style={{ color: "black" }}
              width="24"
            />
          </div>
          <p className="font-bold text-lg">Recognized Certificates</p>
          <p className=" text-gray-500">
            Earn certificates that enhance your resume and professional profile
          </p>
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <div className="bg-gray-100 p-4 rounded-full">
            <Icon
              height="24"
              icon="ix:project"
              style={{ color: "black" }}
              width="24"
            />
          </div>
          <p className="font-bold text-lg">Practical Projects</p>
          <p className=" text-gray-500">
            Apply your knowledge with hands-on projects that build your
            portfolio
          </p>
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <div className="bg-gray-100 p-4 rounded-full">
            <Icon
              height="24"
              icon="tabler:book"
              style={{ color: "black" }}
              width="24"
            />
          </div>
          <p className="font-bold text-lg">Portolio Support</p>
          <p className=" text-gray-500">
            Get guidance on Portolio paths and opportunities in your MFs and
            Investements
          </p>
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <div className="bg-gray-100 p-4 rounded-full">
            <Icon
              height="26"
              icon="iconoir:community"
              style={{ color: "black" }}
              width="26"
            />
          </div>
          <p className="font-bold text-lg">Community Access</p>
          <p className=" text-gray-500">
            Connect with fellow learners and instructors in our active community
          </p>
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <div className="bg-gray-100 p-4 rounded-full">
            <Icon
              height="24"
              icon="hugeicons:teacher"
              style={{ color: "black" }}
              width="24"
            />
          </div>
          <p className="font-bold text-lg">Expert Instructors</p>
          <p className=" text-gray-500">
            Learn from industry professionals with years of real-world
            experience
          </p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-12 p-6">
      <div className="w-full flex flex-col gap-2 items-center">
        <p className={title({ size: "md", boldness: "bold" })}>
          What Our Students Say
        </p>
        <p className="text-sm lg:text-xl text-gray-500 ">
          Hear from our community of learners about their experience
        </p>
      </div>
      <div className="w-full flex gap-4 flex-col md:flex-row ">
        {[1, 2, 3].map((_, idx) => (
          <Card key={idx} className="w-full p-4">
            <CardHeader>
              <User
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
                description="Product Designer"
                name="Jane Doe"
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-sm text-gray-500">
                {idx === 1
                  ? "The instructors break down complex concepts in a way that's easy to understand. The hands-on projects were invaluable for my learning."
                  : "This course completely transformed my career. I went from knowing nothing about coding to landing a job as a junior developer in just 6 months!"}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CallToActionSection() {
  return (
    <div className="rounded-full h-72 bg-black/90 gap-4 flex flex-col justify-center items-center">
      <p className="text-white text-5xl font-bold">Ready to Start Learning?</p>
      <p className="text-white text-xl font-semibold">
        Join thousands of students already learning on our platform
      </p>
      <Button as={Link} className="bg-white" size="lg" to={"all"}>
        Get Started Today
      </Button>
    </div>
  );
}

function Courses() {
  return (
    <DefaultLayout className="bg-gray-50">
      <section className=" flex flex-col items-center justify-center gap-44 py-8 md:py-10">
        <HeroSection />
        <TrustedSection />
        <FeaturedCoursesSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
      </section>
      <CallToActionSection />
    </DefaultLayout>
  );
}

export default Courses;
