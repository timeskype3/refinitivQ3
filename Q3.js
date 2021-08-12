const fetch = require("node-fetch");
var DOMParser = require('dom-parser');

async function getData(FC) {
    let result = await fetch("https://codequiz.azurewebsites.net",{
        method: 'GET',
        headers: {
            'Content-Type': 'text/html',
            'Cookie': 'hasCookie=true'
        }
    });
    var parser = new DOMParser();
    var doc =  parser.parseFromString(await result.text(), 'text/html');
    var table = doc.getElementsByTagName('tr');
    var data = table.filter(el => el.getElementsByTagName('td').length ).map((el)=>{
        var row = el.getElementsByTagName('td');
        if(row[0].innerHTML.trim() == FC){
            return row.map(el=> el.innerHTML);
        }else return false;
    });
    return data.filter(el => el != false);
}
async function _main(){
    var FUNDCODE = process.argv[2];
    if(FUNDCODE){
        var value = await getData(FUNDCODE.toUpperCase());
        console.log(value[0][1]);
    }else {
        console.log("Please insert fundcode behind node Q3.js command");
    } 
}

_main();

