const express = require("express");
const app = express();
const port = process.env.PORT||5000;
const {nowDate,apiCrawl} = require("./apicrawl");
const nodeSchedule = require("node-schedule");
const {Pool} = require("pg");

let pool = new Pool({
    connectionString:"postgres://khvjlcsogypxyl:acbe6e9eef7abf26bd64fcb6812b6802aa94b32bb721d557374e626d7e2e4cdb@ec2-52-71-69-66.compute-1.amazonaws.com:5432/dad3labrj26554",
    ssl:{
        rejectUnauthorized:false
    }
});
pool.connect(function(err){
    if(err){
        console.log(err);
    }
});

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

app.get("/access_dbdata",function(req,res){
    let tableNames = [];
    function tableSelect(){
        
    };
    pool.query(`SELECT tablename FROM pg_tables WHERE tableowner = 'khvjlcsogypxyl'`,function(err,res){
        if(err){
            console.log(err);
        }
        else{
            let buf = [];
            buf.push(res.rows);
            for(let i = 0; i<buf[0].length;i++){
                tableNames.push(buf[0][i].tablename);
            }
            tableSelect();
        }
    });
});

app.listen(port);

const job = nodeSchedule.scheduleJob("5 * * * * 1-5",async function(){
    const tableName = function(){
        let now = new Date;
        let year = String(now.getFullYear());
        let mon = String(now.getMonth()+1);
        let date = String(now.getDate());
        let hour = String(now.getHours());
        let min = String(now.getMinutes());
        if(mon.length <2){
            mon = "0"+mon;
        }
        if(date.length <2){
            date = "0"+date;
        }
        if(hour.length <2){
            hour = "0"+hour;
        }
        if(min.length <2){
            min = "0"+min;
        }
        let dbdate = year+mon+date+hour+min;
        let tablename = "exchange"+dbdate;
        tableSet(tablename);
    }
    const tableSet = function(tn){
        let ct =`
        CREATE TABLE "${tn}"(
            id INTEGER primary Key,
            cur_unit TEXT NOT NULL,
            ttb FLOAT NOT NULL,
            tts FLOAT NOT NULL,
            deal_bas_r FLOAT NOT NULL,
            bkpr INTEGER NOT NULL,
            ktfc_bkpr INTEGER NOT NULL,
            kftc_deal_bas_r FLOAT NOT NULL
          );`;
          console.log(`DB ${tn} Set Start`);
          pool.query(ct,function(err,res){
              if(err){
                  console.log(err);
              }
              else {
                dataSet(tn);
              }
          });
    }
    const dataSet = async function(tn){
        let sendData = await apiCrawl;
        let init = [];
        for(let i = 0;i<sendData.length;i++){
            init.push(`INSERT INTO ${tn} VALUES (${i},'${sendData[i].cur_unit}',${sendData[i].ttb},${sendData[i].tts},${sendData[i].deal_bas_r},${sendData[i].bkpr},${sendData[i].kftc_bkpr},${sendData[i].kftc_deal_bas_r});`);
        }
        tableInit(tn,init.join(""));
    }
    const tableInit = function(tn,init){
        pool.query(init,function(err,res){
            if(err){
                console.log(err);
            }
            else {
                tableEnd(tn);
            }
        });
    }
    const tableEnd = function(tn){
        console.log(`DB ${tn} Set END`);
    }
    tableName();
});