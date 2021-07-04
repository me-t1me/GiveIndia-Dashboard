import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

import Api from "../apis/Api";
import { storeData } from "../redux/actions/productActions";
import DataArr from "./DataArr";

const BarChart = () => {
  const dispatch = useDispatch();
  const id = useSelector((store) => store.allData.id);

  const fetching = async () => {
    try {
      const response = await Api.get(`/donations/${id}/2020/02`);
      dispatch(storeData(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line
  }, [id]);

  return (
    <dir>
      <div>
        <Line
          data={{
            labels: DataArr().labels,
            datasets: [
              {
                label: `Amount Received for Sponsor monthly groceries for the elderly in month of ${
                  DataArr().month
                }, ${DataArr().year}`,
                data: DataArr().data,
                backgroundColor: "rgba(255, 99, 132, 0.5",
                borderColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 1,
                fill: true,
                tension: 0.4,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
          }}
        />
      </div>
    </dir>
  );
};

export default BarChart;
