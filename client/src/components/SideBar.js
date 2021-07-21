import React, { useState } from "react";

import SearchProgram from "./SearchProgram";

const SideBar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const popUp = () => {
    if (isClicked) {
      return (
        <div>
          <SearchProgram />
        </div>
      );
    }
  };

  return (
    <div>
      <button onClick={() => setIsClicked(!isClicked)}>Side bar</button>
      {popUp()}
    </div>
  );
};

export default SideBar;
