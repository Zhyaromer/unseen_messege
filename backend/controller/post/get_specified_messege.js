const supabase = require('../../supabaseClient');
const xss = require('xss');

const get_specified_message = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  const sanitizedId = xss(id);

  try {
    const { data: post, error } = await supabase
      .from('messeges')
      .select('id, name, message, link, date, color, hasapproved, videoTitle, videoThumbnail')
      .eq('id', sanitizedId)
      .eq('hasapproved', true)   
      .single();

    if (error || !post) {
      return res.status(404).json({ message: 'No approved post found with the specified ID' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = get_specified_message;