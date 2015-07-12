'use strict';

import urlLoader from './url-loader.js';
import dataUrlLoader from './data-url-loader.js';
import reduce from 'ramda/reduce.js';
import map from 'ramda/map.js';
import invoke from 'ramda/invoke.js';
import filter from 'ramda/filter.js';
import forEach from 'ramda/forEach.js';


const loaders = [
  urlLoader,
  dataUrlLoader
];

const defaultImageName = (function(index){
  return () => "Image" + index++;
}(0))

class ImageLoader{
  constructor(){
    this.images = new Map();

    this.queued = [];
  }

  get(name){
    return this.images.get(name);
  }

  set(name, image){
    this.images.set(name, image);
  }

  addLoader(name, loader, predicate = () => false){
    loaders.push({ name: name, predicate: predicate, loader: loader});
  }

  prepareForLoad(name, meta){
    const test = (result, loaderDef) => {
      if ( result ) return result;
      
      let loader = { name: name, load: () => loaderDef.loader(meta).then(img => this.set( name, img)) };
      return loaderDef.predicate(meta) ? loader
                                       : result;
    };

    return reduce(test, undefined, loaders);
  }

  queue(name, meta){
    let loader = this.prepareForLoad(name, meta);
    
    loader && this.queued.push(loader); 
  }

  processQueue(){
    return Promise.all(map( loader => loader.load(), this.queued))
                  .then(this.emptyQueue.bind(this))
                  .catch(err => console.log('ImageLoader:', err) );
  }

  emptyQueue(){
    this.queued.splice(0);
  }

  load(name, meta){
    let loader = this.prepareForLoad(name, meta);
    return loader.load()
                 .catch(err => console.log('ImageLoader:', err) );
  }

  fromDocument(predicate, nameProp = 'name'){
    let images = predicate ? fiter(predicate, document.images) : document.images;

    if ( !images.length) return;

    forEach(this.set(img[nameProp] || defaultImageName(), img), images);
  }
}

export default ImageLoader;