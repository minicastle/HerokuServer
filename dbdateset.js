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

console.log(now);
console.log(year+mon+date+hour+min);