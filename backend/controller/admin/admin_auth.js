const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../middleware/authMiddleware');

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const filePath = path.join(__dirname, '../../admin.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const admins = JSON.parse(data);

    const admin = admins.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: admin.id,
        username: admin.username
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
    console.error('Error in admin login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = adminLogin;