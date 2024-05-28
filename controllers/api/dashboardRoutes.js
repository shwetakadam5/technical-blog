const router = require('express').Router();
const { BlogUser, Blog, BlogComment } = require('../../models');
const withAuth = require('../../utils/auth.js');

// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
router.get('/', withAuth, async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    // Serialize user data so templates can read it
    const blogData = blogs.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogData: blogData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//When the user clicks on new post option in the dashboard
router.get('/createblog/', withAuth, async (req, res) => {
  try {
    res.render('create-blog', {
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500);
  }
});
//When the user clicks on the  blog title on the dashboard
router.get('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ model: BlogUser }, { model: BlogComment }],
    });
    const blogDetails = blogData.get({ plain: true });

    res.render('update-blog', { blogDetails });
  } catch (err) {
    res.status(500).json(err);
  }
});
// when the user submits the create new post
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

//when the user submits the update post
router.put('/updateblog/:id', withAuth, async (req, res) => {
  try {
    const updatedBlog = await Blog.update(
      {
        // All the fields you can update and the data attached to the request body.
        blog_title: req.body.title,
        blog_content: req.body.content,
      },
      {
        // Gets the blog based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      },
    );

    if (!updatedBlog[0]) {
      res.status(404).json({ message: 'No Blog found with that id!' });
      return;
    }
    res.status(200).json({
      message: `Blog ID : ${req.params.id} updated successfully!`,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// when the user submits the delete post
router.delete('/deleteblog/:id', withAuth, async (req, res) => {
  // delete a blog by its `id` value

  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with that id!' });
      return;
    }

    res.status(200).json({
      message: `BLog with ID : ${req.params.id} deleted successfully!`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
