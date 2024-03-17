const User = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Register = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase();
        let user = await User.findOne({ email })
        if (user) return res.status(409).json("user already exist !");
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        await User.create({
            email: email,
            password: hash
        })
        res.status(200).json("Registered Successfully");

    } catch (e) {
        console.log(e)
    }
}
const Login = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase();
        let user = await User.findOne({ email });
        if (!user) return res.status(404).json("Wrong username or password !");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password")

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
        const {password, ...other} = user;

        res.status(200).json({ other: other, token })
    } catch (e) {
        console.log(e)
    }
}
module.exports = { Register, Login }