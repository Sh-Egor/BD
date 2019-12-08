const express = require('express');
const app = express();
var bParser = require('body-parser');
const server = require('http').createServer(app);
const mysql = require('mysql2');
const connect = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:""
});
// connect.query("SHOW DATABASES;",(err,res) =>{
//     console.log(res);
// });
connect.query("USE monitordb");
server.listen(3000);

app.use(express.static('./public'));
app.use(bParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

var date1;
var date2;
var dataSelected1;
var dataSelected2;
var Rlogin = "egor";
var Rpsw = "1234";
var name;

app.post('/staffreq', (req,res) =>{
    connect.query(`
    SELECT ship.name FROM ship;`, (error,result) =>{
        res.json(result);
    });
});

app.post('/shipsreq', (req,res) =>{
    connect.query(`
    SELECT companies.name FROM companies;`, (error,result) =>{
        res.json(result);
    });
});

app.post('/loginredir', (req,res) =>{
    if(req.body.log != Rlogin || req.body.psw != Rpsw){
        res.send("-1");
    }else{
        res.send("1");
    }
});

app.get('/login', (req,res) =>{
    res.sendFile(__dirname + "/inserttable.html");
});

app.get('/getBD', (req,res) =>{
    connect.query(`
    SHOW TABLES;`, (error,result) =>{
        res.json(result);
    });
});

app.post('/monitorredir', (req,res) => {
    date1 = req.body.date1;
    date2 = req.body.date2;
});

app.get('/monitorop', (req, res) => {
    res.sendFile(__dirname + "/monitor.html");
});

app.post('/monitor', (req, res) => {
    connect.query(`SELECT voyage.id, status.status_name, voyage.type, voyage.out_time, portsOut.name AS NameOut, voyage.in_time, portsIn.name AS NameIn, voyage.length, ship.name, ship.brand, ship.capacity FROM
    voyage 
    LEFT JOIN status ON voyage.status_id = status.id 
    LEFT JOIN ship ON voyage.ship_id = ship.id 
    LEFT JOIN ports AS portsOut ON voyage.out_port = portsOut.id 
    LEFT JOIN ports AS portsIn ON voyage.in_port = portsIn.id
    WHERE voyage.out_time > "${date1}" AND voyage.in_time < "${date2}"; `, (error, result)=>{
        res.json(result);
    });
});

app.post('/staffredir', (req,res) =>{
    dataSelected1 = req.body.name;
});

app.get('/staff', (req, res) => {
    res.sendFile(__dirname + "/staff.html");
});

app.get('/getSData', (req,res) =>{
    connect.query(`
    SELECT staff.surname, staff.name, staff.patronymic, staff.post, staff.expirience FROM
    ship LEFT JOIN crew ON ship.crew_id = crew.id
    LEFT JOIN crew_to_staff ON crew.id = crew_to_staff.crew_id
    LEFT JOIN staff ON crew_to_staff.man_id = staff.id
    WHERE ship.name = "${dataSelected1}";`, (error,result) =>{
        res.json(result);
    });
});


app.post('/shipsredir', (req,res) =>{
    dataSelected2 = req.body.name;
});

app.get('/ships', (req, res) => {
    res.sendFile(__dirname + "/ships.html");
});

app.get('/getShData', (req,res) =>{
    connect.query(
    `
    SELECT ship.brand, ship.name, ship.capacity FROM
    ship LEFT JOIN companies ON ship.company_id = companies.id
    WHERE companies.name = "${dataSelected2}";
    `, (error,result) =>{
        res.json(result);
    });
});

app.post('/insertredir', (req,res) =>{
    name = req.body.name;
});

app.get('/insert', (req,res) =>{
    res.sendFile(__dirname + "/insert.html");
});

app.get('/getInsert', (req,res) =>{
    connect.query(
        `
        SELECT * FROM ${name};
        `, (error,result) =>{
            var data = {'result':result, 'name':name};
            res.json(data);
        });
});

app.get('/getselect', (req,res) =>{
    connect.query(
        `
        SELECT id,${req.query.column} FROM ${req.query.table};
        `, (error,result) =>{
            res.json(result);
        });
});

app.get('/insertData', (req,res) =>{
    data = req.query;
    hd = ``;
    hd += `SELECT id FROM ${data.table} WHERE `;
    for(var i = 0; i < data.values.length-1; i++){
        hd += `${data.column[i]} = '${data.values[i]}' AND `;
    }
    hd += `${data.column[data.values.length-1]} = '${data.values[data.values.length-1]}'`;
    connect.query(hd,(error,result) =>{
        if(result[0]){
            res.json({'answer':`Error! Copy find on id = ${result[0].id}`});
        }else{
            hd = ``;
            ress = ``;
        for(var i = 0; i < req.query.values.length-1; i++){
            ress += `'${req.query.values[i]}',`;
        }
        ress += `'${req.query.values[req.query.values.length-1]}'`;
        hd += `INSERT INTO ${req.query.table}(${req.query.column}) VALUES (${ress});`;
        console.log(hd);
        connect.query(hd, (error,result) =>{
            res.json({'answer':'Success'});
            });
        }
    });
});

var ganswer = 0;
var gname = ``;

app.get('/setback', (req,res) =>{
    ganswer = 1;
    gname = req.query.name;
});

app.post('/fstback', (req,res) =>{
    arr = {'answer':ganswer, 'name':gname};
    ganswer = 0;
    gname = ``;
    res.json(arr);
});