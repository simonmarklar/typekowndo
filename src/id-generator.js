'use strict';

/**
 * Returns Creaates a generator function that will generate a unique id
 * @param  {String} prefix - A Prefix for the unique Id
 * @return {Generator}      - a Generator that will give you the next unique id
 *
 * @example
 * <pre>
 * let uniqueObjectId = idGenerator('Object');
 * let id = uniqueObjectId.next().value;
 * // id === 'Object0'
 * id = uniqueObjectId.next().value;
 * // id === 'Object1'
 * </pre>
 */
var idGenerator = function(prefix=''){
  return (function*(){
    let index = 0;
    while(true){
      yield prefix + index++;
    }
  }());
}

export default idGenerator;