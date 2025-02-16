import React from "react";

export default function CreateProject() {
  function search(formData) {
    const query = formData.get("query");
    alert(`You searched for '${query}'`);
  }
  return (
    // action tag may not function properly
    // https://stackoverflow.com/questions/78422092/why-does-invalid-value-for-prop-action-on-form-tag
    <form action={search}>
      <input name="query" />
      <button type="submit">Create</button>
    </form>
  );
}
