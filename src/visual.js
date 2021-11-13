import Rect from './rect';

// A 'rect' within the DOM
class Visual extends Rect {
  constructor(width, height, left, top, className, positionAbsolute=false) {
    super(width, height, left, top);
    this.positionAbsolute = positionAbsolute;
    this.visual = document.createElement('div');
    this.setUp(className);
  }

  setUp(className) {
    this.visual.className = className;
    this.visual.style.width = this.width + 'px';
    this.visual.style.height = this.height + 'px';
    if (this.positionAbsolute) {
      this.visual.style.left = this.left + 'px';
      this.visual.style.top = this.top + 'px';
    }
  }

  moveX(x) {
    this.setLeft(x);
    this.visual.style.left = this.left + 'px';
  }

  moveY(y) {
    this.setTop(y);
    this.visual.style.top = this.top + 'px';
  }

  moveXY(x, y) {
    this.moveX(x);
    this.moveY(y);
  }

  updatePos() {
    this.visual.style.left = this.left + 'px';
    this.visual.style.top = this.top + 'px';
  }
}

export default Visual;
