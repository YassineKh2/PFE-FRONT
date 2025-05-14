import TrendingList from "@/components/MutualFunds/TrendingList";
import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function TrendingFunds() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block text-center justify-center">
          <span
            className={title({
              size: "lg",
            })}
          >
            Trending
          </span>
          <span className={title({ color: "pink", size: "lg" })}>
            {" "}
            Mutual Funds
          </span>
          <p className={subtitle()}>
            Discover the most popular mutual funds that investors are exploring
            right now s.
          </p>
        </div>
        <div className="flex justify-between w-full gap-6">
          <TrendingList />
        </div>
      </section>
    </DefaultLayout>
  );
}
