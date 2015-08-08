'use strict';

import vec2 from 'math/vec2';

class Positionable{
  constructor(){
    this.scale = 1;
    this.position = vec2.create(0, 0);
    this.z = 0;

    this._width = 0;
    this._height = 0;
  }

  get width(){
    return this._width * this.scale;
  }

  set width(val){
    this._width = val;
    return this;
  }

  get height(){
    return this._height * this.scale;
  }

  set height(val){
    this._height = val;
    return this;
  }

  get x(){
    return this.position[0];
  }

  set x(val){
    this.position[0] = val;
    return this;
  }

  get y(){
    return this.position[1];
  }

  set y(val){
    this.position[1] = val;
    return this;
  }
}

export default Positionable;