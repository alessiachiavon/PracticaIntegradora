const express = require('express');
const mongoose = require('mongoose');
const cartsRouter = require('./routes/carts.routers');
const productRouter = require('./routes/products.routers');
const generateProduct = require('./routes/moking.routers');
const EErrors = require('./services/enum')
//const errorHandler = require('./middlewares/errors/handler.js');
const handlebars = require('express-handlebars');
const app = express();
const PORT = 8080;
let cid

app.use(express.json())

app.use("/api/carts", cartsRouter)
app.use("/api/products", productRouter)
app.use("/mokingproducts", generateProduct);
app.use((error,req,res,next) => {
  switch (error.code) {
      case EErrors.INVALID_TYPES_ERROR:
          res.send({status:"error",error:error.name})
          break;
      default:
          res.send({status:"error",error:"Unhandled error"})
  }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const enviroment = async () => {
    await mongoose.connect('mongodb+srv://alessiachiavon:aleC93272940@cluster0.q6ja3n2.mongodb.net/?retryWrites=true&w=majority')
}

enviroment()

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');

