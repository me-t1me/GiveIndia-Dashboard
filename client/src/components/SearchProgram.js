import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Api from "../apis/Api";
import {
  storeAllProg,
  storeId,
  searchProgs,
  setBigData,
  searchProgsCause,
  searchProgsId,
} from "../redux/actions/productActions";
import "../App.css";

const SearchProgram = () => {
  const dispatch = useDispatch();
  const allProps = useSelector((state) => state.allData.searchProgs);
  const year = useSelector((state) => state.allData.year);
  const month = useSelector((state) => state.allData.month);
  const isMonth = useSelector((state) => state.allData.isMonthMode);
  const [finder, setFinder] = useState();
  const [mode, setMode] = useState(0);

  const fetching = async (id) => {
    if (isMonth === true) {
      try {
        const response = await Api.get(`/donations/${id}/${year}/${month}`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await Api.get(`/donations/${id}/${year}`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    }
  };

  // api calling and filtering
  const fetch = async () => {
    try {
      const response = await Api.get("/getPrograms");
      dispatch(storeAllProg(response.data.data));
      dispatch(searchProgs(""));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (finder === undefined) {
      fetch();
    } else {
      if (mode === 0) {
        dispatch(searchProgs(finder));
      } else if (mode === 1) {
        dispatch(searchProgsCause(finder));
      } else {
        dispatch(searchProgsId(finder));
      }
    }
    // eslint-disable-next-line
  }, [finder]);
  // end api calling and filtering

  // functioning
  const loop = allProps.map((row, key) => {
    return (
      <button
        key={key}
        onClick={() => {
          dispatch(storeId(row.id));
          fetching(row.id).then((data) => {
            dispatch(setBigData(row.id, row.name, row.cause, data));
          });
        }}
      >
        <div key={key}>
          {row.name},{row.id},{row.cause}
        </div>
      </button>
    );
  });

  const ifElse = () => {
    if (allProps === undefined || allProps.length === 0) {
      return null;
    } else {
      return <div>{loop}</div>;
    }
  };
  // end functioning

  const typeofMode = () => {
    if (mode === 0) {
      return "Searching by Name";
    } else if (mode === 1) {
      return "Searching by Cause";
    } else {
      return "Searching by ID";
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder={"search"}
          onChange={(e) => setFinder(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          if (mode === 0) {
            setMode(1);
          } else if (mode === 1) {
            setMode(2);
          } else {
            setMode(0);
          }
        }}
      >
        {typeofMode()}
      </button>
      <div>{ifElse()}</div>
    </div>
  );
};

export default SearchProgram;
