import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import PolicyAccordion from "@/components/policy-page/policy-accordion";
import { NextPage } from "next";

interface Props {}

const page: NextPage<Props> = () => {
  return (
    <>
      <Header />
      <div className="container mt-8 mb-14">
        <PolicyAccordion />
      </div>
      <Footer />
    </>
  );
};

export default page;
