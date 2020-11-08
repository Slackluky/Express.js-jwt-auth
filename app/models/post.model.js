module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
      post_content: {
        type: Sequelize.STRING
      },
      post_title:{
        type :Sequelize.STRING
      },
      userId:{
          type : Sequelize.INTEGER,
          allowNull: false,
          defaultValue: -1
      }
    });
  
    return Post;
  };