const router = require('express').Router();
const { BlogUser, Blog, BlogComment } = require('../../models');
const withAuth = require('../../utils/auth.js');

// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
router.get('/', withAuth, async (req, res) => {
  try {
    console.log('HI I AM IN DASHBOARD ROUTE ');
    const blogs = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    // console.log(blogs);

    //  // Serialize user data so templates can read it
    const blogData = blogs.map((blog) => blog.get({ plain: true }));
    // console.log(blogData);
    res.render('dashboard', {
      blogData: blogData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/createblog/', withAuth, async (req, res) => {
  try {
    console.log(
      '**********************************************/dashboard/createblog/',
    );
    res.render('create-blog', {
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500);
  }
});

router.post('/addblog/', withAuth, async (req, res) => {
  try {
    const dbUserData = await Blog.create({
      blog_title: req.body.title,
      blog_content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
