import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../redux/actions/productActions";

const ShowList = () => {
  const dispatch = useDispatch();
  const bigData = useSelector((state) => state.bigData);

  const loop = bigData.map((row, key) => {
    return (
      <button onClick={() => dispatch(deleteItem(row.id))} key={key}>
        <div key={key}>
          {row.id},{row.name},{row.cause}
        </div>
      </button>
    );
  });

  return (
    <div>
      <h3>List of Selected Program</h3>
      {loop}
    </div>
  );
};

export default ShowList;
