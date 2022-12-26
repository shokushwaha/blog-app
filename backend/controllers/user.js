const userModel = require('../models/usermodel')
const bcrypt = require('bcrypt')
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        res.status(400).send({ status: "failed", message: "Fill all the credentials" });
    try {
        const alreadyExist = await userModel.findOne({ email });

        if (alreadyExist) {
            res.status(400).send({ status: "failed", message: "User already exists" });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({
                name: name,
                email: email,
                password: hashedPassword
            });
            await newUser.save();
            res.status(201).send({ status: "success", message: "Registered successfully" });
        }
    } catch (error) {
        console.log(error);
    }

}


module.exports = { registerUser }