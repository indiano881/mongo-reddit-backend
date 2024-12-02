import express from "express";
import mongoose from "mongoose"
import 'dotenv/config'

import { postRouter } from "./routes/post";

const app= express();

app.use(postRouter)

mongoose.connect(process.env.DB_URL!).then(()=> {
    const port= process.env.PORT || "8080";
    app.listen(port, ()=> {
        console.log(`Listening at http://localhost:${port}/`)
    })
})

//app.listen(8080, ()=> {
//   console.log("Listening on http://localhost:8080/")
//})