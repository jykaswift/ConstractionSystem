const { UserAccount, Document, UserDocument } = require("../models/models");
const ApiError = require("../error/ApiError");

class FavoriteService {
  async addFavorite(id, elasticId, name) {
    const user = await UserAccount.findOne({
      where: {
        user_id: id,
      },
    });


    if (!user) {
      throw ApiError.badRequest("Пользователь не найден");
    }

    const document = await Document.findOrCreate({
      where: {
        elastic_id: elasticId,
        doc_name: name,
      },
    });

    await document[0].addUserAccount(user, { through: UserDocument });
  }

  async getFavorites(userId, page, limit) {
    let offset = (page - 1) * limit;
    const userHistory = await UserAccount.findAndCountAll({
      where: {
        user_id: userId,
      },
      attributes: [],
      limit: limit,
      subQuery: false,
      offset,
      include: [
        {
          model: Document,
        },
      ],

      order: [[Document, "createdAt", "desc"]],
    });
    return userHistory;
  }

  async isFavorite(userId, documentId) {
    const user = await UserAccount.findOne({
      where: {
        user_id: userId,
      },
    });

    const document = await Document.findOne({
      where: {
        elastic_id: documentId,
      },
    });

    if (!document) {
      return false;
    }

    const isFavorite = await document.hasUserAccount(user);

    return isFavorite;
  }

  async deleteFavorite(userId, documentId) {
    const user = await UserAccount.findOne({
      where: {
        user_id: userId,
      },
    });

    const document = await Document.findOne({
      where: {
        elastic_id: documentId,
      },
    });

    const removed = await user.removeDocument(document);

    return removed;
  }

  async deleteAllFavorite(userId) {
    const removed = await UserDocument.destroy({
      where: { user_id: userId },
    });

    return removed;
  }
}

module.exports = new FavoriteService();
