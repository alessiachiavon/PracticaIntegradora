const { Router } = require("express")
const productController = require("../controllers/productController")

const router = Router()

// traer
router.get('/', productController.getProduct)
    
// crear
router.post("/", productController.createProduct)

// reemplazar
router.put("/:pid", productController.replaceProduct)

// borrar
router.delete("/:pid", productController.deleteProduct)

module.exports = router