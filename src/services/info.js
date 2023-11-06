function generateProductErrorInfo(products){
    return `One or more propierties were incomplete or not valid.
    List of required propierties:
    * nombre : needs to be a String, received ${products.nombre}
    *categoria : needs to be a String, received ${products.categoria}
    *imagen : needs to be a String, received ${products.imagen}
    *precio : needs to be a Number, received ${products.precio}
    *stock : needs to be a Number, received ${products.stock}`
}

module.exports = generateProductErrorInfo