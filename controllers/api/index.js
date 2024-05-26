const router = require('express').Router();

const loginRoutes = require('./loginRoutes');
const blogsRoutes = require('./blogsRoutes');

router.use('/users', loginRoutes);
router.use('/blogs', blogsRoutes);

module.exports = router;
