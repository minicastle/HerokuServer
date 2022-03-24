const axios = require("axios");
const datacrawl = require("./datacrawl.json");

function nowDate(){
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

async function apiCrawl(){
    let value = await axios.get(datacrawl.url1+datacrawl.authkey+datacrawl.url2+nowDate()+datacrawl.url3).then(function(data){
        for(let i = 0;i<data.data.length;i++){
            delete data.data[i].result;
            delete data.data[i].yy_efee_r;
            delete data.data[i].ten_dd_efee_r;
        }
        return data.data;
    });
    return value;
}

exports.nowDate = nowDate();
exports.apiCrawl = apiCrawl();