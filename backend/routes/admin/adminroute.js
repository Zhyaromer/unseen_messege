const express = require('express');
const router = express.Router();
const get_all_posts_admin = require('../../controller/admin/get_all_posts_admin');
const approve_message = require('../../controller/admin/approve_message');
const delete_message = require('../../controller/admin/delete_message');

router.get('/get_all_posts_admin', get_all_posts_admin);

router.post('/approve_message/:id', approve_message);

router.delete('/delete_message/:id', delete_message);

module.exports = router;