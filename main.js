const { default: axios } = require("axios");
const express = require("express");
const app = express();
const PORT = process.env.PORT||3001;
const data = require("./dataCrawl.json");

app.get("/",function(req,res){
    res.send("Server Set Start localhost:"+PORT);
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
    axios.request(data.url1+data.authkey+data.url2+nowDate()+data.url3).then(function(data){
        console.log(data);
        for(let i = 0;i<data.data.length;i++){
            delete data.data[i].result;
            delete data.data[i].yy_efee_r;
            delete data.data[i].ten_dd_efee_r;
        }
        console.log(data.data);
        res.send(data.data);
    })
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
})
app.listen(PORT);