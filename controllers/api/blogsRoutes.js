const router = require('express').Router();
const { BlogUser, Blog, BlogComment } = require('../../models');
const withAuth = require('../../utils/auth.js');

// Route: /api/blogs/ (Retrieves all the blogs : HOME PAGE)
// WHEN I click on the homepage option in the navigation
// THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
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

// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
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
// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

router.post('/comment/', withAuth, async (req, res) => {
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
