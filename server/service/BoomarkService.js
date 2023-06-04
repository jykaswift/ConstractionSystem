const {
  UserAccount,
  Document,
  Bookmark,
  UserBookmark, UserProject,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const { Sequelize } = require("sequelize");
const sequelize = require("../db");

class BookmarkService {
  async addBookmark(userId, docId, docName, name, content, rowStart, rowEnd, lastString) {
    const user = await UserAccount.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!user) {
      throw ApiError.badRequest("Пользователь не найден");
    }

    const document = await Document.findOrCreate({
      where: {
        elastic_id: docId,
        doc_name: docName,
      },
    });


    const bookmark = await Bookmark.create({
      content: content,
      name: name,
      lastString,
      document_id: document[0]["document_id"],
      rowStart: rowStart,
      rowEnd: rowEnd,
    });

    const book =  await user.addBookmark(bookmark, { through: UserBookmark });
    console.log(bookmark['bookmark_id'])
    return bookmark['bookmark_id']
  }

  async getBookmarksByDoc(userId, docId) {
    const user = await UserAccount.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!user) {
      throw ApiError.badRequest("Пользователь не найден");
    }

    const document = await Document.findOne({
      where: {
        elastic_id: docId,
      },
    });

    if (!document) {
      throw ApiError.badRequest("Документа не существует");
    }

    const bookmarks = await user.getBookmarks({
      where: {
        document_id: document["document_id"],
      },

      order: [["updatedAt", "DESC"]],
      joinTableAttributes: [],
    });

    return bookmarks;
  }

  async getUserDocs(userId) {
    const [results] = await sequelize.query(
      "SELECT DISTINCT(document.document_id),  document.doc_name, COUNT(bookmark.bookmark_id), elastic_id as \"docId\"" +
        "FROM user_account\n" +
        "INNER JOIN user_bookmark ON user_account.user_id = user_bookmark.user_id\n" +
        "INNER JOIN bookmark on user_bookmark.bookmark_id = bookmark.bookmark_id\n" +
        "INNER JOIN document on document.document_id = bookmark.document_id\n" +
        `WHERE user_account.user_id = ${userId}\n` +
        "GROUP BY document.document_id"
    );

    return results;
  }

  async deleteBookmark(bookId) {
    let deleted = await Bookmark.destroy({
      where: {
        bookmark_id: bookId,
      },
    });
    return deleted;
  }

  async deleteAllBookmarks(userId) {

    const user = await UserAccount.findOne({
      where: {
        user_id: userId
      }
    })

    const bookmarks = await user.getBookmarks({
      attributes: ['bookmark_id']
    })

    const ids = []

    bookmarks.forEach((obj) => {
      ids.push(obj["bookmark_id"])
    })

    const deleted = Bookmark.destroy({
      where: {
        bookmark_id: ids
      }
    })

    return deleted;
  }
}

module.exports = new BookmarkService();
