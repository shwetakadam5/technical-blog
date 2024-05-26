const withAuth = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  if (!req.session.logged_in) {
    console.log('In withAuth Check.');
    res.redirect('/api/users/login');
  } else {
    next();
  }
};

module.exports = withAuth;
