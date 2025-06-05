const express = require('express');
const router = express.Router();
const get_all_posts_admin = require('../../controller/admin/get_all_posts_admin');
const approve_message = require('../../controller/admin/approve_message');
const delete_message = require('../../controller/admin/delete_message');
const adminLogin = require('../../controller/admin/admin_auth');
const { authMiddleware } = require('../../middleware/authMiddleware');

router.post('/login', adminLogin);

router.get('/get_all_posts_admin', authMiddleware, get_all_posts_admin);
router.post('/approve_message/:id', authMiddleware, approve_message);
router.delete('/delete_message/:id', authMiddleware, delete_message);

module.exports = router;