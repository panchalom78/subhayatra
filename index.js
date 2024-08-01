import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg"
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})




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
        const r = await pool.query("select * from login");
        res.json(r.rows[0]);
    } catch(err){
        console.log(err);
    }
})

app.listen(3000);