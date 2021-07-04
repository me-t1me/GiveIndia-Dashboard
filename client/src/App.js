import React from "react";

import BarChart from "./components/BarChart";
// import SearchBar from "./components/SearchBar";
import SearchProgram from "./components/SearchProgram";
import "./App.css";

const App = () => {
  return (
    <dir>
      <div>
        <SearchProgram />
      </div>
      {/* <div>
        <SearchBar />
      </div> */}
      <div>
        <BarChart />
      </div>
    </dir>
  );
};

export default App;
