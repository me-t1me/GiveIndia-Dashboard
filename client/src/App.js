import React from "react";

import SideBar from "./components/SideBar";
import BarChart from "./components/BarChart";
import ShowList from "./components/ShowList";
import "./App.css";

const App = () => {
  return (
    <dir className="App">
      <SideBar />
      <BarChart />
      <ShowList />
    </dir>
  );
};

export default App;
