import { featuresItemsData } from "@/data/feature-items";
import { FC } from "react";
import FeatureCard from "./feature-card";

interface Props {}

const Features: FC<Props> = (props): JSX.Element => {
  return (
    <section className="odd-section mt-9">
      <div className="container">
        <h2 className="section-title">
          <p>
            Reasons To Choose{" "}
            <span className="text-gradient font-bold">Stock E-Learning</span>
          </p>
          <p>As Your Study Destination</p>
        </h2>

        <div className="grid grid-cols-4 gap-6 max-[1100px]:grid-cols-3 max-[840px]:grid-cols-2 max-[590px]:grid-cols-1">
          {featuresItemsData.map((feature, index) => (
            <FeatureCard content={feature} key={index} order={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
