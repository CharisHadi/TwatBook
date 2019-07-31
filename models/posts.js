
module.exports = function(sequelize, DataTypes){

  // Creates a "Post" model that matches up with DB
var Post = sequelize.define("Post", {
  author: DataTypes.STRING,
  body: DataTypes.TEXT,
  created_at: DataTypes.DATE
});

// Makes the Post Model available for other files (will also create a table)
return Post;
}

