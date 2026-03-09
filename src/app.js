import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors ({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes
import userRouter from './routes/user.routes.js'
console.log("✅ userRouter imported:", userRouter ? "Yes" : "No");

//routes declaration
app.use("/api/v1/users",userRouter)//whoeever presses users one will handle to userrouter

//http://localhost:8000/api/v1/user/register

export { app }