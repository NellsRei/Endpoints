import { Request, Response, RequestHandler } from "express";
import {v4 as uid} from "uuid";
import mssql from "mssql"
import {sqlConfig} from "../config"
import { Product } from "../Models/productsModel";

//adding a product
export async function addProduct(req:Request , res:Response){
    try {
        const pid = uid()
        const {name, description,price, id}= req.body

        //make connection
        const pool = await mssql.connect(sqlConfig)

        pool.request()
        .input("name", name)        
        .input("description", description)        
        .input("price", price) 
        .input("id", pid)
        .execute('addProduct') 
        res.status(200).json({Message: "Product Added Successfully"})
    } catch (error) {
        res.status(500).json(error)    
    }
}
//getting products
export async function getProducts(req:Request , res: Response){
    try {
        //make connection
        const pool = await mssql.connect(sqlConfig)

        const products = (await pool.request().execute('getProducts')).recordset as Product []
        res.status(200).json(products)
        
    } catch (error) {
       res.status(500).json(error) 
    }
}

//getting a product
export async function getProduct(req:Request<{id : string}> , res: Response){
    try {
        //make connection
        const pool = await mssql.connect(sqlConfig)

        const product = (await pool.request()
        .input("id", req.params.id)
        
        .execute('getProducts')).recordset[0] as Product


        if(product && product.id){
        res.status(200).json(product)
    } 
    } catch (error) {
       res.status(500).json(error) 
    }
}

