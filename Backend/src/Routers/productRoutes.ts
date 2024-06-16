import { Router } from "express";
import { addProduct, deleteProduct, getCategoryProduct, getProduct, getProducts, updateProduct } from "../Controllers/productController";
// import { verifyToken } from "../Middleware";
const Productrouter = Router()

Productrouter.post("", addProduct)
Productrouter.get("/:id", getProduct)
Productrouter.get("", getProducts)
Productrouter.patch("/:id", updateProduct)
Productrouter.delete("/:id", deleteProduct)
Productrouter.get("/categories/:id", getCategoryProduct)


export default Productrouter