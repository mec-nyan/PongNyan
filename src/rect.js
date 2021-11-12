// Basic rect properties
class Rect {
  constructor(width, height, left, top) {
    this.initialState = [ width, height, left, top ];
    this.width = width;
    this.height = height;
    this.left = left;
    this.right = left + width;
    this.top = top;
    this.bottom = top + height;
    // corners
    this.topleft = [ this.top, this.left ];
    this.topright = [ this.top, this.right ];
    this.bottomleft = [ this.bottom, this.left ];
    this.bottomright = [ this.bottom, this.right ];
  }

  getRect() {
    return [this.left, this.top, this.right, this.bottom];
  }

  getNewPos(x, y) {
    return { left: x, top: y, right: x + this.width, bottom: y + this.height };
  }

  setLeft(left) { 
    this.left = left;
    this.right = left + this.width;
  }

  setRight(right) { 
    this.left = right - this.width;
    this.right = right;
  }

  setTop(top) { 
    this.top = top;
    this.bottom = top + this.height;
  }

  setBottom(bottom) { 
    this.top = bottom - this.height;
    this.bottom = bottom;
  }

  updatePos() { }

  reset() {
    [ this.width, this.height, this.left, this.top ] = this.initialState;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
  }

  collides(rect) {
    // check for collision between two rects

    if (this.left <= rect.right && this.right >= rect.left) {
      if (this.bottom >= rect.top && this.top < rect.top) return 'bottom';
      if (this.top <= rect.bottom && this.bottom > rect.bottom) return 'top';
    }

    else

    if (this.bottom >= rect.top && this.top <= rect.bottom) {
      if (this.right >= rect.left && this.left < rect.left) return 'right';
      if (this.left <= rect.right && this.right > rect.right) return 'left';
    }
    return 'none';
  }
}

