const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    path: { type: String, unique: true, required: true},
    image: { type: String, required: true },
    image_alt: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    view_count: { type: Number, default: 0},
    date: { type: Date, required: true },
})

module.exports = model('Post', PostSchema);