'use strict';

import idGenerator from '../id-generator';
import Positionable from '../positionable';

const canvasIdGenerator = idGenerator('Canvas');

class Canvas extends Positionable {
  constructor(id = canvasIdGenerator.next().value){
    super();

    this.id = id;
    this.contextType = '2d';
    this.element = document.createElement( 'canvas' );
    this.context = this.element.getContext( this.contextType );

    this.height = 800;
    this.width = 600;

    this.x = 0;
    this.y = 0;

    this.element.style.position = 'absolute';

    this.reposition();
  }

  /**
   * Sets the width of the canvas then modifies the width attribute of the element
   * @param  {number} width 
   */
  set width(width){
    super.width = width;
    this.element.setAttribute( 'width', width );
  }

  get width(){
    return super.width;
  }

  /**
   * Sets the height of the canvas then modifies the height attribute of the element
   * @param  {number} height 
   */
  set height(height){
    super.height = height;
    this.element.setAttribute( 'height', height );
  }

  get height(){
    return super.height;
  }

  /**
   * resizes the canvas
   */
  resize(  ) {
    this.element.setAttribute( 'width', this.width );
    this.element.setAttribute( 'height', this.height );
  }

  /**
   * repositions the canvas
   */
  reposition( ){
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
  }
}

export default Canvas;