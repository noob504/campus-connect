const mongoose = require('mongoose');

// Define the profile schema
const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    passoutYear: {
        type: Number,
        default: null
    },
    alumni: {
        type: Boolean,
        default: false
    },
    regNo: {
        type: String,
        default: null
    },
    faculty: {
        type: Boolean,
        default: false
    },
    department: {
        type: String,
        default: null
    },
    designation: {
        type: String,
        default: null
    },
    profilePic: {
        key: {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: null
        }
    },
    bio: {
        type: String,
        default: null
    }
});

// Pre-save middleware
profileSchema.pre('save', function(next) {
    // Check if faculty flag is true
    if (this.faculty) {
        // Block updates to student fields
        this.passoutYear = null;
        this.alumni = false;
        this.regNo = null;
    }

    // Check if faculty flag is false
    if (!this.faculty) {
        // Block updates to teacher fields
        this.department = null;
    }

    next();
});

// Create the profile model
const ProfileModel = mongoose.model('profile', profileSchema);

module.exports = ProfileModel;
