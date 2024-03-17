const express = require('express')
const { AddImage, getImages, deleteImage } = require('../Controllers/imageController');

const router = express.Router();
router.post('/addImage', AddImage)
router.post('/getImages', getImages)
router.delete('/deleteImage/:id', deleteImage)
module.exports = router;