const sequelize = require('../config/connection');
const { BlogUser, Blog, BlogComment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const blogCommentData = require('./blogCommentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await BlogUser.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  const blogComments = await BlogComment.bulkCreate(blogCommentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
