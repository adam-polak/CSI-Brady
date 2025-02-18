import React from "react";
import "./CreateProject.css";

export default function CreateProject() {
  function search(formData) {
    const query = formData.get("query");
    alert(`You searched for '${query}'`);
  }
  return (
    // action tag may not function properly
    // https://stackoverflow.com/questions/78422092/why-does-invalid-value-for-prop-action-on-form-tag
    <div className="CreateProjectContainer">
      <div>New Project: </div>
      <form action={search}>
        <input name="query" />
        <button type="submit">+</button>
      </form>
    </div>
  );
}
