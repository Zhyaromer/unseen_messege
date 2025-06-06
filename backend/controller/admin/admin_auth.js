const supabase = require('../../supabaseClient');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../middleware/authMiddleware');

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { data: admin, error } = await supabase
      .from('users')
      .select('id, name, password')
      .eq('name', username)
      .eq('password', password) 
      .limit(1)
      .single();

    if (error || !admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: admin.id,
        username: admin.name
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = adminLogin;