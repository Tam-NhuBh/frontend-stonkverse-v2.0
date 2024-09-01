import {
  footerCol1,
  // footerCol2,
  // footerCol3,
  footerCol4,
} from "@/data/footer-items";
import { FC} from "react";
import Link from "next/link";
import MailForm from "./mail-form";
import NextImage from "../next-image";
import GetIndexStock from "../get-index-stock";

interface Props { }

const Footer: FC<Props> = (): JSX.Element => {
  return (
    <footer className="bg-[#fbfafa] dark:bg-opacity-50 dark-bg border-t dark:border-slate-600">
      <div className="container flex flex-wrap gap-1 py-10 max-[1017px]:gap-3">

        <div className="w-1/3 pr-3 max-[1017px]:w-[50%] max-[717px]:w-full">
          <p className="footer-title">Stock E-Learning Online Courses Platform</p>
          <ul>
            {footerCol1.map((item, index) => (
              <li className="footer-item hover:font-normal" key={index}>
                <span className="font-bold text-[#7e7e7e]">
                  {item.title} :{" "}
                </span>
                {item.content}
              </li>
            ))}
          </ul>

          <p className="footer-title mt-12 max-[717px]:mt-6">Contact Us</p>
          <ul>
            {footerCol4.map((item, index) => (
              <li key={index} className="footer-item">
                <a href={item.link} className="flex items-center gap-1">
                  {item.icon({ size: 14 })} {item.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex item-center gap-2 my-3">
            <Link href="https://www.facebook.com/dhspkt.hcmute/" target="_blank" rel="noopener noreferrer">
              <div className="footer-icon">
                <NextImage
                  src="/assets/images/home-page/facebook.webp"
                  alt="Facebook"
                />
              </div>
            </Link>

            <Link href="https://www.youtube.com/@UTETVChannel" target="_blank" rel="noopener noreferrer">
              <div className="footer-icon">
                <NextImage
                  src="/assets/images/home-page/youtube.webp"
                  alt="Youtube"
                />
              </div>
            </Link>

            <Link href="https://www.instagram.com/dhspkt.hcmute/p/C1O8k7TpgRf/?img_index=1" target="_blank" rel="noopener noreferrer">
              <div className="footer-icon">
                <NextImage
                  src="/assets/images/home-page/instagram.webp"
                  alt="Instagram"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* <div className="w-[18%] px-3 max-[717px]:w-[45%] max-[717px]:px-0">
          <p className="footer-title">Categories</p>
          <ul>
            {footerCol2.map((car, index) => (
              <li key={index} className="footer-item">
                <Link href={car.link}>{car.title}</Link>
              </li>
            ))}
          </ul>
        </div> */}


        <div className="w-[20%] px-3 max-[1017px]:w-[25%] max-[717px]:w-[45%] max-[717px]:px-0">
          {/* <p className="footer-title">LEGAL</p>
          <ul>
            {footerCol3.map((item, index) => (
              <li key={index} className="footer-item">
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul> */}
        </div>

        <div className="flex-1">
          <p className="footer-title">Support</p>
          <MailForm />
        </div>
 
      </div>
      <div className="flex-1">
          <GetIndexStock/>
          </div>

    </footer>
  );
};

export default Footer;
