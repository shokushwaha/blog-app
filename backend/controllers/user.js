const userModel = require('../models/usermodel')
const bcrypt = require('bcrypt')
const { createToken } = require('../middleware/jwt')
// register a user
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
        res.status(400).send({ status: "failed", message: error.message });
    }

}

// login 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        res.status(400).send({ status: "failed", message: "Fill all the credentials" });

    try {
        const user = await userModel.findOne({ email });
        if (!user)
            res.status(400).send({ error: "User Doesn't Exist" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            res.status(400).send({ status: "failed", error: "Wrong Username and Password Combination!" });
        const accessToken = createToken(user);

        res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true,
        });

        res.status(400).send({ status: "success", message: "LOGGED IN" });

    } catch (error) {

    }
}
module.exports = { registerUser, loginUser }