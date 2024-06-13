import { Router } from "express";
import { addCategory, getCategory } from "../Controllers/categoryController";
import { verifyToken } from "../Middleware";

const Categoryrouter = Router()

Categoryrouter.post("", addCategory)
Categoryrouter.get("", getCategory)
Categoryrouter.get("",verifyToken, getCategory) ///also add to products


export default Categoryrouter

