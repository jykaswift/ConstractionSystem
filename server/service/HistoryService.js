const {
  UserHistory,
} = require("../models/models");

class HistoryService {
  async addHistory(id, request, count) {
    const userHistory = await UserHistory.create({
      request: request,
      count: count,
      user_id: id,
    });

    return { message: "История добавлена успешно" };
  }

  async getHistory(id, page, limit) {
    let offset = (page - 1) * limit;
    const userHistory = await UserHistory.findAndCountAll({
      where: {
        user_id: id,
      },
      order: [["updatedAt", "DESC"]],
      limit,
      offset,
    });

    return userHistory;
  }

  async deleteAllHistory(id) {
    const deletedHistory = await UserHistory.destroy({
      where: { user_id: id },
    });
    return deletedHistory;
  }

  async deleteCertainHistory(id, historyId) {
    const deletedHistory = await UserHistory.destroy({
      where: { user_id: id, history_id: historyId },
    });
    return deletedHistory;
  }

}

module.exports = new HistoryService();
