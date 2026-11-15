
import React from "react";

const Greetings = ({ name }) => {
  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  return (
    <span className="text-slate-600 text-sm font-bold">
      {getGreeting()},{" "}
      <span className="font-semibold text-indigo-600">
        {name}
      </span>
    </span>
  );
};

export default Greetings;
