const Router = require("express");
const authController = require("../controllers/AuthController");
const userController = require("../controllers/UserController");
const historyController = require("../controllers/HistoryController");
const favoriteController = require("../controllers/FavoriteController");
const projectController = require("../controllers/ProjectController");
const bookmarkController = require("../controllers/BookmarkController");
const router = new Router();
const {
  registerValidator,
  changeDataValidator,
  changePasswordValidator,
} = require("../validations/auth");

// Нужен для проверки токена пользователя
const authMiddleware = require("../middleware/AuthMiddleware");

//Auth Routes
router.post("/registration", registerValidator, authController.registration);
router.post("/login", authController.login);
router.post("/google", authController.google);
router.post("/logout", authController.logout);
router.get("/activate/:link", authController.activate);
router.get("/refresh", authController.refresh);
router.post("/edit", authMiddleware, authController.edit);
router.post("/recover", authController.recover);

// Edit Profile Routes
router.get("/data/:id", authMiddleware, userController.getData);
router.patch("/data", changeDataValidator, authMiddleware, userController.changeData);
router.patch("/password", changePasswordValidator, authMiddleware, userController.changePassword);

// History Routes
router.post("/history", authMiddleware,  historyController.addHistory);
router.get("/history", authMiddleware, historyController.getHistory);
router.delete("/history/:id", authMiddleware, historyController.deleteAllHistory)
router.delete("/history/:id/:historyId", authMiddleware, historyController.deleteCertainHistory)

// Favorite Routes
router.post("/favorite", authMiddleware,  favoriteController.addFavorite);
router.get("/favorite",  authMiddleware, favoriteController.getFavorites);
router.get("/favorite/:id/:docId", authMiddleware,  favoriteController.isFavorite);
router.delete("/favorite/:id/:docId", authMiddleware, favoriteController.deleteFavorite);
router.delete("/favorite/:id",  authMiddleware, favoriteController.deleteAllFavorite);

// Project Routes
router.post("/project", authMiddleware,  projectController.addProject);
router.patch("/project", authMiddleware,  projectController.addDocument);
router.get("/project/:userId", authMiddleware, projectController.getAllProjectsName);
router.get("/project", authMiddleware, projectController.getProjectsOrDocuments);
router.delete("/project/:projectId/:docId", authMiddleware, projectController.deleteDocument);
router.delete("/project/:projectId", projectController.deleteProject);

// Bookmark Routes

router.post("/bookmark", authMiddleware, bookmarkController.addBookmark);
router.get("/bookmark/:userId/:docId", authMiddleware, bookmarkController.getBookmarksByDoc);
router.get("/bookmark/:userId", authMiddleware, bookmarkController.getUserDocs);
router.delete("/bookmark/:bookId",  bookmarkController.deleteBookmark);
router.delete("/bookmark", bookmarkController.deleteAllBookmarks);

module.exports = router;
