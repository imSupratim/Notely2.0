import React from "react";
import { NavLink } from "react-router-dom";

const Navlink = (props) => {
  return (
    <NavLink
      to={props.dest}
      className="border border-white  flex items-center gap-2 bg-slate-600/20 px-3 py-1 rounded-3xl text-slate-700 hover:text-indigo-600 transition-colors font-medium"
    >
      {props.title}
    </NavLink>
  );
};

export default Navlink;
