import React from "react";

export default function ProjectEntry({ children, onSelectItem }) {
  const style = {
    borderStyle: "solid",
    textAlign: "center",
    margin: "10px",
  };

  return (
    <div className="projectEntry" onClick={onSelectItem} style={style}>
      {children}
    </div>
  );
}
