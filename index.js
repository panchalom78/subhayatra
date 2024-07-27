import { log } from "console";
import express from "express"
import path from "path";
import { fileURLToPath } from "url";


const app  = express();
app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.get("/",(req,res)=>{
    console.log(path.join(__dirname, 'public','home','home.html'));
    res.sendFile(path.join(__dirname, 'public','home','home.html'));
})

app.listen(3000);