import React from 'react';
import { Link } from 'react-router-dom';
import "./Navigation.css";
import edammologo from "./res/edammologo.png";

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/"><img src={edammologo} alt="Edammo Logo"/></Link>
      <Link to="/">Home</Link>
      <Link to="/documentation">Documentation</Link>
      <Link to="/classification">Classification</Link>
      <Link to="/regression">Regression</Link>
      <Link to="/timeseries">Time Series</Link>
    </nav>
  )
}

export default Navigation
