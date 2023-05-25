const { json } = require("body-parser");
const { application } = require("express");

async function sendRequest(url,method,data=null){

const response = await fetch(url, {
    method: method,
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: data === null ? JSON.stringify() : JSON.stringify(data), 
})
let responseData = {};
if(method=='GET'){
    responseData = await response.json();
}
return responseData;
}

async function getData(){
    let response = await sendRequest('http://localhost:5204/api/Comments/GetAll','GET');
    console.log(JSON.stringify(response));
}

getData();