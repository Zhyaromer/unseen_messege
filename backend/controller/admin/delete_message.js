const supabase = require('../../supabaseClient');
const xss = require('xss');

const delete_message = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  const sanitizedId = xss(id);

  try {
    const { data, error } = await supabase
      .from('messeges')
      .delete()
      .eq('id', sanitizedId)
      .select();

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({ message: 'نامەکە سرایەوە' });
  } catch (error) {
    if (error.code === 'PGRST116') { 
      return res.status(429).json({ message: 'System busy, please try again later' });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = delete_message;