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
    const nombre = req.body.productTitle
    const categoria = req.body.productCategory
    const imagen = req.body.productImage
    const precio = req.body.productPrice
    const stock = req.body.productStock

    if(!nombre || !categoria || !imagen || !precio || !stock){
        CustomError.createError({ 
            name:"Product creation error",
            cause:generateProductErrorInfo({nombre,categoria,imagen,precio,stock}),
            message:"Error Trying to create Product",
            code:EErrors.INVALID_TYPES_ERROR 
        })
    }

    let result = await productModel.create({ nombre, categoria, imagen, precio, stock})
    res.send({ result: "success", payload: result })
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