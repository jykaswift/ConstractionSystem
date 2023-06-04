import React from "react";
import Welcome from "../Components/Welcome";
import Functions from "../Components/Functions";
import About from "../Components/About";
import Advantages from "../Components/Advantages";
import Guide from "../Components/Guide";
import Normastroi from "../Components/Normastroi";

function Main() {

  return (
    <div className="content">
      <Welcome />
      <Functions />
      <About />
      <Advantages />
      <Guide />
      <Normastroi />
    </div>
  );
}

export default Main;
