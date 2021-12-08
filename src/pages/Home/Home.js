import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Home.css";

import documentation from "./res/documentation.svg";
import classification from "./res/classification.svg";
import regression from "./res/regression.svg";
import timeseries from "./res/timeseries.svg";

function Home() {
  const [state, setState] = useState({
    
  });

  return (
    <div className="home">
      <Link className="home_card" to="/documentation">
        <img className="home_documentationThumbnail" src={documentation} alt="" />
        <h2>Documentation</h2>
      </Link>
      <Link className="home_card" to="/classification">
        <img className="home_classificationThumbnail" src={classification} alt="" />
        <h2>Classification</h2>
      </Link>
      <Link className="home_card" to="/regression">
        <img className="home_regressionThumbnail" src={regression} alt="" />
        <h2>Regression</h2>
      </Link>
      <Link className="home_card" to="/timeseries">
        <img className="home_timeseriesThumbnail" src={timeseries} alt="" />
        <h2>Time Series</h2>
      </Link>
    </div>
  )
}

export default Home
