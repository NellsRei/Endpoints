import  express, { json } from "express";
import Categoryrouter from "./Routers/categoryRoutes";
import authRouter from "./Routers/authRoutes";

const app = express()

//middleware
app.use(json())

app.use("/categories", Categoryrouter)
app.use("/auth", authRouter)
// app.use("/products", prod)

//port
app.listen(3005, ()=>{
    console.log('Server Running....');
    
})