const { Router } = require("express")
const productModel = require("../models/product.model")
const CustomError = require('../services/CustomError.js')
const EErrors = require('../services/enum.js')
const generateProductErrorInfo = require('../services/info.js')

const products = []

const router = Router()

// traer
router.get("/", async(req, res) => {
    let result
    let limit = parseInt(req.query.limit);
    if (!limit) limit = 10;
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    let query = req.query.query;
    let sort = req.query.sort;
    if (!query) { result = await productModel.paginate({}, { page, limit: limit, sort:{precio: sort}, lean: true })}
    else { result = await productModel.paginate({categoria: query}, { page, limit: limit, lean: true })};
    
    
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)
    console.log(result)
    res.render('products', result)
    //res.send(status="success", payload=result)
})

// crear
router.post("/", async(req,res)=>{
    let nombre = req.body.nombre
    let categoria = req.body.categoria
    let imagen = req.body.imagen
    let precio = req.body.precio
    let stock = req.body.stock
    console.log(nombre, categoria, imagen, precio, stock)

    if(!nombre || !categoria || !imagen || !precio || !stock){
        CustomError.createError({ 
            name:"Product creation error",
            cause:generateProductErrorInfo({nombre,categoria,imagen,precio,stock}),
            message:"Error Trying to create Product",
            code:EErrors.INVALID_TYPES_ERROR 
        })
    }

    try {
        // Intenta crear el producto si todos los campos están presentes
        const result = await productModel.create({ nombre, categoria, imagen, precio, stock });
        res.json({ result: "success", payload: result });
    } catch (error) {
        // Manejar otros errores, como problemas de base de datos
        console.error(error);
        res.status(500).json({ status: "error", error: "Error interno del servidor" });
    }
})

// reemplazar
router.put("/:pid", async (req, res) => {
    let { pid } = req.params

    let productToReplace = req.body
    if (!productToReplace.nombre || !productToReplace.categoria || !productToReplace.imagen || !productToReplace.precio || !productToReplace.stock) {
        res.send({ status: "error", error: "Faltan parámetros"})
    }

    let result = await productModel.updateOne({ _id: pid }, productToReplace)
    res.send({ result: "success", payload: result})
})

// borrar
router.delete("/:pid", async(req,res)=>{
    let { pid } = req.params
    let result = await productModel.deleteOne({ _id: pid })
    res.send({ result: "success", payload: result})
})

module.exports = router