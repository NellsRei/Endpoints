import { Router } from "express";
import { addCategory, getCategory } from "../Controllers/categoryController";

const Categoryrouter = Router()

Categoryrouter.post(" ", addCategory)
Categoryrouter.get(" ", getCategory)

export default Categoryrouter

