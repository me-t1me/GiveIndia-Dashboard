import { useSelector } from "react-redux";

const noofDays = (month, year) => {
  let lastDate = 0;
  if ([1, 3, 5, 7, 9, 11].indexOf(month) >= 0) {
    lastDate = 31;
  } else if (month === 2 && year % 4 === 0) {
    lastDate = 29;
  } else if (month === 2 && year % 4 !== 0) {
    lastDate = 28;
  } else {
    lastDate = 30;
  }
  return lastDate;
};

const DataArr = () => {
  const data = useSelector((state) => state.allData.data.data);

  if (data === undefined || data.length === 0) {
    return {
      labels: 0,
      data: 0,
      month: 0,
      year: 0,
    };
  } else {
    const month = parseInt(data[0].createdAt.substring(5, 7));
    const year = parseInt(data[0].createdAt.substring(0, 4));

    const dates = Array.from(
      { length: noofDays(month, year) },
      (_, i) => i + 1
    );
    let amounts = Array.from({ length: noofDays(month, year) }, (_, i) => 0);

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

    data.map((row) => {
      const date = parseInt(row.createdAt.substring(8, 10)) - 1;
      if (amounts[date] === 0) {
        amounts[date] = row.amount;
      } else {
        amounts[date] = amounts[date] + row.amount;
      }
      return null;
    });

    return {
      labels: dates,
      data: amounts,
      month: monthNames[month - 1],
      year: year,
    };
  }
  // const dataTobe = [
  //   { amount: 1270, createdAt: "2020-02-13 09:43:23.343" },
  //   { amount: 1270, createdAt: "2020-02-13T09:21:58.649Z" },
  //   { amount: 1270, createdAt: "2020-02-12T09:08:58.533Z" },
  //   { amount: 2540, createdAt: "2020-02-06T04:54:47.665Z" },
  // ];
};

export default DataArr;
