'use strict';

import vec2 from 'math/vec2.js';

class Sprite{
  constructor(id){
    this.id = id;
    this.scale = 1;
    this.postion = vec2.create(0, 0);

    this._width = 0;
    this._height = 0;
  }

  get image(){
    return this._image;
  }

  set image(img){
    this._image = img;
  }

  get width(){
    return this._width * this.scale;
  }

  set width(val){
    this._width = val;
  }

  get height(){
    return this._height * this.scale;
  }

  set height(val){
    this._height = val;
  }

  get x(){
    return this.position[0];
  }

  set x(val){
    this.position[0] = val;
  }

  get y(){
    return this.position[1];
  }

  set y(val){
    this.position[1] = val;
  }
}
