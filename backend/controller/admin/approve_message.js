const db = require('../../db'); 
const xss = require('xss');

const approve_message = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    const sanitizedId = xss(id);

    try {
        const postExists = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id FROM posts WHERE id = ?',
                [sanitizedId],
                (err, row) => {
                    if (err) return reject(err);
                    resolve(!!row);
                }
            );
        });

        if (!postExists) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const result = await new Promise((resolve, reject) => {
            db.run(
                'UPDATE posts SET hasapproved = 1 WHERE id = ?',
                [sanitizedId],
                function(err) {
                    if (err) return reject(err);
                    resolve(this.changes); 
                }
            );
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Post not found or already approved' });
        }

        const updatedPost = await new Promise((resolve, reject) => {
            db.get(
                `SELECT id, name, message, link, date, color, hasapproved, videoTitle, videoThumbnail
                 FROM posts WHERE id = ?`,
                [sanitizedId],
                (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                }
            );
        });

        updatedPost.hasapproved = Boolean(updatedPost.hasapproved);

        return res.status(200).json({ 
            message: 'نامەکە وەرگیرا', 
            post: updatedPost 
        });

    } catch (error) {
        if (error.code === 'SQLITE_BUSY') {
            return res.status(429).json({ message: 'System busy, please try again later' });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = approve_message;