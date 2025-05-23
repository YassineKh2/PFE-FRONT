import RecommendFundList from "@/components/MutualFunds/RecommendFundList";
import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

function RecommendedFunds() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center py-8 md:py-10">
        <div className="inline-block text-center justify-center">
          <span
            className={title({
              size: "lg",boldness:'bold'
            })}
          >
            Your
          </span>
          <span className={title({ color: "pink", size: "lg",boldness:'bold' })}>
            {" "}
            Recommended Funds
          </span>
          <p className={subtitle()}>
            Here you can find funds that we believe are best suited for your investment goals and preferences.
          </p>
        </div>
        <div className="flex justify-between w-full gap-6">
          <RecommendFundList />
        </div>
      </section>
    </DefaultLayout>
  );
}

export default RecommendedFunds;
