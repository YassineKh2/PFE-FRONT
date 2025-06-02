import { Accordion, AccordionItem } from "@heroui/accordion";

import { title } from "../primitives";

function AskedQuestions() {
  return (
    <div className="w-full my-10 space-y-4">
      <span className={title({ size: "sm" })}>Frequently asked questions</span>
      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Is the information up to date ?"
        >
          <p>Yes, it is updated daily at midnight GMT+1.</p>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="Do you take any fees ?"
        >
          <p>
            No, we don&apos;t take any fees. We are compeltely free to use 😊
          </p>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          title="Are you associated with a company ?"
        >
          <p>Yes, we are a part of MorgunFund Corporation.</p>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default AskedQuestions;
