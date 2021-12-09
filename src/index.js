const express = require("express");
const handleCatFactsRequest = require("./catFacts");
const {handleGreeting, otherValue} = require('./greeting');

const app = express();
const port = 3000;

app.use((req, res, next)=>{
    console.log('Time:', Date.now());
    //next()
});

app.get("/", (request,response)=>{
    response.send("Hello World!!!!");
})

app.get("/hello/:name?", (request,response)=>{
    handleGreeting(request, response);
    console.log(otherValue);
})

app.get('/cat/facts',handleCatFactsRequest);



app.listen(port, ()=>{
    console.log("A pornit serveru' la ",port);
})