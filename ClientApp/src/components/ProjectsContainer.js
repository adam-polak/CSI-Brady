import React from "react";
import ProjectEntry from "./ProjectEntry";

export default function ProjectsContainer() {
  const entries = ["Quad", "Husco", "Brady"];
  const handleSelectItem = (entry) => console.log(entry);

  return (
    <div>
      {entries.map((entry) => (
        <ProjectEntry key={entry} onSelectItem={handleSelectItem}>
          {entry}
        </ProjectEntry> // TODO:k key={project.id}
      ))}
    </div>
  );
}
