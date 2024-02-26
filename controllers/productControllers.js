// const Cart = require("../models/Cart");
// const User = require("../models/User"); 
const Product = require("../models/Product.js");

module.exports.addProduct = (request, response) => {
    const reqBody = request.body;

    Product.find({name : reqBody.name})
    .then(result => {
        if(result.length > 0){

            return response.send(`${reqBody.name} is already added as your product.`);
        }else{

            const newProduct = new Product({

                name : reqBody.name,
                price : reqBody.price,
                description : reqBody.description
                
            });

            newProduct.save().then(save => {
                return response.send(`${reqBody.name} is now added as your new product!`);
            }).catch(error => {
                return response.status(500).send("Error encountered during adding of product!");
            });
        }
    })
    .catch(error => response.status(500).send("Error finding product"));
};

module.exports.getAllProducts = (request, response) => {
    const reqBody = request.body;
    
    Product.find({}).then(result => response.send(result))
    .catch(error => response.send(error));
};

module.exports.getAllActive = (request, response) => {
    const reqBody = request.body;

    Product.find({isActive: true}).then(result => response.send(result))
    .catch(error => response.send(error));
};

module.exports.getProduct = (request, response) => {
    const reqParams = request.params.productId;

    Product.findById(reqParams).then(result => response.send(result))
    .catch(error => response.send(error));

};

module.exports.updateProduct = (request, response) => {
    const reqParams = request.params.productId;
    const reqBody = request.body;

    let updatedProduct = {
        name: reqBody.name,
        description: reqBody.description,
        price: reqBody.price
    }

    Product.findByIdAndUpdate(reqParams, updatedProduct).then(result => {
        if(result){
            return response.send(true);
        }else{
            return response.send(false);
        }
    })
    .catch(error => response.send(error));

};

module.exports.archiveProduct = (request, response) => {
    const productId = request.params.productId;

    let updateActiveField = {
        isActive: false
    };

    Product.findByIdAndUpdate(productId, updateActiveField, { new: true })
        .then((product) => {
            if (!product) {
                console.log("Product not found.");
                return response.status(404).send("Product not found.");
            }
            console.log("Product updated:", product);
            return response.status(200).json(product);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).send("Error updating product.");
        });
};


module.exports.activateProduct = (request, response) => {
    const productId = request.params.productId;

    let updateActiveField = {
        isActive: true
    };

    Product.findByIdAndUpdate(productId, updateActiveField, { new: true })
        .then((product) => {
            if (!product) {
                console.log("Product not found.");
                return response.status(404).send("Product not found.");
            }
            console.log("Product updated:", product);
            return response.status(200).json(product);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).send("Error updating product.");
        });
};