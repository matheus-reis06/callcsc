const router = require("express").Router();
const { createPost } = require("../controllers/post");
const multer = require("../middlewares/multer");

router.post("/create", multer.single("thumbnail"), createPost )


module.exports = router;