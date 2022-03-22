const express = require("express");
const app = express();
const port = process.env.PORT;
const axios = require("axios");
const urlCrawl = require("./dataCrawl.json");

app.get("/",function(req,res){
    res.send("Server Set start with Heroku");
});
app.get("/nowdate",function(req,res){
    let now = new Date;
    let year = String(now.getFullYear());
    let month = function(){
        let buf = String(now.getMonth()+1);
        if(buf.length!==2){
            return "0"+buf;
        }
        else{
            return buf;
        }
    };
    let date =  function(){
        let buf = String(now.getDate());
        if(buf.length!==2){
            return "0"+buf;
        }
        else{
            return buf;
        }
    }
    res.send(year+month()+date());
});
app.get("/exchange_rate/nowdate",function(req,res){
    let nowDate = function(){
        let now = new Date;
        let year = String(now.getFullYear());
        let month = function(){
            let buf = String(now.getMonth()+1);
            if(buf.length!==2){
                return "0"+buf;
            }
            else{
                return buf;
            }
        };
        let date =  function(){
            let buf = String(now.getDate());
            if(buf.length!==2){
                return "0"+buf;
            }
            else{
                return buf;
            }
        }
        return (year+month()+date());
    }
    console.log(nowDate());
    axios.request(urlCrawl.url1+urlCrawl.authkey+urlCrawl.url2+nowDate()+urlCrawl.url3).then(function(data){
        console.log(data);
        for(let i = 0;i<data.data.length;i++){
            delete data.data[i].result;
            delete data.data[i].yy_efee_r;
            delete data.data[i].ten_dd_efee_r;
        }
        console.log(data.data);
        res.send(data.data);
    });
});
app.listen(port);