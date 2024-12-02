import express from "express";

const app= express();

app.get('/', (req, res)=> {
    res.send("<h1>hellow world</h1>")
})

app.listen(8080, ()=> {
    console.log("Listening on http://localhost:8080/")
})