"use client";

import * as React from "react";
import {
  AccordionDetails,
  AccordionSummary,
  AccordionWrapper,
} from "../accordion-materials";
import { policyItemsData } from "@/data/policy-items";

export default function PolicyAccordion() {
  const [expanded, setExpanded] = React.useState<string | false>("");
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <section className="my-14">
      <div className="container ">
        <h2 className="section-title">
          <p>
            <span className="text-gradient font-bold">
              {" "}
              Frequently Asked Questions
            </span>
          </p>
        </h2>
        <div className="shadow-md">
          {policyItemsData.map((policy, index) => (
            <AccordionWrapper
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                aria-controls={`panel${{ index }}d-content`}
                id={`panel${{ index }}d-header`}
              >
                <div className="relative w-full">
                  <p>{policy.question}</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <p>{policy.answer}</p>
              </AccordionDetails>
            </AccordionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
