const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');


const PostModel = require('../models/post_model');
const ProfileModel = require('../models/profile_model');

const router = express.Router();


router.post('/login', async (req, res, next) => {
  console.log(req.body);
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error(info.message || 'An error occurred.');
        return res.status(401).json({ error: error.message });
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, 'TOP_SECRET', { expiresIn: '1d' });

        return res.json({
          token,
          expiresIn: 86400
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

const upload = require("../services/fileupload");
const singleUpload = upload.single("image");

router.post("/upload", function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }

    return res.status(200).json({
      success: true,
      imageUrl: req.file.location
    });
  });
});

router.post("/post", function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }

    // Create a new post
    const post = new PostModel({
      mediaUrl: req.file.location,
      type: ["image", "photo"],
      description: "This is a post description",
      postType: "public",
      userId: "1234567890"
    });
    // Save the post to the database
    post.save()
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'Post saved successfully'
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Failed to save post',
          error: err.message
        });
      });
  });
});

router.post('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    passport.authenticate()

    const userId = req.user._id; // Access the authenticated user's ID from req.user
    const updates = req.body;
    const options = { new: true }; // Return the updated document

    const updatedProfile = await ProfileModel.findOneAndUpdate({ user: userId }, updates, options);

    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const userId = req.user._id; // Access the authenticated user's ID from req.user

    const userProfile = await ProfileModel.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(userProfile);
  } catch (error) {
    console.error('Error retrieving profile:', error);
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

module.exports = router;
