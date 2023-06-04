const Router = require("express");
const router = new Router();

const docRouter = require("./docRouter");
const userRouter = require("./userRouter");

router.use("/doc", docRouter);
router.use("/user", userRouter);


module.exports = router;
