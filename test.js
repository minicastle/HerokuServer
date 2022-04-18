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
    console.log(buf);
    if(buf.length!==2){
        return "0"+buf;
    }
    else{
        return buf;
    }
}
console.log(year+month()+date());