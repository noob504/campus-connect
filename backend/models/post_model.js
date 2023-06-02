const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    mediaUrl: {
        type: String,
        required: true
    },
    type: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postType: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        unique: true,
        required: true,
        default: () => Math.random().toString(36).slice(2)
    },
    userId: {
        type: String,
        required: true
    }
});

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
