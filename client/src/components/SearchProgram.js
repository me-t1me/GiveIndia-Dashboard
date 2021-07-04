import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Api from "../apis/Api";
import {
  storeAllProg,
  storeId,
  searchProgs,
} from "../redux/actions/productActions";

const SearchProgram = () => {
  const dispatch = useDispatch();
  const allProps = useSelector((state) => state.allData.progs);
  const [finder, setFinder] = useState();

  const fetch = async () => {
    try {
      const response = await Api.get("/getPrograms");
      dispatch(storeAllProg(response.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const loop = allProps.map((row, key) => {
    return (
      <button key={key} onClick={() => dispatch(storeId(row.id))}>
        <div key={key}>
          {row.name},{row.id}
        </div>
      </button>
    );
  });

  const ifelse = () => {
    if (allProps === undefined || allProps.length === 0) {
      return null;
    } else {
      return <div>{loop}</div>;
    }
  };

  useEffect(() => {
    if (finder === undefined || finder === "") {
      fetch();
    } else {
      dispatch(searchProgs(finder));
    }
    // eslint-disable-next-line
  }, [finder]);

  return (
    <div>
      <div>
        <input type="text" onChange={(e) => setFinder(e.target.value)} />
      </div>
      {ifelse()}
    </div>
  );
};

export default SearchProgram;
