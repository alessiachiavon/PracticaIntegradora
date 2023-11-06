const { faker } = require("@faker-js/faker") 

// faker.locale = "en"

const generateProducts = () => {
    let products = []


    for (let i = 0; i < 100; i++) {
        products.push(generateProduct())
    }
    console.log(products)
    return products
}


const generateProduct = () => {
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price()
    }
}

module.exports = {generateProduct}
