const express = require("express");
const app = express();
const port = process.env.PORT||5000;
const {nowDate,apiCrawl} = require("./apicrawl");
const nodeSchedule = require("node-schedule");

app.get("/",function(req,res){
    res.send("Server Set start with Heroku");
});

app.get("/nowdate",function(req,res){
    let sendData = nowDate;
    res.send(sendData);
});

app.get("/exchange_rate",async function(req,res){
    let sendData = await apiCrawl;
    res.send(sendData);
});

app.listen(port);

// const job = nodeSchedule.scheduleJob("* * * * * 1-5",function(){
//     console.log("Job Complete..");
// });