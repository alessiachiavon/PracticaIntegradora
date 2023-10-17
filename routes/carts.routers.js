//64fe3a46a1671a46ffada6ce

const { Router } = require("express")
const cartController = require("../controllers/cartController")

const router = Router()

// Ruta para crear un carrito
router.post('/', cartController.createCart);


// traer
router.get("/:cid", cartController.getCart)


// Actualizar la lista de productos con una lista que se pase por body
router.put('/:cid', cartController.updateCart)


// Agregar un producto por su ID (PUT /:cid/product/:pid)
router.put('/:cid/products/:pid', cartController.addProduct);

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