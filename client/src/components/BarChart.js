import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import Api from "../apis/Api";
import {
  storeData,
  setMonth,
  setMonthfor,
  setYear,
  setName,
  deleteItem,
  setBigData,
} from "../redux/actions/productActions";
import DataArr from "./DataArr";
import MultipleArr from "./MultipleArr";

const BarChart = () => {
  const dispatch = useDispatch();
  const id = useSelector((store) => store.allData.id);
  const isMonth = useSelector((store) => store.allData.isMonthMode);
  const month = useSelector((store) => store.allData.month);
  const year = useSelector((store) => store.allData.year);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const labelChanger = (name) => {
    if (isMonth === true) {
      return `${name} on ${monthNames[parseInt(month) - 1]}, ${year}`;
    } else {
      return `${name} on ${year}`;
    }
  };

  const bigData = useSelector((store) => store.bigData);

  const mapping = () => {
    let arr = [];
    let avgarr = [];
    if (bigData !== undefined || bigData.length !== 0) {
      bigData.forEach((row) => {
        const randomBetween = (min, max) =>
          min + Math.floor(Math.random() * (max - min + 1));
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        avgarr = [
          ...avgarr,
          { name: row.name, avg: MultipleArr(row.data.data, isMonth).avg },
        ];
        arr = [
          ...arr,
          {
            label: labelChanger(row.name, isMonth),
            data: MultipleArr(row.data.data, isMonth).data,
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5`,
            borderColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
            borderWidth: 1,
            fill: true,
            tension: 0.4,
          },
        ];
      });
      return { arr, avgarr };
    }
  };

  let { arr, avgarr } = mapping();

  const fetching = async (id) => {
    if (isMonth === true) {
      try {
        const response = await Api.get(`/donations/${id}/${year}/${month}`);
        dispatch(storeData(response.data));
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await Api.get(`/donations/${id}/${year}`);
        dispatch(storeData(response.data));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fetchingMultiple = async (id) => {
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

  const fetchName = async () => {
    try {
      const response = await Api.get(`/name/${id}`);
      dispatch(setName(response.data.name));
    } catch (err) {
      console.log(err);
    }
  };

  const monthyear = () => {
    if (isMonth === true) {
      return (
        <div>
          <input
            type="text"
            name="year"
            placeholder="year"
            onChange={(e) => dispatch(setYear(e.target.value))}
          />
          <input
            type="text"
            name="mouth"
            placeholder="month"
            onChange={(e) => dispatch(setMonthfor(e.target.value))}
          />
        </div>
      );
    } else {
      return (
        <div>
          <input
            type="text"
            name="year"
            placeholder="year"
            onChange={(e) => dispatch(setYear(e.target.value))}
          />
        </div>
      );
    }
  };

  useEffect(() => {
    fetching(id);
    fetchName();
    bigData.forEach((row) => {
      dispatch(deleteItem(row.id));
      fetchingMultiple(row.id).then((data) =>
        dispatch(setBigData(row.id, row.name, row.cause, data))
      );
    });
    // eslint-disable-next-line
  }, [id, isMonth, month, year]);

  const monthtoYear = () => {
    if (isMonth === true) {
      return "MONTH";
    } else {
      return "YEAR";
    }
  };

  const avgerageOf = avgarr.map((row, key) => {
    return (
      <div key={key}>
        <label>{row.name}</label>
        <span>&nbsp;&nbsp;&nbsp;{row.avg}&nbsp;Rs</span>
      </div>
    );
  });

  const totalAverages = () => {
    if (avgarr.length !== 0) {
      const total =
        avgarr.reduce((a, b) => {
          return a + b.avg;
        }, 0) / avgarr.length;

      return (
        <div>
          <label>Total Avg of batch</label>
          <span>&nbsp;&nbsp;&nbsp;{total}&nbsp;Rs</span>
        </div>
      );
    }
  };

  return (
    <dir>
      <dir>
        <button onClick={() => dispatch(setMonth())}>{monthtoYear()}</button>
      </dir>
      {monthyear()}
      <div>
        <Line
          data={{
            labels: DataArr().labels,
            datasets: arr,
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
          }}
        />
      </div>
      <div>
        {avgerageOf}
        {totalAverages()}
      </div>
    </dir>
  );
};

export default BarChart;
