import { v4 as uid } from "uuid"
import { Request, Response} from "express";
import { RegisterSchema } from "../Helper";
import  Bycrypt  from "bcrypt";
import  mssql  from "mssql"
import { sqlConfig } from "../config";
import { Payload, User } from "../Models/authModel";
import jwt from "jsonwebtoken";
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})

export const registerUser = async (req:Request, res:Response) =>{
    try {
        const userid = uid()
        const {Name, Email, Password} = req.body
        const {error} = RegisterSchema.validate(req.body)
        if(error){
            return res.status(400).json(error.details[0].message)
        }
        const HashPassword = await Bycrypt.hash(Password,10)
        let pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('Id', userid)
        .input('Name' , Name)
        .input('Email', Email)
        .input('Password' , HashPassword)
        .execute('addUser')

        return res.status(201).json({Message:"User is added Successfully"})
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const loginUser = async (req:Request, res:Response)=>{
    try {
        const {Email,Password}=req.body

        let pool = await mssql.connect(sqlConfig)
        let user = (await pool.request()
        .input('Email', Email)
        .execute('getUser')).recordset as User[]

        if(user.length > 0){
            //validate password
        const isValid = await Bycrypt.compare(Password, user[0].Password)
            if(isValid){
                const payload:Payload ={
                    Sub: user[0].Id,
                    Name: user[0].Name,
                }
                const token = jwt.sign(payload,
                    process.env.SECRET as string,
                    {expiresIn:'2h'}
                )

                return res.status(201).json({Message:"Login Successfull!!!",token})
            }
            return res.status(400).json({Message:"Incorrect Credentials!!!"})
        }
        
    } catch (error) {
        return res.status(500).json(error)
    }
}