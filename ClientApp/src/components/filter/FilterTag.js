import React from "react";
import { Badge, Button } from "reactstrap";

export default function FilterTag({ index, onSelectItem, tag }) {
  function handleClick() {
    onSelectItem(index);
  }

  return (
    <Button className="mt-2 mb-2 p-0" onClick={handleClick}>
      <Badge style={{ display: "flex", alignItems: "center", gap: ".5em" }}>
        <div>{tag}</div>
        <div style={{ paddingBottom: "2.5px" }}>
          <span
            style={{
              marginLeft: "8px",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "black",
            }}
          >
            ×
          </span>
        </div>
      </Badge>
    </Button>
  );
}
