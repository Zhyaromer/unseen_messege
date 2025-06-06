const supabase = require('../../supabaseClient');
const xss = require('xss');

const approve_message = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  const sanitizedId = xss(id);

  try {
    const { data: post, error: fetchError } = await supabase
      .from('messeges')
      .select('id, hasapproved')
      .eq('id', sanitizedId)
      .single();

    if (fetchError || !post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.hasapproved) {
      return res.status(400).json({ message: 'Post already approved' });
    }

    const { data, error: updateError } = await supabase
      .from('messeges')
      .update({ hasapproved: true })
      .eq('id', sanitizedId);

    if (updateError) {
      return res.status(500).json({ message: 'Failed to approve post' });
    }

    return res.status(200).json({ message: 'نامەکە وەرگیرا' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = approve_message;