const PostService = require('../services/post.service');
const Uuid = require('uuid')
const fs = require("fs");

class PostController {
    async getAll(req, res, next) {
        try {
            const item = await PostService.getAll();
            return res.json(item);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const path = req.params.path;
            const item = await PostService.getOne(path);
            return res.json(item);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const path = req.params.path;
            const {img} = req.files;
            const {imageAlt, title, description} = req.body
            const imgName = Uuid.v4() + '.jpg';
            const imgPath = req.filePath + '\\' + imgName;
            img.mv(imgPath);
            const date = new Date();

            const item = await PostService.create(path, imgName, imageAlt, title, description, date);
            return res.json(item);
        } catch (error) {
            next(error);
        }
    }

    async edit(req, res, next) {
        try {
            const path = req.params.path;
            const {imageAlt, title, description} = req.body
            const date = new Date();
            const post = await PostService.getOne(path)
            let imgName = post.image;

            if (req.files) {
                fs.unlinkSync(req.filePath + '\\' + post.image)
                const {img} = req.files;
                imgName = Uuid.v4() + '.jpg';
                const imgPath = req.filePath + '\\' + imgName;
                img.mv(imgPath);
            }

            const item = await PostService.edit(path, imgName, imageAlt, title, description, date);
            return res.json(item);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const path = req.params.path;
            const post = await PostService.getOne(path)
            fs.unlinkSync(req.filePath + '\\' + post.image)

            const item = await PostService.delete(path);
            return res.json(item);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PostController();