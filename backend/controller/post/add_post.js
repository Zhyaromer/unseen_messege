const fs = require('fs').promises;
const path = require('path');
const xss = require('xss');

const add_post = async (req, res) => {
    const { name, message, link , color } = req.body;

    if (!name || !message || !color) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (typeof name !== 'string' || typeof message !== 'string' || typeof link !== 'string' || typeof color !== 'string') {
        return res.status(400).json({ message: 'Invalid input type' });
    }

    if (name.length > 30 || message.length > 120) {
        return res.status(400).json({ message: 'Input exceeds maximum length' });
    }

    // const colors = [
    //     "#4d2d2d", "#3e5f3a", "#2766b5", "#3e29a6", "#c1612a",
    //     "#020006", "#d3cfd5", "#54502f", "#2b1a1a", "#2f4a2d",
    //     "#1f4a91", "#2f1a91", "#a34f1f", "#1a0004", "#c9c6cc",
    //     "#444127", "#5a3b3b", "#486b48", "#2b6cc2", "#4933c2",
    //     "#c96f2f", "#1a0a1f", "#f0ecf3", "#6c6834", "#3a1f1f",
    //     "#2f3d2f", "#1a2f6b", "#2f1a6b", "#f472b6", "#ec4899",
    //     "#db2777", "#c084fc", "#a855f7", "#9333ea", "#fb923c",
    //     "#f97316", "#ea580c", "#fde047", "#facc15", "#eab308"
    // ];

    // if (!colors.includes(color)) {
    //     return res.status(400).json({ message: 'Invalid color' });
    // }

    const sanitizedName = xss(name.trim());
    const sanitizedMessage = xss(message.trim());

    const newPost = {
        id: Date.now(),
        name: sanitizedName + Math.random().toString(36).substring(2, 15),
        message: sanitizedMessage,
        link: link ? xss(link.trim()) : '',
        date: new Date().toISOString(),
        color: color.trim(),
        hasapproved: false
    };

    console.log('New post data:', newPost);


}

module.exports = add_post