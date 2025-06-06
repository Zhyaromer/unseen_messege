const supabase = require('../../supabaseClient');

const get_all_posts_admin = async (req, res) => {
  try {
    const { data: unapprovedPosts, error } = await supabase
      .from('messeges')
      .select('id, name, message, link, date, color, hasapproved, videoTitle, videoThumbnail')
      .eq('hasapproved', 0)
      .order('date', { ascending: false });

    if (error) {
      throw error;
    }

    if (!unapprovedPosts || unapprovedPosts.length === 0) {
      return res.status(404).json({ message: 'No unapproved posts found' });
    }

    const postData = unapprovedPosts.map(post => ({
      ...post,
      hasapproved: Boolean(post.hasapproved),
      videoTitle: post.videoTitle || null,
      videoThumbnail: post.videoThumbnail || null
    }));

    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = get_all_posts_admin;