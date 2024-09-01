import FAQ from "@/components/home-page/faq";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { getAllFAQs } from "@/lib/fetch-data";
import { NextPage } from "next";
import { IFaq } from "../admin/faq/page";
import Heading from "@/components/heading";

// export const generateMetadata = () => {
//   return {
//     title: "Frequently Asked Questions &ndash",
//     alternates: {
//       canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/faq`,
//     },
//   };
// };

interface Props {}

const page: NextPage<Props> = async () => {
  const faqs = (await getAllFAQs()) as IFaq[];

  return (
    <>
      <Heading
        title="All FAQs"
      />
      <Header />
      <div className="container mt-8 mb-14">
        <FAQ faqs={faqs} />
      </div>
      <Footer />
    </>
  );
};

export default page;
