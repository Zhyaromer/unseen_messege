const db = require('../../db'); 
const xss = require('xss');

const get_specified_message = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    const sanitizedId = xss(id);

    try {
        const post = await new Promise((resolve, reject) => {
            db.get(
                `SELECT id, name, message, link, date, color, hasapproved, videoTitle, videoThumbnail
                 FROM posts 
                 WHERE id = ? AND hasapproved = 1`,
                [sanitizedId],
                (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                }
            );
        });

        if (!post) {
            return res.status(404).json({ message: 'No approved post found with the specified ID' });
        }

        post.hasapproved = Boolean(post.hasapproved);

        console.log('Post retrieved:', post);

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = get_specified_message;