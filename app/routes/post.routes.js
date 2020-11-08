const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/post/",
    [authJwt.verifyToken],
    controller.createPost
  );

  app.post(
    "/api/post/delete",
    [authJwt.verifyToken, authJwt.isSelf],
    controller.deleteContent
  );

  app.put(
    "/api/post/edit",
    [authJwt.verifyToken, authJwt.isSelf],
    controller.editPost
  );
  
  app.get(
    "/api/post/:id",
    controller.getPost
  );

  app.post(
    "/api/post/some",
    controller.getSomePost
  );
};
