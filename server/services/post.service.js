const PostModel = require('../models/post.model');

class PostService {
    async getAll() {
        return PostModel.find();
    }

    async getOne(path) {
        await PostModel.updateOne({ path }, {
            $inc: {view_count: 1}
        });

        return PostModel.findOne({ path });
    }

    async edit(path, image, image_alt, title, description, date) {
        return PostModel.findOneAndUpdate({ path }, { image, image_alt, title, description, date } , {
            new: true,
            upsert: true
        });
    }

    async create(path, image, image_alt, title, description, date) {
        const post = await PostModel.findOne({ path });
        if (post) {
            return 'Пост за заданою адресою вже існує!';
        }
        return PostModel.create({ path, image, image_alt, title, description, date });
    }

    async delete(path) {
        return PostModel.deleteOne({ path });
    }
}

module.exports = new PostService();