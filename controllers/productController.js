const productData = require('../persistence/productData');

async function getProduct(req, res) {
    let result
    let limit = parseInt(req.query.limit);
    if (!limit) limit = 10;
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    let query = req.query.query;
    let sort = req.query.sort;
    if (!query) { result = await productData.getProduct(page, limit, sort)}
    else { result = await productData.queryProduct(page, limit, query)};
    
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)
    console.log(result)
    res.render('products', result)
}

function createProduct(req,res) {
    let {nombre, categoria, imagen, precio, stock} = req.body

    if(!nombre || !categoria || !imagen || !precio || !stock){
        res.send({ status: "error", error: "Faltan parámetros" })
    }

    let product = productData.createProduct({ nombre, categoria, imagen, precio, stock})
    res.send({ result: "success", payload: product })
}

function replaceProduct (req, res) {
    let { pid } = req.params

    let productToReplace = req.body
    if (!productToReplace.nombre || !productToReplace.categoria || !productToReplace.imagen || !productToReplace.precio || !productToReplace.stock) {
        res.send({ status: "error", error: "Faltan parámetros"})
    }

    let product = productData.updateProduct(pid, productToReplace)
    res.send({ result: "success", payload: product})
}

function deleteProduct (req,res) {
    let { pid } = req.params
    let result = productData.deleteProduct(pid)
    res.send({ result: "success", payload: result})
}

module.exports = {
    getProduct,
    createProduct,
    replaceProduct,
    deleteProduct
}