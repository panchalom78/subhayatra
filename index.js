import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg"
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config(); 



const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

const app  = express();
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.get("/",(req,res)=>{
    console.log(path.join(__dirname, 'public','home','index.html'));
    res.sendFile(path.join(__dirname, 'public','home','index.html'));
});



app.get("/login",(req,res)=>{
    res.render(path.join(__dirname,'views','login','signUp.ejs'),{check:false});
});

app.get("/signIn",(req,res)=>{
    res.render(path.join(__dirname,'views','login','signUp.ejs'),{check:true});
});

app.get("/data",async (req,res)=>{

    try{
        const r = await pool.query("select * from login");
        res.json(r.rows[0]);
    } catch(err){
        console.log(err);
    }
})

app.post("/signIn",async(req,res)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const pass = req.body.password;
        const response =await pool.query("insert into login (name,email,pass) values ($1,$2,$3) returning *",[name,email,pass])
        console.log(response.rows);
        res.redirect("/");
    }catch(err){
        console.log(err);
    }

})

app.listen(3000,(req,res)=>{
    console.log(`Listening to port 3000`);
    
});