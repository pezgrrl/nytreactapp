const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

router
  .route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);

router
  .route("/:id")
  .get(articlesController.findById)
  .post(articlesController.comment)
  .put(articlesController.update)
  .delete(articlesController.remove);

router.route("/comments/:id").delete(articlesController.removeComment);

module.exports = router;
