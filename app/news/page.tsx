import Heading from "@/components/heading";
import NewsList from "@/components/single-news-page/news-list";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { NextPage } from "next";
import NewsAdvertisement from "@/components/single-news-page/news-advertisement";

interface Props { }

const page: NextPage<Props> = async () => {

    return (
        <>
            <Heading title="All News" />
            <Header />
            <div className="container mt-8 mb-14 ">
                {/* <div className="w-full max-w-6xl"> */}
                    <NewsList />
                   {/* </div> */}
            </div>
            <Footer />
        </>
    );
    
}
export default page;
