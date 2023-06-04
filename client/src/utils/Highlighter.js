export default class Highlighter {

  static highlight(rowStart, rowEnd, lastString) {
    for (let i = rowStart; i < rowEnd; i++) {
      const element = document.getElementById(i)
      element.classList.add("highlight");
    }
    this.highlightContent(rowEnd, lastString)
  }

  static highlightContent(id, content) {
    const element = document.getElementById(id);
    let text = element.innerHTML;
    const newText = text.replace(content, '<mark id="del" class="highlight">$&</mark>');
    element.innerHTML = newText;
  }

  static deleteHighlight() {
    const elements =  Array.from(document.getElementsByClassName('highlight'))
    elements.forEach((el) => {
      el.classList.remove('highlight')
    })
    // Удаление выделения в конце закладки
    const element = document.getElementById('del')
    if (!element) return
    element.replaceWith(...element.childNodes)
  }
}
