import { Request, Response, RequestHandler } from "express";
import {v4 as uid} from "uuid";
import mssql from "mssql"
import {sqlConfig} from "../config"
import { Product } from "../Models/productsModel";
import { DbHelper } from "../DatabaseHelpers";


const dbInstance = new DbHelper()
//adding a product
export async function addProduct(req:Request , res:Response){
    try {
        const productsID = uid()
        const {name, description,price, id}= req.body

        //make connection
        // const pool = await mssql.connect(sqlConfig)

        // pool.request()
        // .input("name", name)        
        // .input("description", description)        
        // .input("price", price) 
        // .input("id", pid)
        // .execute('addProduct') 

        dbInstance.exec('addProduct',{productsID,name,description,price,id} )
        res.status(200).json({Message: "Product Added Successfully"})
    } catch (error) {
        res.status(500).json(error)    
    }
}
//getting products
export async function getProducts(req:Request , res: Response){
    try {
        // //make connection
        // const pool = await mssql.connect(sqlConfig)

        // const products = (await pool.request().execute('getProducts')).recordset as Product []
        const products = await(await (dbInstance.exec('getProducts', {}))).recordset as Product []
        res.status(200).json(products)
        
    } catch (error) {
       res.status(500).json(error) 
    }
}

//getting a product
export async function getProduct(req:Request<{id : string}> , res: Response){
    try {
        // //make connection
        // const pool = await mssql.connect(sqlConfig)

        // const product = (await pool.request()
        // .input("id", req.params.id)
        
        // .execute('getProducts')).recordset[0] as Product

        const product = await(await(dbInstance.exec('getProduct',{productsID: req.params.id}))).recordset[0] as Product
        if(product && product.id){
        res.status(200).json(product)
    } 
    } catch (error) {
       res.status(500).json(error) 
    }
}

export async function updateProduct(req:Request<{id : string}> , res: Response){
    try {
        const {name, description,price, id}= req.body

        const product = await dbInstance.exec('updateProduct',{productsID: req.params.id,name,description,price,id})

        res.status(200).json({message:"Product Updated Successfully"})
    } catch (error) {
        res.status(500).json(error)  
    }
}

export async function deleteProduct(req:Request<{id : string}> , res: Response){
    try {
        const delprod = await(dbInstance.exec('deleteProduct',{productsID: req.params.id}))
        res.status(200).json({message:"Product Deleted Successfully"})
    } catch (error) {
        res.status(500).json(error)  
    }
}

export async function getCategoryProduct(req:Request<{id : string}> , res: Response){
    try {
        const product = await(await(dbInstance.exec('getCategoryProducts ',{id: req.params.id}))).recordset as Product[]

        if(product.length > 0){
            res.status(200).json(product)
    }
    } catch (error) {
        res.status(500).json(error)  
    }
}