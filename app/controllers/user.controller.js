const db = require("../models");
const Post = db.post;
const Op = db.Sequelize.Op
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.createPost = (req, res) =>{
    Post.create({
      post_content: req.body.post_content,
      post_title: req.body.post_title,
      userId: req.userId
    })
    .then(post=>{
      res.status(200),
      res.json({message: "post was registered successfully!",
    post, });
        });
    }

    exports.editPost = (req, res) =>{
      console.log(req);
    Post.findOne({
      where:{
        id: req.body.id
      }
    }).then(post=>{
        post.update({
          post_content: req.body.post_content,
          post_title: req.body.post_title,
        })
        res.json({ message: "post was edited successfully!",
        post });
         });
      }

    exports.allAccess = (req, res) =>{
      Post.findAll().
      then(posts => {
         return res.status(200).send(posts.sort((a, b) => b.id - a.id))
      })
    }

    exports.getPost = (req, res) =>{
      Post.findOne({
        where : {
          id : req.params.id
        } 
      }).
      then(posts => {
        console.log(posts);
         if (posts === null){
          return res.sendStatus(404)
         } 
        else return res.status(200).send(posts)
      })
    }

    exports.getSomePost = (req, res) =>{
     const found =  Post.findAll({
        where : {
          id:{
            [Op.between] : [req.body.postsRange.id_b,req.body.postsRange.id_a ]
          }
          }
          
      }).
      then(posts => {
        return res.status(200).send(posts.sort((a, b) => b.id - a.id))
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    }

    exports.myBoard = (req, res) =>{
      const found = Post.findAll({
        where : {
          id:{
            [Op.between] : [req.body.myPosts.id_b,req.body.myPosts.id_a ]
          },
          userId : req.userId
        }
      })
      .then(posts => {
         return res.status(200).send(posts.sort((a, b) => b.id - a.id))
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    }

    exports.findMax = async (req, res) =>{
    const max_id = await Post.max('id')
        return res.status(200).send({maxid : max_id})
    }


  exports.deleteContent = async (req, res) =>{

  
    await Post.findOne({
      where : {
        id : req.body.delreq.id
      }
    }
    ).then(post=>{
         post.destroy({
       where : {
         id : req.body.delreq.id
       }
     })
     res.json({ 
       status: 200, 
       id: req.body.delreq.id,
       message: `Delete id: ${req.body.delreq.id} success` 
     })

    })
   
  }