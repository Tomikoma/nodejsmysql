//különböző modulok betöltése/példányosítása
const express = require('express');
const http = require('http');
const app = express();
const server = http.Server(app);;
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const sql = require('./db')


// middleware, http post kérések miatt kell 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// headerek beállítása,
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


// SERVERURL/api/demo érkező get kérés esetén ez fogja kiszolgálni (SERVERURL nálunk localhost:3000, production esetén meg majd a devopsunk fogja meg mondani hogy mi :D)
// app.post is lehet, meg amiket ilyenkor használni szoktunk (a többi projektben látsz erre szép számmal példát)
app.get('/api/demo', (req,res,next) => {
    sql.query('SELECT * FROM demo', (err,result) => {
        if(err) {
            console.log("error: ", err);
            res.status(500).json({
                err: "hiba történt"
            });
        }
        else{
            //ha minden rendben, visszaküldjük jsonban az kért adatot
            res.status(200).json({
                demoData: result
            });
        }
    });
    
    
});

//server start
server.listen(port, () => {
    console.log(`Started on port: ${port}`);
})