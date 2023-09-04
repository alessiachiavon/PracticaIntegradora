const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./routes/users.routers")
const productRouter = require("./routes/products.routers")
const app = express();
const PORT = 8080

app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/products", productRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

mongoose.connect('mongodb+srv://alessiachiavon:aleC93272940@cluster0.q6ja3n2.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("Conectado a db de Mongo Atlas")
})
.catch(error=>{
    console.error("Error en la conexión", Error)
})