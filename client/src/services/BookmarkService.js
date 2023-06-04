import $api from "../http/axios";

export default class BookmarkService {

  static async addBookmark(data) {
    return $api.post(`/api/user/bookmark`, data);
  }

  static async getBookmarksInsideDoc(userId, docId) {
    return $api.get(`/api/user/bookmark/${userId}/${docId}`);
  }

  static async getBookmarksDocs(userId) {
    return $api.get(`/api/user/bookmark/${userId}`);
  }

  static async deleteBookmark(bookId) {
    return $api.delete(`/api/user/bookmark/${bookId}`);
  }

  static async deleteAllBookmarks(userId) {
    return $api.delete(`/api/user/bookmark`, {
      data: {
        userId
      }
    });
  }

  static getSelectionData(selection) {

    const content = selection.toString()
    let startElement = selection.baseNode.parentNode
    let endElement = selection.focusNode.parentNode
    let rowStart = startElement.id
    let rowEnd = endElement.id
    console.log(rowStart)
    console.log(rowEnd)
    let lastString = content.split("\n").pop()

    if (!rowStart) {

      rowStart = startElement.closest("p").id;
    }

    if (!rowEnd) {
      rowEnd = endElement.closest("p").id;
    }

    return {
      content,
      rowStart,
      rowEnd,
      lastString
    }

  }


}