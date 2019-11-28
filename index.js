const express = require('express');
const app = express();
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

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/monitor', (req, res) => {
    res.sendFile(__dirname + "/monitor.html");
});

app.get('/staff', (req, res) => {
    res.sendFile(__dirname + "/staff.html");
});

app.get('/ships', (req, res) => {
    res.sendFile(__dirname + "/ships.html");
});

app.get('/getMData', (req,res) => {
    connect.query(`SELECT voyage.id, status.status_name, voyage.type, voyage.out_time, portsOut.name AS NameOut, voyage.in_time, portsIn.name AS NameIn, voyage.length, ship.name, ship.brand, ship.capacity FROM
    voyage 
    LEFT JOIN status ON voyage.status_id = status.id 
    LEFT JOIN ship ON voyage.ship_id = ship.id 
    LEFT JOIN ports AS portsOut ON voyage.out_port = portsOut.id 
    LEFT JOIN ports AS portsIn ON voyage.in_port = portsIn.id
    WHERE voyage.out_time > "20.11.19" AND voyage.in_time < "23.11.19"; `, (error, result)=>{
        res.json(result);
    });

});

app.get('/getSData', (req,res) =>{
    connect.query(`
    SELECT staff.surname, staff.name, staff.patronymic, staff.post, staff.expirience FROM
    ship LEFT JOIN crew ON ship.crew_id = crew.id
    LEFT JOIN crew_to_staff ON crew.id = crew_to_staff.crew_id
    LEFT JOIN staff ON crew_to_staff.man_id = staff.id;`, (error,result) =>{
        res.json(result);
    });
});

app.get('/getShData', (req,res) =>{
    connect.query(
    `
    SELECT ship.brand, ship.name, ship.capacity FROM
    ship LEFT JOIN companies ON ship.company_id = companies.id;
    `, (error,result) =>{
        res.json(result);
    });
});
