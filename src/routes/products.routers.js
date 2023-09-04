const { Router } = require("express")
const { productModel } = require("../models/product.model")

const router = Router()

router.get("/", async(req, res) => {
    try {
        let products = await productModel.find()
        res.send({ result: "success", payload: products})
    } catch (error) {
        console.log(error)
    }
})

router.post("/", async(req,res)=>{
    let {nombre, categoria, imagen, precio, stock} = req.body

    if(!nombre || !categoria || !imagen || !precio || !stock){
        res.send({ status: "error", error: "Faltan parámetros" })
    }

    let result = await productModel.create({ nombre, categoria, imagen, precio, stock})
    res.send({ result: "success", payload: result })
})

router.put("/:uid", async (req, res) => {
    let { uid } = req.params

    let userToReplace = req.body
    if (!userToReplace.nombre || !userToReplace.categoria || !userToReplace.imagen || !userToReplace.precio || !userToReplace.stock) {
        res.send({ status: "error", error: "Faltan parámetros"})
    }

    let result = await productModel.updateOne({ _id: uid }, userToReplace)
    res.send({ result: "success", payload: result})
})

router.delete("/:uid", async(req,res)=>{
    let { uid } = req.params
    let result = await productModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result})
})

module.exports = router