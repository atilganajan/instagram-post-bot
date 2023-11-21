const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageCountSchema = new Schema(
    {
        count: {
            type: Number
        },
        next_page: {
            type: String
        }

    }, {
    timestamps: true
});



const ImageCount = mongoose.model("image_counts",ImageCountSchema);

module.exports = ImageCount;
