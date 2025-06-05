const db = require('../../db');

const get_all_posts_admin = async (req, res) => {
  try {
    const unapprovedPosts = await new Promise((resolve, reject) => {
      db.all(
        `SELECT id, name, message, link, date, color, hasapproved, videoTitle, videoThumbnail
         FROM posts 
         WHERE hasapproved = 0
         ORDER BY date DESC`,
        [],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });

    if (!unapprovedPosts || unapprovedPosts.length === 0) {
      return res.status(404).json({ message: 'No unapproved posts found' });
    }

    const postData = unapprovedPosts.map(post => {
      return {
        id: post.id,
        name: post.name,
        message: post.message,
        hasapproved: Boolean(post.hasapproved), 
        link: post.link,
        date: post.date, 
        color: post.color, 
        videoTitle: post.videoTitle || null,
        videoThumbnail: post.videoThumbnail || null
      };
    });

    res.status(200).json(postData);
  } catch (error) {
    console.error('Error fetching unapproved posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = get_all_posts_admin;