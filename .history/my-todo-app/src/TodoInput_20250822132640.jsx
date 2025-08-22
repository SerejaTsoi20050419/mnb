import React, { useState } from "react";
import PropTypes from "prop-types";
import React from 'react';

export default function TodoInput({ onAdd, placeholder }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e.preventDefault();
    onAdd(value);
    setValue("");
  }

  return (
    <form onSubmit={submit} className="todo-input">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="New todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

TodoInput.propTypes = {
  onAdd: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

// defaultProps (works for function components)
TodoInput.defaultProps = {
  placeholder: "What needs to be done?",
};