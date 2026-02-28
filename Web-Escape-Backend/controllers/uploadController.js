
export const uploadImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const imageUrl = req.file.path;

        return res.status(200).json({
            message: 'Image uploaded successfully',
            imageUrl,
        });
    } catch (error) {
        console.error('Image upload error:', error);
        return res.status(500).json({ error: 'Failed to upload image' });
    }
};


export const deleteImage = async (req, res) => {
    try {
        const { publicId } = req.body;
        if (!publicId) {
            return res.status(400).json({ error: 'publicId is required' });
        }

        const { cloudinary } = await import('../utils/cloudinary.js');
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== 'ok') {
            return res.status(400).json({ error: 'Failed to delete image', result });
        }

        return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Image delete error:', error);
        return res.status(500).json({ error: 'Server error during deletion' });
    }
};
