const router = require("express").Router();
const { createPost } = require("../controllers/post");
const multer = require("../middlewares/multer");
const { postValidator,validate } = require("../middlewares/postValidator");

router.post("/create", multer.single("thumbnail"), postValidator, validate, createPost )


module.exports = router;