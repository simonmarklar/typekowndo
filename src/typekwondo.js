'use strict';

import ImageLoader from './image-loader/image-loader';
import debounce from 'debounce';
import Canvas from './canvas/canvas';
import messageBus from './message-bus';
import Sprite from './sprite'

let imageLoader = new ImageLoader();
let background = new Sprite('background');
let backgroundCanvas = new Canvas('background');

document.body.appendChild(backgroundCanvas.element);

imageLoader.load( 'images/dojo_background.jpg', 'background' )
           .then( img => { background.image = img; renderBackground(); } )
           .then( onViewportResize );

function renderBackground(){
  backgroundCanvas.context.drawImage( background.image, background.x, background.y, backgroundCanvas.width, backgroundCanvas.height );
}

function onViewportResize(){
  backgroundCanvas.height = document.body.offsetHeight;
  backgroundCanvas.width = document.body.offsetWidth;
  renderBackground();
}

window.onresize = debounce( onViewportResize, 100 );
