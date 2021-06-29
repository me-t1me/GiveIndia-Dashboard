require('dotenv').config()
const express = require('express');
const db = require('./db');
const app = express();


//  middleware (to get req.params object)
app.use(express.json());




app.get("/api/getPrograms", async (req, res) => {
    
    try {
        const results = await db.query("select * from programs");
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
            programs: results.rows
        }
        
    })
    } catch (err) {
        console.log(err);
    }
})

app.get("/api/getPrograms/:id", async (req, res) => {
    console.log(req.params.id);
    
    try {
        const results = await db.query("select * from programs where id = $1", [req.params.id]);
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
            id: results.rows[0].id,
            name: results.rows[0].name,
            price: results.rows[0].price,
            cause: results.rows[0].cause,
        }
        
    })
    } catch (err) {
        console.log(err);
    }
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up ${port}`);
});

