import { Request, Response} from "express";
import {v4 as uid} from "uuid";
import { Category} from "../Models/categoryModel";
import { DbHelper } from "../DatabaseHelpers";

const dbInstance = new DbHelper()

export async function addCategory(req:Request, res:Response){
    try {
        //id
        const id = uid()
        const  {name} = req.body

        // //make connection
        // const pool = await mssql.connect(sqlConfig)
        // const category = (await pool.request()
        // .input("id", id)
        // .input("name", name)
        // .execute("addCategory"))
        dbInstance.exec('addCategory', {id,name})

        res.status(200).json({Message: "Category Added Successfully"})
        
    }catch (error){
        res.status(500).json(error)
    }
}

export async function getCategory(req:Request, res:Response){
    try {
        // let pool = await mssql.connect(sqlConfig)
        // let categories = (await pool.request().execute('getCategories')).recordset as Category []
        const categories = await(await (dbInstance.exec('getCategories', {}))).recordset as Category []
        res.status(200).json(categories)
    }catch (error){
        res.status(500).json(error)
    }
}