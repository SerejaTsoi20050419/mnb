import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Task({ text, createdAt }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - createdAt) / 1000);
      if (seconds < 60) {
        setTimeAgo(`создано ${seconds} секунд назад`);
      } else {
        const minutes = Math.floor(seconds / 60);
        setTimeAgo(`создано ${minutes} минут назад`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return (
    <li>
      {text} — <small>{timeAgo}</small>
    </li>
  );
}

Task.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.number,
};

Task.defaultProps = {
  text: "Новая задача",
  createdAt: Date.now(),
};

export default Task;