const User = require('./User');
const Album = require('./Album');
const Comment = require('./Comment');

//create associations
User.hasMany(Album, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Album.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Comment.belongsTo(Album, {
    foreignKey: 'album_id'
});
  
Album.hasMany(Comment, {
    foreignKey: 'album_id'
});

module.exports = {User, Album, Comment};