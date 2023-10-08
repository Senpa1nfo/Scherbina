const Router = require('express').Router;
const router = new Router();
const PostController = require('../controllers/post.controller');

router.get('/post', PostController.getAll);
router.get('/post/:path', PostController.getOne);
router.post('/post/:path/create', PostController.create);
router.patch('/post/:path/edit', PostController.edit);
router.delete('/post/:path/delete', PostController.delete);

module.exports = router;