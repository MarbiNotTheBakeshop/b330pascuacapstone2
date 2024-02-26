
const User = require("../models/User"); 

const bcrypt = require("bcrypt");
const auth = require("../auth.js");

// Controllers
module.exports.checkEmailExists = async (request, response, next) => {
    try {
        const reqBody = request.body;

        const existingUser = await User.findOne({ email: reqBody.email });

        if (existingUser) {
            return response.status(400).json({ error: "The email is already registered. Please use another email!" });
        }

        next();
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Error occurred!" });
    }
};
module.exports.registerUser = (request, response) => {
    const reqBody = request.body;

    const newUser = new User(
        {
            email: reqBody.email,
            password: bcrypt.hashSync(reqBody.password, 10)
        }
    )

    newUser.save().then(save => {
        return response.send(`${reqBody.email} is now registered!`);
    }).catch(error => {
        console.error(error);
        return response.status(500).send("Error encountered during registration!");
    });
}
module.exports.loginUser = (request, response) => {
    const reqBody = request.body;

    User.findOne({email : reqBody.email}).then(result => {
        if(result === null) {

            return response.send("Email does not exist. Register first before logging in!");
        }else{

            const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

            if(isPasswordCorrect){

                const token = auth.createAccessToken(result);

                return response.send({accessToken: token});

            }else{
                return response.send("You provided wrong password. Please try again!");
            }

        }
    })
};


module.exports.getUserWithOrders = async (req, res) => {
    try {
        const userId = req.params.userId; 

        const userWithOrders = await User.findById(userId).populate({
            path: 'orders',
            models: 'Cart',
            populate: {
                path: 'products.productId',
                models: 'Product' 
            }
        });

        res.status(200).json(userWithOrders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving user with orders');
    }
};