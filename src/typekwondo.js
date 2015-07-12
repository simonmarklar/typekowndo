'use strict';

import ImageLoader from './image-loader/image-loader.js';
import { setup as setupCanvas, getContext } from './canvas/canvas.js';

let imageLoader = new ImageLoader();

setupCanvas();


import messageBus from './message-bus.js';
let ctx = getContext('2d');

messageBus.bind('canvas.resize', function(){
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(10, 10, 55, 50);
});
