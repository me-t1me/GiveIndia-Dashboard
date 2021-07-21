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
  // const data = useSelector((state) => state.allData.data.data);
  const datat = useSelector((state) => state.bigData[0]);
  const isMonth = useSelector((state) => state.allData.isMonthMode);
  let data = 0;
  if (datat === undefined || datat.length === 0) {
    return {
      labels: 0,
      data: 0,
      month: 0,
      year: 0,
    };
  } else {
    data = datat.data.data;
  }

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

  if (data === undefined || data.length === 0) {
    return {
      labels: 0,
      data: 0,
      month: 0,
      year: 0,
    };
  } else if (isMonth === true) {
    const month = parseInt(data[0].createdAt.substring(5, 7));
    const year = parseInt(data[0].createdAt.substring(0, 4));

    const dates = Array.from(
      { length: noofDays(month, year) },
      (_, i) => i + 1
    );
    let amounts = Array.from({ length: noofDays(month, year) }, (_, i) => 0);

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
    };
  } else if (isMonth === false) {
    let amounts = Array.from({ length: 12 }, (_, i) => 0);

    data.map((row) => {
      const date = parseInt(row.createdAt.substring(5, 7)) - 1;
      if (amounts[date] === 0) {
        amounts[date] = row.amount;
      } else {
        amounts[date] = amounts[date] + row.amount;
      }
      return null;
    });

    return {
      labels: monthNames,
      data: amounts,
    };
  }
};

export default DataArr;
