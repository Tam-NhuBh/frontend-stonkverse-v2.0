"use client";

import * as React from "react";
import { IFaq } from "@/app/admin/faq/page";
import {
  AccordionDetails,
  AccordionSummary,
  AccordionWrapper,
} from "../accordion-materials";
import ChatBotClient from "../layout/chatbot-client";

interface Props {
  faqs: IFaq[];
}

export default function FAQ({ faqs }: Props) {
  const [expanded, setExpanded] = React.useState<string | false>("");
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    // <section className="even-section mt-9">

      <div className="container ">
        <h2 className="section-title">
          <p>
            Learning With Stock E-Leaning:
            <span className="text-gradient font-bold">
              &nbsp;Frequently Asked Questions
            </span>
          </p>
        </h2>
        <div className="chatbot-container">
<ChatBotClient />
</div>
        <div className="shadow-md">
          {faqs?.map((faq, index) => (
            <AccordionWrapper
              key={faq._id.toString()}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                aria-controls={`panel${{ index }}d-content`}
                id={`panel${{ index }}d-header`}
              >
                <div className="relative w-full">
                  <p>{faq.question}</p>
                </div>
              </AccordionSummary>

              <AccordionDetails>
                <p>{faq.answer}</p>
              </AccordionDetails>

            </AccordionWrapper>


          ))}
        </div>
      </div>
    // </section>
  );
}
