export default class Finder {
  constructor(id) {
    this.targetNode = document.getElementById(id);
    this.resultTag = "MARK";
    this.dontHighlight = new RegExp("^(?:" + this.resultTag + "|SCRIPT|FORM|SPAN)$");
    this.matchWord = "";
    this.endWord = new RegExp("^[^\\wА-я]+|[^\\wА-я]+$", "g");
    this.breakWord = new RegExp("[^\\w'А-я-]+", "g");
    this.marks = [];
    this.marksCoords = [];
  }

  setRegex(input) {
    input = input.replace(this.endWord, "");
    input = input.replace(this.breakWord, "|");
    input = input.replace(/^\||\|$/g, "");
    if (input) {
      let re = "(" + input + ")";
      this.matchWord = new RegExp(re, "i");
      return this.matchWord;
    }
    return false;
  }

  highlight(node) {
    if (node === undefined || !node) return;
    if (!this.matchWord) return;
    if (this.dontHighlight.test(node.nodeName)) return;

    if (node.hasChildNodes()) {
      for (var i = 0; i < node.childNodes.length; i++)
        this.highlight(node.childNodes[i]);
    }
    if (node.nodeType === 3) {
      let nv, regs;
      if ((nv = node.nodeValue) && (regs = this.matchWord.exec(nv))) {
        const match = document.createElement(this.resultTag);
        match.appendChild(document.createTextNode(regs[0]));
        match.style.backgroundColor = "#ff6";
        match.style.color = "#000";
        const after = node.splitText(regs.index);
        after.nodeValue = after.nodeValue.substring(regs[0].length);
        node.parentNode.insertBefore(match, after);
        this.marks.push(match);
        this.marksCoords.push(match.getBoundingClientRect().top + document.documentElement.scrollTop - 100);
      }
    }
  }

  remove() {
    let arr = document.getElementsByTagName(this.resultTag),
      el;
    while (arr.length && (el = arr[0])) {
      const parent = el.parentNode;
      parent.replaceChild(el.firstChild, el);
      parent.normalize();
    }
  }

  apply(input) {
    this.remove();
    if (input === undefined || !(input = input.replace(/(^\s+|\s+$)/g, ""))) {
      return { marks: this.marks, marksCoords: this.marksCoords };
    }
    if (this.setRegex(input)) {
      this.highlight(this.targetNode);
    }
    return { marks: this.marks, marksCoords: this.marksCoords };
  }
}
