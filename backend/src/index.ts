import express from "express";
import mongoose from "mongoose"
import 'dotenv/config'

import { postRouter } from "./routes/post";
import { authRouter } from "./routes/auth";
import { proflieRouter } from "./routes/profile";

const app= express();
app.use(express.json())//becuase not inbuild in express
app.use(postRouter)
app.use(authRouter)
app.use(proflieRouter)
mongoose.connect(process.env.DB_URL!).then(()=> {
    const port= process.env.PORT || "8080";
    app.listen(port, ()=> {
        console.log(`Listening at http://localhost:${port}/`)
    })
})

