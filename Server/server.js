require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();
const cors = require("cors");

// creating function for year and month related query
const getTimeStamp = (year, month) => {
  let lastDate = 0;
  if ([01, 03, 05, 07, 09, 11].indexOf(parseInt(month)) >= 0) {
    lastDate = 31;
  } else if (month == 02 && year % 4 == 0) {
    lastDate = 29;
  } else if (month == 02 && year % 4 != 0) {
    lastDate = 28;
  } else {
    lastDate = 30;
  }
  return [
    `${year}-${month}-${lastDate} 00:00:00`,
    `${year}-${month}-01 00:00:00`,
  ];
};

const getTimeStampYear = (year) => {
  return [`${year}-12-31 00:00:00`, `${year}-01-01 00:00:00`];
};

//  middleware (to get req.params object)
app.use(cors());
app.use(express.json());

app.get("/api/name/:id", async (req, res) => {
  try {
    const results = await db.query(
      'select "name" from programs where id = $1',
      [req.params.id]
    );
    res.status(200).json({
      name: results.rows[0].name,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/donations/:id/:year/:month", async (req, res) => {
  try {
    const results = await db.query(
      'select amount, "createdAt"  from donations where "programId" = $1 and "createdAt" < $2 and "createdAt" >= $3 order by "createdAt" desc ',
      [req.params.id, ...getTimeStamp(req.params.year, req.params.month)]
    );
    res.status(200).json({
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/donations/:id/:year", async (req, res) => {
  try {
    const results = await db.query(
      'select "programId", amount , "createdAt" from donations where "programId" = $1 and "createdAt" < $2 and "createdAt" >= $3 order by "createdAt" desc ',
      [req.params.id, ...getTimeStampYear(req.params.year)]
    );
    res.status(200).json({
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/getPrograms", async (req, res) => {
  try {
    const results = await db.query("select id, name, cause from programs");
    res.status(200).json({
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/getPrograms/:id", async (req, res) => {
  try {
    const results = await db.query("select * from programs where id = $1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        id: results.rows[0].id,
        name: results.rows[0].name,
        price: results.rows[0].price,
        cause: results.rows[0].cause,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is up ${port}`);
});
