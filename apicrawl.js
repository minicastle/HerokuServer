const axios = require("axios");
const datacrawl = require("./datacrawl.json");

function nowDate(){
    let now = new Date;
    let year = String(now.getFullYear());
    let mon = String(now.getMonth()+1);
    let date = String(now.getDate());
    if(mon.length <2){
        mon = "0"+mon;
    }
    if(date.length <2){
        date = "0"+date;
    }
    let value = year+mon+date;
    return value;
}

async function apiCrawl(){
    let value = await axios.get(datacrawl.url1+datacrawl.authkey+datacrawl.url2+nowDate()+datacrawl.url3).then(function(data){
        for(let i = 0;i<data.data.length;i++){
            let buf = [];
            delete data.data[i].result;
            delete data.data[i].yy_efee_r;
            delete data.data[i].ten_dd_efee_r;
            buf = data.data[i].ttb.split("").filter(x=>x!==",");
            data.data[i].ttb = Number(buf.join(""));
            buf = data.data[i].tts.split("").filter(x=>x!==",");
            data.data[i].tts = Number(buf.join(""));
            buf = data.data[i].deal_bas_r.split("").filter(x=>x!==",");
            data.data[i].deal_bas_r = Number(buf.join(""));
            buf = data.data[i].bkpr.split("").filter(x=>x!==",");
            data.data[i].bkpr = Number(buf.join(""));
            buf = data.data[i].kftc_bkpr.split("").filter(x=>x!==",");
            data.data[i].kftc_bkpr = Number(buf.join(""));
            buf = data.data[i].kftc_deal_bas_r.split("").filter(x=>x!==",");
            data.data[i].kftc_deal_bas_r = Number(buf.join(""));
        }
        return data.data;
    });
    return value;
}

exports.nowDate = nowDate();
exports.apiCrawl = apiCrawl();