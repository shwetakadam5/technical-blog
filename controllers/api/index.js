const router = require('express').Router();

const loginRoutes = require('./loginRoutes');
const blogsRoutes = require('./blogsRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', loginRoutes);
router.use('/blogs', blogsRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
