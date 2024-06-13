import { Payload } from "../Models/authModel"
import { NextFunction, Request, Response} from "express";
import jws from "jsonwebtoken" 


export interface ExtendedRequest extends Request{
    info? :Payload
}

export function verifyToken(req:ExtendedRequest, res:Response,next:NextFunction){
    try {
        //read token
        const token = req.headers['token'] as string

        //check token
        if(!token){
            return res.status(401).json({message:"Forbidden"})
        }
        const decodeData = jws.verify(token, process.env.SECRET as string) as Payload
        req.info = decodeData
    } catch (error) {
        
    }
    next()
}