const router = require('express').Router();
const { BlogUser, Blog, BlogComment } = require('../../models');
const withAuth = require('../../utils/auth.js');

// Route: /api/blogs/
router.get('/', withAuth, async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: BlogUser }],
    });

    // console.log(blogs);

    //  // Serialize user data so templates can read it
    const blogData = blogs.map((blog) => blog.get({ plain: true }));
    console.log(blogData);
    res.render('homepage', {
      blogData: blogData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
