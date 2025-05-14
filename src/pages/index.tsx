import AskedQuestions from "@/components/Index/AskedQuestions";
import Features from "@/components/Index/Features";
import GetStarted from "@/components/Index/GetStarted";
import InformationCard from "@/components/Index/InformationCard";
import DefaultLayout from "@/layouts/default";
export default function IndexPage() {
  

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <GetStarted />
        <InformationCard />
        <Features />
        <AskedQuestions />
      </section>
    </DefaultLayout>
  );
}
