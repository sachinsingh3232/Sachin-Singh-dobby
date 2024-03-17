const Image = require('../Models/imageModel')
const jwt = require("jsonwebtoken");
const User = require('../Models/userModel');

const getImages = async (req, res) => {
    try {
        const token = req.header("authorization");
        if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
        let user;
        try {
            user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        }
        catch (err) {
            console.log(err)
            return res.status(401).json({ status: false, msg: "Invalid token" });
        }
        const regex = new RegExp(req.body.search, 'i');

        const data = await Image.find({ userId: user.id, name: { $regex: regex } });
        //.sort({ date: -1 })
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
    }
}
const AddImage = async (req, res) => {
    const token = req.header("authorization");
    if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
    let user;
    try {
        user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({ status: false, msg: "Invalid token" });
    }
    try {
        const values = {
            userId: user.id,
            name: req.body.name,
            url: req.body.url
        }
        await Image.create(values);
        return res.status(200).json("Image has been created")
    }
    catch (err) {
        return res.status(401).json({ status: false, msg: "Invalid token" });
    }
}
const deleteImage = async (req, res) => {
    // console.log("req.params.id")
    const token = req.header("authorization");
    if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
    let user;
    try {
        user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (err) {
        // console.log(err)
        return res.status(401).json({ status: false, msg: "Invalid token" });
    }
    try {
        const image = await Image.findOne({ _id: req.params.id });
        if (!image) {
            return res.status(404).json("Image not Found!")
        }
        if (image.userId.toString() !== user.id.toString()) {
            return res.status(403).json("You can delete only your Image")
        }
        await Image.findByIdAndDelete({ _id: image._id });
        return res.status(200).json("Image has been deleted")
    }
    catch (err) {
        // console.log(err)
        return res.status(401).json({ status: false, msg: "Invalid token" });
    }
}
module.exports = { AddImage, deleteImage, getImages } 