const sql = require("mssql");
const express = require("express");
const {response} = require("express");
const app = express();
const path = require("path");
const { request } = require("https");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var config = {
    user : 'sa',
    password : '12345678',
    server : 'LOCALHOST\\SQLEXPRESS',
    database : 'Company', 
    options : {
        encrypt : false ,
        useUTC : true ,
    }
}
sql.connect(config, function(err){
    if (err) console.log(err)
    else 
    console.log("Connection is successful")
})

app.listen(8083, function(err){
    if(!err)
    console.log("Listening at port 8083")
    else
    console.log(err);
})

app.get('/',(request,response) =>{
    response.sendFile(path.join(__dirname+"/index.html"));
})

app.get('/views/addEmp.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/views/addEmp.html'));
})
app.get('/views/updateEmp.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/views/updateEmp.html'));
})
app.get('/views/deleteEmp.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/views/deleteEmp.html'));
})

app.get('/',(request,response)=>{
    var req = new sql.Request();
    req.query("select * from Employee", function(recordset,err){
        if(err) console.log(err);
        else
        response.send(recordset);
        // response.sendFile(path.join(__dirname+"/index.html"),
        // {
            
        //     emps: recordset
            
        // })
    })
})

app.post('/addEmployee',(request,response) => {
    // response.send(request.body);
    const {employeeId,name,departmentId,managerId,designation,salary} = request.body
    var req = new sql.Request();
    req.query("insert into Employee values ('"+employeeId+"','"+name+"','"+departmentId+"','"+managerId+"','"+designation+"','"+salary+"')", function(recordset, err)
    {
        if(err) console.log(err);
        else
        response.send(recordset);
        response.redirect("../");
    });
})

app.post('/updateEmployee', (request,response) =>{
    const {employeeId,name,departmentId,managerId,designation,salary} = request.body
    var req = new sql.Request();
    req.query("update Employee set EmpName ='"+name+"', DeptId ='"+departmentId+"', ManagerID ='"+managerId+"', Designation ='"+designation+"', Salary ='"+salary+"' where EmpId ='"+employeeId+"'", function(recordset,err)
    {
        if(err) console.log(err);
        else
        response.send(recordset);
        response.redirect("../");
    })
})

app.post('/deleteEmployee',(request,response) =>{
    const {employeeId} = request.body
    var req = new sql.Request();
    req.query("delete from Employee where EmpId ='"+employeeId+"'", function(recordset,err){
        if(err) console.log(err);
        else
        response.send(recordset);
        response.redirect("../");
    })
})

// app.post('/name',function(request,response){
//     response.send("hello")
// })
// alert("I am an alert box!");