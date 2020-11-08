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


  app.get(
    "/api/content/user",
    controller.allAccess
  );


  app.post(
    "/api/content/mine",
    authJwt.verifyToken,
    controller.myBoard
  );

  app.get(
    "/api/content/maxid",
    controller.findMax
  );


  app.get(
    "/api/content/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/content/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
