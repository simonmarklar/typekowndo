'use strict';

export default {
  name: 'data-url-loader',

  predicate: function isDataURL(url){
    if ( typeof url !== 'string' ) return false;

    return url.indexOf('data:image') === 0;
  },

  loader: function loadDataURLImage(url){
    let i = new Image();
    i.src = url;
    return Promise.resolve(i);
  }
};