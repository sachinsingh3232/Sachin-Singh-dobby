const mongoose = require('mongoose')

const imageSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    { timestaps: true }
)

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;