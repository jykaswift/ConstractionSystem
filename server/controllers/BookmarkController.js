const bookmarkService = require("../service/BoomarkService");

class BookmarkController {

  async addBookmark(req, res, next) {
    try {
      const { userId, docId, docName, name, content, rowStart, rowEnd, lastString } = req.body;
      const result = await bookmarkService.addBookmark(userId, docId, docName, name, content, rowStart, rowEnd, lastString);
      return res.status(200).json(result);
    } catch (e) {
      console.log(e)
      next(e);
    }

  }

  async getBookmarksByDoc(req, res, next) {
    try {
      const userId = req.params.userId;
      const docId = req.params.docId;
      const bookmarks = await bookmarkService.getBookmarksByDoc(userId, docId);
      return res.status(200).json(bookmarks);
    } catch (e) {
      console.log(e)
      next(e);
    }
  }

  async getUserDocs(req, res, next) {
    try {
      const userId = req.params.userId;
      const bookmarks = await bookmarkService.getUserDocs(userId);
      return res.status(200).json(bookmarks);
    } catch (e) {
      console.log(e)
      next(e);
    }
  }

  async deleteBookmark(req, res, next) {
    try {
      const bookId = req.params.bookId;
      let deleted = await bookmarkService.deleteBookmark(bookId);
      return res.json(deleted);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async deleteAllBookmarks(req, res, next) {
    try {
      const { userId } = req.body;
      let deleted = await bookmarkService.deleteAllBookmarks(userId);
      return res.json(deleted);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }






}

module.exports = new BookmarkController();
