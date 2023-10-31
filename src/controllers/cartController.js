const cartData = require('../dao/models/cart.model');

function createCart(req,res) {
    const newCart = cartData.createCart();
    res.send({ result: "success", payload: newCart })
}

async function getCart(req, res) {

    const cid = req.params.cid
    let cart = await cartData.getCart("64fe3a46a1671a46ffada6ce")
    console.log(cart)
    
    cart.products.forEach((product) => product.subtotal = product.product.precio * product.quantity)
    cart.total = 0;
    cart.products.forEach((product) => cart.total += product.product.precio * product.quantity)
    
    
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    
    res.render('carts', cart)
}

function updateCart(req, res) {
    const cid = req.params.cid
    let productsToReplace = req.body.products
    
    if (!productsToReplace) {
        res.send({ status: "error", error: "Faltan parámetros"})
    }

    let cart = cartData.updateCart(cid, productsToReplace)
    res.send({ result: "success", payload: cart})
  
}

function addProduct(req, res) {
    const cid = req.params.cid; // Obtener el ID del carrito
    const pid = req.params.pid; // Obtener el ID del producto a agregar

    // Buscar el carrito en el array de carritos por su ID
    let cart = cartData.findCart({_id: cid})

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
    let result = cartData.updateCart(cid, cart.products)
    res.send({ result: "success", payload: result})
}

module.exports = {
    createCart,
    getCart,
    updateCart,
    addProduct
}