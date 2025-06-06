const supabase = require('../../supabaseClient');
const xss = require('xss');
const axios = require('axios');

function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

async function getYouTubeVideoInfo(videoId) {
    try {
        const response = await axios.get(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        return {
            videoTitle: response.data.title,
            videoThumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        };
    } catch (error) {
        console.error('YouTube oEmbed API error:', error.message);
        return {
            videoTitle: null,
            videoThumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        };
    }
}

const add_post = async (req, res) => {
    const { name, message, link, color } = req.body;

    if (!name || !message || !color) {
        return res.status(400).json({ message: 'هەموو زانیاریەکان پڕبکەوە' });
    }

    if (typeof name !== 'string' || typeof message !== 'string' || typeof link !== 'string' || typeof color !== 'string') {
        return res.status(400).json({ message: 'Invalid input type' });
    }

    if (name.length > 20 || message.length > 190) {
        return res.status(400).json({ message: 'Input exceeds maximum length' });
    }

    const colors = [
        "#4d2d2d", "#3e5f3a", "#2766b5", "#3e29a6", "#c1612a",
        "#020006", "#d3cfd5", "#54502f", "#2b1a1a", "#2f4a2d",
        "#1f4a91", "#2f1a91", "#a34f1f", "#1a0004", "#c9c6cc",
        "#444127", "#5a3b3b", "#486b48", "#2b6cc2", "#4933c2",
        "#c96f2f", "#1a0a1f", "#f0ecf3", "#6c6834", "#3a1f1f",
        "#2f3d2f", "#1a2f6b", "#2f1a6b", "#f472b6", "#ec4899",
        "#db2777", "#c084fc", "#a855f7", "#9333ea", "#fb923c",
        "#f97316", "#ea580c", "#fde047", "#facc15", "#eab308"
    ];

    if (!colors.includes(color)) {
        return res.status(400).json({ message: 'Invalid color' });
    }

    const sanitizedName = xss(name.trim());
    const sanitizedMessage = xss(message.trim());

    let videoTitle = null;
    let videoThumbnail = null;

    if (link && link.includes('youtu')) {
        try {
            const videoId = extractYouTubeId(link);
            if (videoId) {
                const videoInfo = await getYouTubeVideoInfo(videoId);
                videoTitle = videoInfo.videoTitle;
                videoThumbnail = videoInfo.videoThumbnail;
            }
        } catch (error) {
            return res.status(500).json({ message: 'هەڵەیەک ڕوویدە لە ڤیدیۆی یوتیوبەکە تکایە هەوڵ  بدەوە' });
        }
    }

    const newPost = {
        name: sanitizedName,
        message: sanitizedMessage,
        link: link ? xss(link.trim()) : '',
        color: color.trim(),
        hasapproved: false,
        videoTitle,
        videoThumbnail
    };

    try {
        const { error } = await supabase.from('messeges').insert([newPost]);

        if (error) {
            console.error('Supabase insert error:', error.message);
            return res.status(500).json({ message: 'Failed to save post' });
        }

        res.status(201).json({
            message: 'Post added successfully'
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to save post' });
    }
};

module.exports = add_post;