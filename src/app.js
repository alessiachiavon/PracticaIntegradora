const express = require('express');
const mongoose = require('mongoose');
const cartsRouter = require("./routes/carts.routers")
const cartModel = require("./models/cart.model")
const productRouter = require("./routes/products.routers")
const productModel = require("./models/product.model")
const handlebars = require('express-handlebars')
const app = express();
const PORT = 8080
let cid

app.use(express.json())

app.use("/api/carts", cartsRouter)
app.use("/api/products", productRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const enviroment = async () => {
    await mongoose.connect('mongodb+srv://alessiachiavon:aleC93272940@cluster0.q6ja3n2.mongodb.net/?retryWrites=true&w=majority')
//    const raw = "";

/* const requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

try {
    const response = await fetch("http://localhost:8080/api/carts/", requestOptions);
    const data = await response.json(); // Parsea la respuesta JSON
  
    if (data.result === 'success') {
      cid = data.payload._id; // Accede al ID del carrito desde el objeto data
      console.log('ID del carrito:', cid);
    } else {
      console.log('La respuesta indica un error:', data.result);
    }
  } catch (error) {
    console.log('Ocurrió un error al realizar la solicitud:', error);
  }
*/
}

enviroment()

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');

