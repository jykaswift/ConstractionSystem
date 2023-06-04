const Router = require("express");
const router = new Router();
const docController = require("../controllers/DocController");

router.get("/search", docController.getDocsBySearch);
router.get("/document", docController.getDocById);

module.exports = router;
