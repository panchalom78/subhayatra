import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg"
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port : process.env.PGPORT,
    database : process.env.PGDATABASE
})

db.connect();

const app  = express();
app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.get("/",(req,res)=>{
    console.log(path.join(__dirname, 'public','home','index.html'));
    res.sendFile(path.join(__dirname, 'public','home','index.html'));
});

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','login','signUp.html'));
})

app.get("/data",async (req,res)=>{

    try{
        const r = await db.query("select * from login");
        console.log(r.rows);
    } catch(err){
        console.log(err);
    }
})

app.listen(3000);