import React from "react";
import "./ProjectEntry.css";

export default function ProjectEntry({ children, onSelectItem }) {
  return (
    <div className="projectEntry" onClick={onSelectItem}>
      {children}
    </div>
  );
}
