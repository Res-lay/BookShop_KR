import {NavLink} from "react-router-dom";
import React from "react";

export default function MyNavLink({link, text, color}){
    return(
        <NavLink
            to={link}
            className={`w-full text-${color}`}
            href="#"
            size="lg"
        >
            {text}
        </NavLink>
    );
}