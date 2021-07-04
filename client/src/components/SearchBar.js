import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { storeId } from "../redux/actions/productActions";

const SearchBar = () => {
  const [tid, setTid] = useState("70");
  const dispatch = useDispatch();
  return (
    <div>
      <input type="text" onChange={(e) => setTid(e.target.value)} />
      <button onClick={() => dispatch(storeId(tid))}>fetch</button>
    </div>
  );
};

export default SearchBar;
