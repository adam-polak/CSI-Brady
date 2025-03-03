import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
} from "reactstrap";

export default function Image({ image }) {
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <Card className="p-3">
      <div className="d-flex gap-1 mb-1" style={{ fontStyle: "italic", fontSize: "20px" }}>
        <div>Taken By:</div>
        <div>{`${image.FirstName} ${image.LastName}`},</div>
        <div>{image.Date}</div>
      </div>
      <img
        src={image.ImageSrc}
        alt={`Taken by ${image.FirstName} ${image.LastName}`}
        style={{
          width: "100%",
          maxWidth: "100%",
          maxHeight: "300px",
          objectFit: "cover",
          objectPosition: "center",
          height: "auto",
        }}
      />
      <Accordion flush open={open} toggle={toggle} className="mt-2">
        {image.Violations.map((violation, i) => {
          return (
            <AccordionItem>
              <AccordionHeader targetId={"" + i}>
                {violation.Name}
              </AccordionHeader>
              <AccordionBody accordionId={"" + i}>
                  <p>{violation.Summary} <span />
                  <a target="_blank" rel="noreferrer" href={violation.Link}>
                    More Information
                  </a>
                  </p>
              </AccordionBody>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
}
