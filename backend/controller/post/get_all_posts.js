const supabase = require('../../supabaseClient');

const get_all_posts = async (req, res) => {
  try {
    const { data: approvedPosts, error } = await supabase
      .from('messeges')
      .select('id, name, message, link, date, color, hasapproved, videoTitle, videoThumbnail')
      .eq('hasapproved', true)
      .order('date', { ascending: false });

      console.log(approvedPosts);

    if (error) throw error;

    if (!approvedPosts || approvedPosts.length === 0) {
      return res.status(404).json({ message: 'No approved posts found' });
    }

    res.status(200).json(approvedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = get_all_posts;