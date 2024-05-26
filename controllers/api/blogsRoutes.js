const router = require('express').Router();
const { BlogUser, Blog, BlogComment } = require('../../models');
const withAuth = require('../../utils/auth.js');

// Route: /api/blogs/
router.get('/', withAuth, async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      raw: true,
    });

    console.log(blogs);

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
