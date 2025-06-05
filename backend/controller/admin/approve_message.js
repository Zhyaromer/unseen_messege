const fs = require('fs').promises;
const path = require('path');
const xss = require('xss');
const lockfile = require('proper-lockfile');

const approve_message = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    const sanitizedId = xss(id);
    const filePath = path.join(__dirname, '../../data.json');
    let release;

    try {
        release = await lockfile.lock(filePath, {
            retries: {
                retries: 5,
                factor: 2,
                minTimeout: 1000,
                maxTimeout: 5000
            }
        });
        
        const data = await fs.readFile(filePath, 'utf-8');
        const posts = JSON.parse(data);

        const postIndex = posts.findIndex(post => post.id == sanitizedId);
        if (postIndex === -1) {
            await release().catch(err => console.error('Error releasing lock:', err));
            return res.status(404).json({ message: 'Post not found' });
        }

        const updatedPost = {
            ...posts[postIndex],
            hasapproved: true
        };
        posts[postIndex] = updatedPost;

        await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf-8');
        
        await release().catch(err => console.error('Error releasing lock:', err));

        return res.status(200).json({ 
            message: 'Post approved successfully', 
            post: updatedPost 
        });
    } catch (error) {
        if (release) {
            try {
                await release().catch(err => console.error('Error releasing lock:', err));
            } catch (unlockError) {
                console.error('Error releasing lock:', unlockError);
            }
        }

        console.error('Error approving post:', error);
        
        if (error.code === 'ENOENT') {
            return res.status(404).json({ message: 'Data file not found' });
        }
        
        if (error.code === 'ELOCKED' || error.code === 'EBUSY') {
            return res.status(429).json({ message: 'System busy, please try again later' });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = approve_message;