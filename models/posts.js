module.exports = function(sequelize, Datatypes){

  // Creates a "Post" model that matches up with DB
var Post = sequelize.define("Post", {
  author: Sequelize.STRING,
  body: Sequelize.TEXT,
  created_at: Sequelize.DATE
});

// Makes the Post Model available for other files (will also create a table)
return Post;
}