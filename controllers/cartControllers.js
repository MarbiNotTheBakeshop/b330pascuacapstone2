
const Cart = require("../models/Cart");
const User = require("../models/User"); 

module.exports.addToCart = (request, response) => {
    const reqBody = request.body;

    Cart.findOne({ userId: reqBody.userId })
        .then(existingCart => {
            if (existingCart) {
                const productsWithTotalAmount = reqBody.products.map(product => ({
                    productId: product.productId,
                    qty: product.qty,
                    price: product.price,
                    totalAmount: product.qty * product.price,
                }));

                existingCart.products = existingCart.products.concat(productsWithTotalAmount);

                existingCart.save()
                    .then(updatedCart => {

                        User.findOneAndUpdate(
                            { _id: reqBody.userId },
                            { $push: { orders: updatedCart._id } },
                            { new: true }
                        )
                            .then(updatedUser => {
                                return response.status(200).json({ cart: updatedCart, user: updatedUser });
                            })
                            .catch(error => {
                                console.error(error);
                                return response.status(500).json({ error: "Error linking cart to user", details: error.message });
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        return response.status(500).json({ error: "Error encountered during cart update", details: error.message });
                    });
            } else {

                const productsWithTotalAmount = reqBody.products.map(product => ({
                    productId: product.productId,
                    qty: product.qty,
                    price: product.price,
                    totalAmount: product.qty * product.price,
                }));

                const newCart = new Cart({
                    userId: reqBody.userId,
                    products: productsWithTotalAmount,
                });

                newCart.save()
                    .then(savedCart => {

                        User.findOneAndUpdate(
                            { _id: reqBody.userId },
                            { $push: { orders: savedCart._id } },
                            { new: true }
                        )
                            .then(updatedUser => {
                                return response.status(201).json({ cart: savedCart, user: updatedUser });
                            })
                            .catch(error => {
                                console.error(error);
                                return response.status(500).json({ error: "Error linking cart to user", details: error.message });
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        return response.status(500).json({ error: "Error encountered during cart creation", details: error.message });
                    });
            }
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send("Error finding existing cart");
        });
};

module.exports.getOrdersSummary = (request, response) => {
    const userId = request.params.userId;

    User.findById(userId)
        .populate({
            path: 'orders',
            populate: {
                path: 'products.productId',
                models: 'Product'
            }
        })
        .exec()
        .then(user => {
            if (!user) {
                return response.status(404).json({ error: "User not found" });
            }

            return response.status(200).json({ orders: user.orders });
        })
        .catch(error => {
            console.error(error);
            return response.status(500).json({ error: "Error fetching user orders", details: error.message });
        });
};