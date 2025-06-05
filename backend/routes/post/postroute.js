const express = require('express');
const router = express.Router();
const add_post = require('../../controller/post/add_post');
const get_all_posts = require('../../controller/post/get_all_posts');
const get_specified_messege = require('../../controller/post/get_specified_messege');

router.get('/get_all_posts', get_all_posts);
router.get('/get_specified_messege', get_specified_messege);

router.post('/add_post', add_post);

module.exports = router;