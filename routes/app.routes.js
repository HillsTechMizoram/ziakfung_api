const categoryController = require("../controllers/categories.controller");
const productController = require("../controllers/posts.controller");
const express = require("express");
const router = express.Router();

router.post("/category", categoryController.create);
router.get("/category", categoryController.findAll);
router.get("/category/:id", categoryController.findOne);
router.put("/category/:id", categoryController.update);
router.delete("/category/:id", categoryController.delete);

router.post("/post", productController.create);
router.get("/post", productController.findAll);
router.get("/post/:id", productController.findOne);
router.put("/post/:id", productController.update);
router.delete("/post/:id", productController.delete);

module.exports = router;

