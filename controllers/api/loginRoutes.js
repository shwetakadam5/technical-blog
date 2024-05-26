const router = require('express').Router();
const { BlogUser } = require('../../models');

// Route : /api/users/login
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  console.log('In api/users/login : Get ');
  if (req.session.logged_in) {
    res.redirect('/api/blogs/');
    return;
  }

  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const userData = await BlogUser.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.logged_in = true;

    res.json({ user: userData, message: 'You are now logged in!' });
    // });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
