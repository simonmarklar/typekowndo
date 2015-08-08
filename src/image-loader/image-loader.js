'use strict';

import reduce from 'ramda/reduce.js';
import map from 'ramda/map.js';
import filter from 'ramda/filter.js';
import forEach from 'ramda/forEach.js';

import urlLoader from './url-loader.js';
import dataUrlLoader from './data-url-loader.js';
import idGenerator from '../id-generator';

const imageIdGenerator = idGenerator('Image');

const loaders = [
  urlLoader,
  dataUrlLoader
];


class ImageLoader{
  constructor(){
    this.images = new Map();
    this.queued = [];
  }

  /**
   * Gets the image fro mthe specified key
   * @param  {string} name The key used to store the image
   * @return {[type]}      [description]
   */
  get(name){
    return this.images.get( name );
  }

  /**
   * Adds an image to the map
   * @param {string} name  - a name that can be used with .get to get the image
   * @param {Imge Element} image A fully loaded DOM Image element.
   *
   * @returns {Image Element} The Image element being saved
   */
  add(name, image){
    this.images.set( name, image );

    return image;
  }

  addLoader(name, loader, predicate = () => false){
    loaders.push( { name: name, predicate: predicate, loader: loader} );
  }

  /**
   * Add an image to the queue to be loaded at a later time
   * @param  {string} src  - the url (or data url) to load
   * @param  {string} [name='Image0...n'] The key to store the image agaist in the ImageLoader.images Map
   *
   * @returns {string} The key that can be used to get the image.
   */
  queue(src, name = imageIdGenerator.next().value){
    let loader = this.__prepareForLoad( src, name );
    
    loader && this.queued.push( loader ); 

    return name;
  }

  /**
   * Load the queued images and empty the queue 
   * @return {Promise} Resolved with the results of all the queued images
   */
  processQueue(){
    return Promise.all( map( loader => loader.load(), this.queued ) )
                  .then( (result) => { this.emptyQueue(); return result; } )
                  .catch( err => console.log( 'ImageLoader:', err ) );
  }

  /**
   * Removes every queued image load
   * @return {[type]} [description]
   */
  emptyQueue(){
    this.queued.splice(0);
  }

  /**
   * Loads an image
   * @param  {[type]} src - a url (or data url) of the image to load
   * @param  {string} [name='Image0...n'] The key to store the image agaist in the ImageLoader.images Map
   * @return {Promise} Resolved with the Image element (with its name property set to _name_) or rejected with the loaders failure error
   */
  load(src, name = imageIdGenerator.next().value ){
    let loader = this.__prepareForLoad(src, name);
    return loader.load()
                 .then( img => { img.name = name; return img; }  )
                 .catch( err => console.log( 'ImageLoader:', err ) );
  }

  /**
   * stores all images found on the current document in the image loader
   * @param  {function} predicate - If you need to filter the image list
   * @param  {String} [nameProp='name']  - Property of the image element to use as a key in the ImageLoader.images Map. 
   *                                       If the value of the property is undefined, the id generator  will be used giving 'Image0..n'
   */
  fromDocument(predicate, nameProp = 'name'){
    let images = predicate ? fiter(predicate, document.images) : document.images;

    if ( !images.length) return;

    forEach(this.set(img[nameProp] || imageIdGenerator.next().value, img), images);
  }

  // "private" functions

  __prepareForLoad(src, name = imageIdGenerator.next().value){
    const test = (result, loaderDef) => {
      if ( result ) return result;
      
      let loader = {
        name: name, 
        load: () => loaderDef.loader(src).then( img => { this.add( name, img ); return img; })
      };
      
      return loaderDef.predicate(src) ? loader
                                      : result;
    };

    return reduce(test, undefined, loaders);
  }
}

export default ImageLoader;