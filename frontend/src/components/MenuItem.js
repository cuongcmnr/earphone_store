import React from "react";
import { loadScript } from "../helpers/loadScript";

function MenuItem({ image, name, link }) {
  const handleButtonClick = () => {
    loadScript(link); // Assuming loadScript is defined somewhere in your project
  };

  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1>{name}</h1>
      <button onClick={handleButtonClick}>BUY NOW</button>
    </div>
  );
}

export default MenuItem;
