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
    // console.log(blogData);
    res.render('homepage', {
      blogData: blogData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ model: BlogUser }, { model: BlogComment }],
    });

    const blogDetails = blogData.get({ plain: true });

    console.log(blogDetails.blogcomments);
    const blogComments = blogDetails.blogcomments;
    const updatedBlogComments = [];
    for (let index = 0; index < blogComments.length; index++) {
      const blogComment = blogComments[index];
      const blogCommentData = await BlogComment.findByPk(blogComment.id, {
        include: [{ model: BlogUser }],
      });
      updatedBlogComments.push(blogCommentData.get({ plain: true }));
    }

    res.render('blog-comments', {
      blogDetails: blogDetails,
      updatedBlogComments: updatedBlogComments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new comment
router.post('/comment/', async (req, res) => {
  try {
    const dbUserData = await BlogComment.create({
      comment_description: req.body.comment,
      blog_id: req.body.blogId,
      user_id: req.session.user_id,
    });

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
