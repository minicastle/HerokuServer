const {Pool} = require("pg");
let buf = [
    {"cur_unit":"AED","ttb":331.56,"tts":338.25,"deal_bas_r":334.91,"bkpr":334,"kftc_bkpr":334,"kftc_deal_bas_r":334.91,"cur_nm":"아랍에미리트 디르함"},
    {"cur_unit":"AUD","ttb":900.68,"tts":918.87,"deal_bas_r":909.78,"bkpr":909,"kftc_bkpr":909,"kftc_deal_bas_r":909.78,"cur_nm":"호주 달러"},
    {"cur_unit":"BHD","ttb":3229.89,"tts":3295.14,"deal_bas_r":3262.52,"bkpr":3262,"kftc_bkpr":3262,"kftc_deal_bas_r":3262.52,"cur_nm":"바레인 디나르"},
    {"cur_unit":"BND","ttb":896.95,"tts":915.08,"deal_bas_r":906.02,"bkpr":906,"kftc_bkpr":906,"kftc_deal_bas_r":906.02,"cur_nm":"브루나이 달러"},
    {"cur_unit":"CAD","ttb":965.31,"tts":984.82,"deal_bas_r":975.07,"bkpr":975,"kftc_bkpr":975,"kftc_deal_bas_r":975.07,"cur_nm":"캐나다 달러"},
    {"cur_unit":"CHF","ttb":1292.02,"tts":1318.13,"deal_bas_r":1305.08,"bkpr":1305,"kftc_bkpr":1305,"kftc_deal_bas_r":1305.08,"cur_nm":"스위스 프랑"},
    {"cur_unit":"CNH","ttb":190.86,"tts":194.71,"deal_bas_r":192.79,"bkpr":192,"kftc_bkpr":192,"kftc_deal_bas_r":192.79,"cur_nm":"위안화"},
    {"cur_unit":"DKK","ttb":177.1,"tts":180.67,"deal_bas_r":178.89,"bkpr":178,"kftc_bkpr":178,"kftc_deal_bas_r":178.89,"cur_nm":"덴마아크 크로네"},
    {"cur_unit":"EUR","ttb":1317.35,"tts":1343.96,"deal_bas_r":1330.66,"bkpr":1330,"kftc_bkpr":1330,"kftc_deal_bas_r":1330.66,"cur_nm":"유로"},
    {"cur_unit":"GBP","ttb":1590.07,"tts":1622.2,"deal_bas_r":1606.14,"bkpr":1606,"kftc_bkpr":1606,"kftc_deal_bas_r":1606.14,"cur_nm":"영국 파운드"},
    {"cur_unit":"HKD","ttb":155.26,"tts":158.39,"deal_bas_r":156.83,"bkpr":156,"kftc_bkpr":156,"kftc_deal_bas_r":156.83,"cur_nm":"홍콩 달러"},
    {"cur_unit":"IDR(100)","ttb":8.49,"tts":8.66,"deal_bas_r":8.58,"bkpr":8,"kftc_bkpr":8,"kftc_deal_bas_r":8.58,"cur_nm":"인도네시아 루피아"},
    {"cur_unit":"JPY(100)","ttb":962.19,"tts":981.62,"deal_bas_r":971.91,"bkpr":971,"kftc_bkpr":971,"kftc_deal_bas_r":971.91,"cur_nm":"일본 옌"},
    {"cur_unit":"KRW","ttb":0,"tts":0,"deal_bas_r":1,"bkpr":1,"kftc_bkpr":1,"kftc_deal_bas_r":1,"cur_nm":"한국 원"},
    {"cur_unit":"KWD","ttb":3989.51,"tts":4070.1,"deal_bas_r":4029.81,"bkpr":4029,"kftc_bkpr":4029,"kftc_deal_bas_r":4029.81,"cur_nm":"쿠웨이트 디나르"},
    {"cur_unit":"MYR","ttb":287.52,"tts":293.33,"deal_bas_r":290.43,"bkpr":290,"kftc_bkpr":290,"kftc_deal_bas_r":290.43,"cur_nm":"말레이지아 링기트"},
    {"cur_unit":"NOK","ttb":138.37,"tts":141.16,"deal_bas_r":139.77,"bkpr":139,"kftc_bkpr":139,"kftc_deal_bas_r":139.77,"cur_nm":"노르웨이 크로네"},
    {"cur_unit":"NZD","ttb":824.26,"tts":840.91,"deal_bas_r":832.59,"bkpr":832,"kftc_bkpr":832,"kftc_deal_bas_r":832.59,"cur_nm":"뉴질랜드 달러"},
    {"cur_unit":"SAR","ttb":324.73,"tts":331.3,"deal_bas_r":328.02,"bkpr":328,"kftc_bkpr":328,"kftc_deal_bas_r":328.02,"cur_nm":"사우디 리얄"},
    {"cur_unit":"SEK","ttb":127.34,"tts":129.91,"deal_bas_r":128.63,"bkpr":128,"kftc_bkpr":128,"kftc_deal_bas_r":128.63,"cur_nm":"스웨덴 크로나"},
    {"cur_unit":"SGD","ttb":896.95,"tts":915.08,"deal_bas_r":906.02,"bkpr":906,"kftc_bkpr":906,"kftc_deal_bas_r":906.02,"cur_nm":"싱가포르 달러"},
    {"cur_unit":"THB","ttb":36.23,"tts":36.96,"deal_bas_r":36.6,"bkpr":36,"kftc_bkpr":36,"kftc_deal_bas_r":36.6,"cur_nm":"태국 바트"},
    {"cur_unit":"USD","ttb":1217.79,"tts":1242.4,"deal_bas_r":1230.1,"bkpr":1230,"kftc_bkpr":1230,"kftc_deal_bas_r":1230.1,"cur_nm":"미국 달러"}
]

const pool = new Pool({
    connectionString:"postgres://khvjlcsogypxyl:acbe6e9eef7abf26bd64fcb6812b6802aa94b32bb721d557374e626d7e2e4cdb@ec2-52-71-69-66.compute-1.amazonaws.com:5432/dad3labrj26554",
    ssl:{
        rejectUnauthorized:false
    }
});
pool.connect();

let ct = `
CREATE TABLE test(
    id INTEGER primary Key,
    cur_unit TEXT NOT NULL,
    ttb INTEGER NOT NULL,
    tts INTEGER NOT NULL,
    deal_bas_r INTEGER NOT NULL,
    bkpr INTEGER NOT NULL,
    ktfc_bkpr INTEGER NOT NULL,
    kftc_deal_bas_r INTEGER NOT NULL
  );`;
let init = [];

for(let i = 0;i<buf.length;i++){
    init.push("INSERT INTO test VALUES ("+i+",'"+buf[i].cur_unit+"',"+buf[i].ttb+","+buf[i].tts+","+buf[i].deal_bas_r+","+buf[i].bkpr+","+buf[i].kftc_bkpr+","+buf[i].kftc_deal_bas_r+");")
}
console.log(init.join(""));
// pool.query(ct,function(err,res){
//     console.log(err,res);
// });
pool.query(ct);
pool.query(init.join(""));
pool.query("SELECT * FROM test",function(err,res){
    console.log(res);
});