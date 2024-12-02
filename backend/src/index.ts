import express from "express";
import { postRouter } from "./routes/post";

const app= express();

app.use(postRouter)

app.listen(8080, ()=> {
    console.log("Listening on http://localhost:8080/")
})