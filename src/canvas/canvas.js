'use strict';

import debounce from 'debounce';
import messageBus from '../message-bus.js';

const canvasEl = document.createElement('canvas');

let height = 800, 
    width = 600,
    contextType = '2d';

function sizeToContainer(containerEl){
  return function(){
    height = containerEl.offsetHeight;
    width = containerEl.offsetWidth;

    canvasEl.setAttribute('width', width);
    canvasEl.setAttribute('height', height);

    messageBus.emit('canvas.resize', width, height );
  }
}

export function setup(config = {}){

  var containerEl = config.containerEl ? config.containerEl : document.body
  contextType = config.contextType ? config.contextType : contextType;

  window.onresize = debounce( sizeToContainer(containerEl), 250 );
  window.onresize();

  containerEl.appendChild(canvasEl);
}


export var getContext = () => canvasEl.getContext(contextType);
export var canvasHeight = () => height;
export var canvasWidth = () => width;