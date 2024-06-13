import { Request, Response, RequestHandler } from "express";
import {v4 as uid} from "uuid";
import {sqlConfig} from "../config"
import { Category, CategoryRequest } from "../Models/categoryModel";
import mssql from "mssql"

export async function addCategory(req:Request, res:Response){
    try {
        //id
        const id = uid()
        const  {name} = req.body

        //make connection
        const pool = await mssql.connect(sqlConfig)
        const category = (await pool.request()
        .input("id", id)
        .input("Name", name)
        .execute("addCategory"))

        res.status(200).json({Message: "Category Added Successfully"})
    }catch (error){
        res.status(500).json(error)
    }
}

export async function getCategory(req:Request, res:Response){
    try {
        let pool = await mssql.connect(sqlConfig)
        let categories = (await pool.request().execute('getCategory')).recordset as Category []

        res.status(200).json({Message: "Category Added Successfully"})
    }catch (error){
        res.status(500).json(error)
    }
}