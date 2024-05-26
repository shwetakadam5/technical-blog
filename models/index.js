const BlogUser = require('./BlogUser');
const Blog = require('./Blog');
const BlogComment = require('./BlogComment');

// Creates a relationship between User and Blog model, with the User having a "has many" relationship with Blog model.
BlogUser.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Creates a relationship between User and Blog model, with a "belongs to" relationship of the Blog to the User.
Blog.belongsTo(BlogUser, {
  foreignKey: 'user_id',
});

// Creates a relationship between Blog and Comment model, with the Blog having a "has many" relationship with Comment model.
Blog.hasMany(BlogComment, {
  foreignKey: 'blog_id',
  onDelete: 'SET NULL',
});

// Creates a relationship between Comment and Blog model, with a "belongs to" relationship of the Blog to the Comment.
BlogComment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

module.exports = { BlogUser, Blog, BlogComment };
