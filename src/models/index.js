const sequelize = require('../config/db');
const Post = require('./Post');
const Comment = require('./Comment');

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = {
  sequelize,
  Post,
  Comment,
};
