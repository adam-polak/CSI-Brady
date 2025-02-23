import React from "react";
import { Badge, Button } from "reactstrap";

export default function FilterTag({ index, onSelectItem, tag }) {
  function handleClick() {
    onSelectItem(index);
  }

  return (
    <Button className="mt-2 mb-2" onClick={handleClick}>
      <Badge>{tag}</Badge>
    </Button>
  );
}
