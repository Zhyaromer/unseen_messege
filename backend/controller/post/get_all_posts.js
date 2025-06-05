const fs = require('fs').promises;
const path = require('path');

const get_all_posts = async (req, res) => {
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

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = get_all_posts;
