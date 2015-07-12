'use strict';

import ActionAbortedError from 'typed-errors/ActionAbortedError.js';
import NotFoundError from 'typed-errors/NotFoundError.js';

export default {
  name: 'url-loader',
  
  predicate: function isURL(url){
    if ( typeof url !== 'string' ) return false;

    return /(\.jpg|\.jpeg|\.png)/i.test(url);
  },

  loader: function loadURLImage(url){
    return new Promise(function(resolve, reject){
      let i = new Image();
      i.addEventListener('load', () => resolve(i) );
      i.addEventListener('abort', () => reject(new ActionAbortedError('Could not load ' + url)));
      i.addEventListener('error', () => reject(new NotFoundError('Could not find ' + url)));
      i.src = url;
    });
  }
};