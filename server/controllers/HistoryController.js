const historyService = require("../service/HistoryService");

class HistoryController {
  async addHistory(req, res, next) {
    try {
      const { id, request, count } = req.body;
      const result = await historyService.addHistory(id, request, count);

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getHistory(req, res, next) {
    try {
      const { id, page, limit } = req.query;
      const userHistory = await historyService.getHistory(id, page, limit);

      return res.json(userHistory);
    } catch (e) {
      next(e);
    }
  }

  async deleteAllHistory(req, res, next) {
    try {
      const userId = req.params.id;
      const userHistory = await historyService.deleteAllHistory(userId);

      return res.json(userHistory);
    } catch (e) {
      next(e);
    }
  }

  async deleteCertainHistory(req, res, next) {
    try {
      const userId = req.params.id;
      const historyId = req.params.historyId;
      const userHistory = await historyService.deleteCertainHistory(
        userId,
        historyId
      );

      return res.json(userHistory);
    } catch (e) {
      next(e);
    }
  }


}

module.exports = new HistoryController();
