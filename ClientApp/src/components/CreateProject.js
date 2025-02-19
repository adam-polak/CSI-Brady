import React from "react";
import "./CreateProject.css";

export default function CreateProject() {
  return (
    <div className="CreateProjectContainer">
      <div>New Project: </div>
      <form>
        <input name="query" />
        <button type="submit">+</button>
      </form>
    </div>
  );
}
