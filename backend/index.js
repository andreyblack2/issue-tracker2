import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test"
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get("/", (req,rest) => {
    rest.json({message: "Hello this is the backend server!"})
})

app.get("/bug", (req,res) => {
    const q = "SELECT * FROM bug";
    db.query(q, (err, data) => {
        if(err) return res.json(err); 
        return res.json(data);
    })
})

app.post("/bug", (req,res) => {
    const q = "INSERT INTO bug (`title`, `desc`, `team`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.team
    ];

    db.query(q, [values], (err,data) => { 
        if (err) return res.json(err);
        return res.json("Bug has been added!");
        });
    });

app.listen(8800, () => {
    console.log("Backend server is running!")
})
