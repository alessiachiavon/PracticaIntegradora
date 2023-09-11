//64fe3a46a1671a46ffada6ce

const { Router } = require("express")
const cartModel = require("../models/cart.model")

const router = Router()

// Ruta para crear un carrito
router.post('/', async(req,res)=>{
    let result = await cartModel.create({})
    res.send({ result: "success", payload: result })
})

// traer
router.get("/:cid", async(req, res) => {
    const cid = req.params.cid
    let result
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    result = await cartModel.findOne({ "_id": "64fe3a46a1671a46ffada6ce"}).populate("products.product").lean()
    
    result.products.forEach((product) => product.subtotal = product.product.precio * product.quantity)
    result.total = 0;
    result.products.forEach((product) => result.total += product.product.precio * product.quantity)
    
   

    console.log(JSON.stringify(result, null, "  "))
    res.render('carts', result)
})

// Actualizar la lista de productos con una lista que se pase por body
router.put('/:cid', async(req, res) => {
    const cid = req.params.cid

    let productsToReplace = req.body.products
    console.log(productsToReplace)
    if (!productsToReplace) {
        res.send({ status: "error", error: "Faltan parámetros"})
    }

    let result = await cartModel.updateOne({ _id: cid }, { products: productsToReplace });
    res.send({ result: "success", payload: result})
  
})

// Agregar un producto por su ID (PUT /:cid/product/:pid)
router.put('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid; // Obtener el ID del carrito
    const pid = req.params.pid; // Obtener el ID del producto a agregar

    // Buscar el carrito en el array de carritos por su ID
    let  cart = await cartModel.findOne({_id: cid});
    console.log(JSON.stringify(cart, null, '  '))

    // Verificar si el carrito existe
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    // Corroborar si ya existe ese ID en el carrito
    const isProductIndex = cart.products.findIndex((product) => product.product === pid);
    

    if (isProductIndex === -1) {
        // Si el producto no existe en el carrito, agregarlo con cantidad 1
        cart.products.push({ product: pid, quantity: 1 });
    } else {
        // Si el producto ya existe en el carrito, aumentar la cantidad
        cart.products[isProductIndex].quantity++;
    }
   
    // Guardar la información actualizada en el archivo JSON
    let result = await cartModel.updateOne({ _id: cid }, cart)
    res.send({ result: "success", payload: result})
});

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', async(req,res)=>{
    const cid = req.params.cid; // Obtener el ID del carrito
    const pid = req.params.pid; // Obtener el ID del producto

    // Buscar el carrito en el array de carritos por su ID
    let  cart = await cartModel.findOne({_id: cid});

    // Verificar si el carrito existe
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    // Corroborar si ya existe ese ID en el carrito
    const isProductIndex = cart.products.findIndex((product) => product.ObjetId === pid);
    const deletedProduct = cart.products.splice(isProductIndex, 1);
    // Guardar la información actualizada en el archivo JSON
    await cart.save()
    res.send({ result: "success", payload: deletedProduct})
})

// Eliminar un  carrito
router.delete('/:cid', async(req,res)=>{
    let { cid } = req.params
    let result = await cartModel.deleteOne({ _id: cid })
    res.send({ result: "success", payload: result})
})
module.exports = router;