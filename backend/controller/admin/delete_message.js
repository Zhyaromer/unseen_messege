const db = require('../../db');
const xss = require('xss');

const delete_message = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    const sanitizedId = xss(id);

    try {
        const result = await new Promise((resolve, reject) => {
            db.run(
                'DELETE FROM posts WHERE id = ?',
                [sanitizedId],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.changes);
                }
            );
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);

        if (error.code === 'SQLITE_BUSY') {
            return res.status(429).json({ message: 'System busy, please try again later' });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = delete_message;