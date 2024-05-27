const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogComment extends Model {}

BlogComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    blog_id: {
      //Foreign Key referencing the blog table id
      type: DataTypes.INTEGER,
      references: {
        model: 'blog',
        key: 'id',
      },
    },
    user_id: {
      //Foreign Key referencing the user table id
      type: DataTypes.INTEGER,
      references: {
        model: 'bloguser',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogcomment',
  },
);

module.exports = BlogComment;
