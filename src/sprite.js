'use strict';

import Positionable from './positionable';
import idGenerator from './id-generator';

const spriteIdGenerator = idGenerator('Sprite');

class Sprite extends Positionable{
  constructor(id = spriteIdGenerator.next().value){
    super();

    this.id = id;
  }

  get image(){
    return this._image;
  }

  set image(img){
    this._image = img;
    return this;
  }
}

export default Sprite;