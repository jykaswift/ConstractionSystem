const favoriteService = require("../service/FavoriteService");

class FavoriteController {
  async addFavorite(req, res, next) {
    try {
      const { id, elasticId, name } = req.body;
      await favoriteService.addFavorite(id, elasticId, name);
      return res.status(200).json();
    } catch (e) {
      next(e);
    }
  }

  async getFavorites(req, res, next) {
    try {
      const { id, page, limit } = req.query;
      const favorites = await favoriteService.getFavorites(id, page, limit);

      return res.json(favorites);
    } catch (e) {
      next(e);
    }
  }

  async isFavorite(req, res, next) {
    try {
      const userId = req.params.id;
      const docId = req.params.docId;
      const isFavorite = await favoriteService.isFavorite(userId, docId);

      return res.json(isFavorite);
    } catch (e) {
      next(e);
    }
  }

  async deleteFavorite(req, res, next) {
    try {
      const userId = req.params.id;
      const docId = req.params.docId;
      const removed = await favoriteService.deleteFavorite(userId, docId);

      return res.json(removed);
    } catch (e) {
      next(e);
    }
  }

  async deleteAllFavorite(req, res, next) {
    try {
      const userId = req.params.id;
      const removed = await favoriteService.deleteAllFavorite(userId);

      return res.json(removed);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FavoriteController();
