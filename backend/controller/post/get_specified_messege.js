const fs = require('fs').promises;
const path = require('path');
const xss = require('xss');

const get_specified_messege = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    const sanitizedId = xss(id);

    try {
        const filePath = path.join(__dirname, '../../data.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const posts = JSON.parse(data);

        if (!Array.isArray(posts)) {
            return res.status(500).json({ message: 'Data format error' });
        }

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }

        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        const approvedPost = posts.filter(post => post.hasapproved === true);

        if (approvedPost.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }

        const specifiedPosts = approvedPost.filter(post => post.id == sanitizedId);

        if (specifiedPosts.length === 0) {
            return res.status(404).json({ message: 'No posts found with the specified ID' });
        }

        res.status(200).json(specifiedPosts);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = get_specified_messege; 