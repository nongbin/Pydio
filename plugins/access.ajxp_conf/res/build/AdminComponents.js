(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    iteratorSymbol = Symbol ? Symbol.iterator : undefined,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeKeys = overArg(Object.keys, Object),
    nativeRandom = Math.random;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.clamp` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.random` without support for returning
 * floating-point numbers.
 *
 * @private
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the random number.
 */
function baseRandom(lower, upper) {
  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Gets `n` random elements at unique keys from `collection` up to the
 * size of `collection`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @param {number} [n=1] The number of elements to sample.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the random elements.
 * @example
 *
 * _.sampleSize([1, 2, 3], 2);
 * // => [3, 1]
 *
 * _.sampleSize([1, 2, 3], 4);
 * // => [2, 3, 1]
 */
function sampleSize(collection, n, guard) {
  var index = -1,
      result = toArray(collection),
      length = result.length,
      lastIndex = length - 1;

  if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
    n = 1;
  } else {
    n = baseClamp(toInteger(n), 0, length);
  }
  while (++index < n) {
    var rand = baseRandom(index, lastIndex),
        value = result[rand];

    result[rand] = result[index];
    result[index] = value;
  }
  result.length = n;
  return result;
}

/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * _.shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 */
function shuffle(collection) {
  return sampleSize(collection, MAX_ARRAY_LENGTH);
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to an array.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * _.toArray({ 'a': 1, 'b': 2 });
 * // => [1, 2]
 *
 * _.toArray('abc');
 * // => ['a', 'b', 'c']
 *
 * _.toArray(1);
 * // => []
 *
 * _.toArray(null);
 * // => []
 */
function toArray(value) {
  if (!value) {
    return [];
  }
  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value) : copyArray(value);
  }
  if (iteratorSymbol && value[iteratorSymbol]) {
    return iteratorToArray(value[iteratorSymbol]());
  }
  var tag = getTag(value),
      func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

  return func(value);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = shuffle;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilMixins = require('../util/Mixins');

var _AdminLeftNav = require('./AdminLeftNav');

var _AdminLeftNav2 = _interopRequireDefault(_AdminLeftNav);

var React = require('react');

var _require = require('material-ui');

var AppBar = _require.AppBar;
var Paper = _require.Paper;

var PydioDataModel = require('pydio/model/data-model');

var _require$requireLib = require('pydio').requireLib('workspaces');

var UserWidget = _require$requireLib.UserWidget;

var AdminDashboard = React.createClass({
    displayName: 'AdminDashboard',

    mixins: [_utilMixins.MessagesProviderMixin, _utilMixins.PydioProviderMixin],

    propTypes: {
        pydio: React.PropTypes.instanceOf(Pydio).isRequired
    },

    getInitialState: function getInitialState() {
        var dm = this.props.pydio.getContextHolder();
        return {
            contextNode: dm.getContextNode(),
            selectedNodes: dm.getSelectedNodes(),
            contextStatus: dm.getContextNode().isLoaded(),
            openLeftNav: false
        };
    },

    dmChangesToState: function dmChangesToState() {
        var dm = this.props.pydio.getContextHolder();
        this.setState({
            contextNode: dm.getContextNode(),
            selectedNodes: dm.getSelectedNodes(),
            contextStatus: dm.getContextNode().isLoaded()
        });
        dm.getContextNode().observe("loaded", this.dmChangesToState);
        if (dm.getUniqueNode()) {
            dm.getUniqueNode().observe("loaded", this.dmChangesToState);
        }
    },

    openEditor: function openEditor(node) {
        this.openRightPane({
            COMPONENT: PydioComponents.ReactEditorOpener,
            PROPS: {
                node: node,
                registry: this.props.pydio.Registry,
                onRequestTabClose: this.closeRightPane,
                registerCloseCallback: this.registerRightPaneCloseCallback
            },
            CHILDREN: null
        });
    },

    openRightPane: function openRightPane(serializedComponent) {
        var _this = this;

        serializedComponent['PROPS']['registerCloseCallback'] = this.registerRightPaneCloseCallback;
        serializedComponent['PROPS']['closeEditorContainer'] = this.closeRightPane;
        // Do not open on another already opened
        if (this.state && this.state.rightPanel && this.state.rightPanelCloseCallback) {
            if (this.state.rightPanelCloseCallback() === false) {
                return;
            }
        }
        if (typeof serializedComponent.COMPONENT === 'string' || serializedComponent.COMPONENT instanceof String) {
            (function () {
                var _serializedComponent$COMPONENT$split = serializedComponent.COMPONENT.split('.');

                var _serializedComponent$COMPONENT$split2 = _slicedToArray(_serializedComponent$COMPONENT$split, 2);

                var namespace = _serializedComponent$COMPONENT$split2[0];
                var componentName = _serializedComponent$COMPONENT$split2[1];

                ResourcesManager.loadClassesAndApply([namespace], (function () {
                    if (window[namespace] && window[namespace][componentName]) {
                        var comp = window[namespace][componentName];
                        serializedComponent.COMPONENT = comp;
                        this.openRightPane(serializedComponent);
                    }
                }).bind(_this));
            })();
        } else {
            this.setState({ rightPanel: serializedComponent });
        }
    },

    registerRightPaneCloseCallback: function registerRightPaneCloseCallback(callback) {
        this.setState({ rightPanelCloseCallback: callback });
    },

    closeRightPane: function closeRightPane() {
        if (this.state.rightPanelCloseCallback && this.state.rightPanelCloseCallback() === false) {
            return false;
        }
        this.setState({ rightPanel: null, rightPanelCloseCallback: null });
        return true;
    },

    openLeftNav: function openLeftNav() {
        this.setState({ openLeftNav: true });
    },

    componentWillReceiveProps: function componentWillReceiveProps() {
        this.setState({ openLeftNav: false });
    },

    componentDidMount: function componentDidMount() {
        var dm = this.props.pydio.getContextHolder();
        dm.observe("context_changed", this.dmChangesToState);
        dm.observe("selection_changed", this.dmChangesToState);
        // Monkey Patch Open Current Selection In Editor
        var monkeyObject = this.props.pydio.UI;
        if (this.props.pydio.UI.__proto__) {
            monkeyObject = this.props.pydio.UI.__proto__;
        }
        monkeyObject.__originalOpenCurrentSelectionInEditor = monkeyObject.openCurrentSelectionInEditor;
        monkeyObject.openCurrentSelectionInEditor = (function (dataModelOrNode) {
            if (dataModelOrNode instanceof PydioDataModel) {
                this.openEditor(dataModelOrNode.getUniqueNode());
            } else {
                this.openEditor(dataModelOrNode);
            }
        }).bind(this);
        this._bmObserver = (function () {
            this.props.pydio.Controller.actions['delete']("bookmark");
        }).bind(this);
        this.props.pydio.observe("actions_loaded", this._bmObserver);
    },

    componentWillUnmount: function componentWillUnmount() {
        var dm = this.props.pydio.getContextHolder();
        dm.stopObserving("context_changed", this.dmChangesToState);
        dm.stopObserving("selection_changed", this.dmChangesToState);
        // Restore Monkey Patch
        var monkeyObject = this.props.pydio.UI;
        if (this.props.pydio.UI.__proto__) {
            monkeyObject = this.props.pydio.UI.__proto__;
        }
        monkeyObject.openCurrentSelectionInEditor = monkeyObject.__originalOpenCurrentSelectionInEditor;
        if (this._bmObserver) {
            this.props.pydio.stopObserving("actions_loaded", this._bmObserver);
        }
    },

    routeMasterPanel: function routeMasterPanel(node, selectedNode) {
        var path = node.getPath();
        if (!selectedNode) selectedNode = node;

        var dynamicComponent = undefined;
        if (node.getMetadata().get('component')) {
            dynamicComponent = node.getMetadata().get('component');
        } else {
            return React.createElement(
                'div',
                null,
                'No Component Found'
            );
        }
        var parts = dynamicComponent.split('.');
        var additionalProps = node.getMetadata().has('props') ? JSON.parse(node.getMetadata().get('props')) : {};
        return React.createElement(PydioReactUI.AsyncComponent, _extends({
            pydio: this.props.pydio,
            namespace: parts[0],
            componentName: parts[1],
            dataModel: this.props.pydio.getContextHolder(),
            rootNode: node,
            currentNode: selectedNode,
            openEditor: this.openEditor,
            openRightPane: this.openRightPane,
            closeRightPane: this.closeRightPane
        }, additionalProps));
    },

    backToHome: function backToHome() {
        this.props.pydio.triggerRepositoryChange("ajxp_home");
    },

    render: function render() {
        var dm = this.props.pydio.getContextHolder();
        var params = this.props.pydio.Parameters;
        var img = ResourcesManager.resolveImageSource('white_logo.png');
        var logo = React.createElement('img', {
            className: 'custom_logo_image linked',
            src: img,
            title: 'Back to Home',
            width: '',
            height: '',
            style: { height: 40, width: 'auto' },
            onClick: this.backToHome
        });
        var rPanelContent = undefined;
        if (this.state.rightPanel) {
            rPanelContent = React.createElement(this.state.rightPanel.COMPONENT, this.state.rightPanel.PROPS, this.state.rightPanel.CHILDREN);
        }
        var rightPanel = React.createElement(
            Paper,
            { zDepth: 2, className: "paper-editor layout-fill vertical-layout" + (this.state.rightPanel ? ' visible' : '') },
            rPanelContent
        );

        var appBarRight = undefined;
        if (this.props.iconElementRight) {
            appBarRight = this.props.iconElementRight;
        } else {
            var style = {
                color: 'white',
                fontSize: 20,
                display: 'flex',
                alignItems: 'center',
                height: 50
            };
            appBarRight = React.createElement(
                'div',
                { style: style },
                'Pydio Community Distribution',
                logo
            );
        }
        var userWidgetStyle = {
            height: 64,
            lineHeight: '16px',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center'
        };
        var title = React.createElement(UserWidget, { pydio: this.props.pydio, style: userWidgetStyle, hideActionBar: true, userTouchBackHome: true });

        return React.createElement(
            'div',
            { className: 'app-canvas' },
            React.createElement(_AdminLeftNav2['default'], {
                pydio: this.props.pydio,
                dataModel: dm,
                rootNode: dm.getRootNode(),
                contextNode: dm.getContextNode(),
                open: this.state.openLeftNav
            }),
            React.createElement(AppBar, {
                title: title,
                zDepth: 1,
                showMenuIconButton: true,
                onLeftIconButtonTouchTap: this.openLeftNav.bind(this),
                iconElementRight: appBarRight
            }),
            React.createElement(
                'div',
                { className: 'main-panel' },
                this.routeMasterPanel(dm.getContextNode(), dm.getUniqueNode())
            ),
            rightPanel
        );
    }
});

exports['default'] = AdminDashboard;
module.exports = exports['default'];

},{"../util/Mixins":9,"./AdminLeftNav":3,"material-ui":"material-ui","pydio":"pydio","pydio/model/data-model":"pydio/model/data-model","react":"react"}],3:[function(require,module,exports){
(function (global){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilNavigationHelper = require('../util/NavigationHelper');

var _utilNavigationHelper2 = _interopRequireDefault(_utilNavigationHelper);

var _utilMenuItemListener = require('../util/MenuItemListener');

var _utilMenuItemListener2 = _interopRequireDefault(_utilMenuItemListener);

var React = require('react');

var _require = require('material-ui');

var Menu = _require.Menu;

var _require2 = require('material-ui/styles');

var muiThemeable = _require2.muiThemeable;

var AjxpNode = require('pydio/model/node');
var PydioDataModel = require('pydio/model/data-model');

var AdminLeftNav = React.createClass({
    displayName: 'AdminLeftNav',

    propTypes: {
        rootNode: React.PropTypes.instanceOf(AjxpNode),
        contextNode: React.PropTypes.instanceOf(AjxpNode),
        dataModel: React.PropTypes.instanceOf(PydioDataModel)
    },

    componentDidMount: function componentDidMount() {
        this.refs.leftNav.close();
        _utilMenuItemListener2['default'].getInstance().observe("item_changed", (function () {
            this.forceUpdate();
        }).bind(this));
        global.setTimeout(this.checkForUpdates, 5000);
    },

    componentWillUnmount: function componentWillUnmount() {
        _utilMenuItemListener2['default'].getInstance().stopObserving("item_changed");
    },

    checkForUpdates: function checkForUpdates() {
        var _props = this.props;
        var pydio = _props.pydio;
        var rootNode = _props.rootNode;

        if (pydio.Controller.getActionByName("get_upgrade_path")) {
            PydioApi.getClient().request({ get_action: 'get_upgrade_path' }, (function (transp) {
                var response = transp.responseJSON;
                var fakeNode = new AjxpNode("/admin/action.updater");
                var child = fakeNode.findInArbo(rootNode);
                if (child) {
                    var _length = 0;
                    if (response && response.packages.length) {
                        _length = response.packages.length;
                    }
                    child.getMetadata().set('flag', _length);
                    _utilMenuItemListener2['default'].getInstance().notify("item_changed");
                }
            }).bind(this));
        }
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.open && nextProps.open !== this.refs.leftNav.state.open) {
            this.refs.leftNav.toggle();
        }
    },

    openMenu: function openMenu() {
        if (this.refs.leftNav.state.open) {
            this.cancelCloseBuffer();
        }
        this.refs.leftNav.toggle();
    },
    leftNavMouseOver: function leftNavMouseOver() {
        this.cancelCloseBuffer();
        if (!this.refs.leftNav.state.open) {
            this.refs.leftNav.toggle();
        }
    },
    leftNavMouseOut: function leftNavMouseOut() {
        this.bufferClose();
    },

    leftNavScroll: function leftNavScroll() {
        this.cancelCloseBuffer();
    },

    cancelCloseBuffer: function cancelCloseBuffer() {
        if (this.__closeTimer) {
            global.clearTimeout(this.__closeTimer);
        }
    },

    bufferClose: function bufferClose(time, callback) {
        this.cancelCloseBuffer();
        this.__closeTimer = global.setTimeout((function () {
            if (this.isMounted() && this.refs.leftNav) this.refs.leftNav.close();
        }).bind(this), 500);
    },

    onMenuChange: function onMenuChange(event, node) {
        this.props.dataModel.setSelectedNodes([]);
        this.props.dataModel.setContextNode(node);
    },

    render: function render() {
        var _props2 = this.props;
        var pydio = _props2.pydio;
        var rootNode = _props2.rootNode;
        var muiTheme = _props2.muiTheme;

        // Fix for ref problems on context node
        var contextNode = this.props.contextNode;

        this.props.rootNode.getChildren().forEach(function (child) {
            if (child.getPath() === contextNode.getPath()) {
                contextNode = child;
            } else {
                child.getChildren().forEach(function (grandChild) {
                    if (grandChild.getPath() === contextNode.getPath()) {
                        contextNode = grandChild;
                    }
                });
            }
        });

        var menuItems = _utilNavigationHelper2['default'].buildNavigationItems(pydio, rootNode, muiTheme.palette);

        var menuHeader = React.createElement(
            'div',
            { onMouseOver: this.leftNavMouseOver, onMouseOut: this.leftNavMouseOut, onScroll: this.leftNavScroll, className: 'left-nav-menu-scroller' },
            React.createElement(
                Menu,
                { onChange: this.onMenuChange, autoWidth: false, width: 256, listStyle: { display: 'block', maxWidth: 256 }, value: contextNode },
                menuItems
            )
        );
        return React.createElement(ReactMUI.LeftNav, { className: 'admin-main-nav', docked: true, isInitiallyOpen: false, menuItems: [], ref: 'leftNav', header: menuHeader });
    }

});

exports['default'] = AdminLeftNav = muiThemeable()(AdminLeftNav);
exports['default'] = AdminLeftNav;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util/MenuItemListener":8,"../util/NavigationHelper":10,"material-ui":"material-ui","material-ui/styles":"material-ui/styles","pydio/model/data-model":"pydio/model/data-model","pydio/model/node":"pydio/model/node","react":"react"}],4:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _utilMixins = require('../util/Mixins');

var GroupAdminDashboard = _react2['default'].createClass({
    displayName: 'GroupAdminDashboard',

    mixins: [_utilMixins.MessagesConsumerMixin],

    renderLink: function renderLink(node) {

        var label = _react2['default'].createElement(
            'span',
            null,
            _react2['default'].createElement('span', { className: node.iconClass + ' button-icon' }),
            ' ',
            node.label
        );
        return _react2['default'].createElement(
            'span',
            { style: { display: 'inline-block', margin: '0 5px' } },
            _react2['default'].createElement(_materialUi.RaisedButton, {
                key: node.path,
                secondary: true,
                onTouchTap: function () {
                    pydio.goTo(node.path);
                },
                label: label
            })
        );
    },

    render: function render() {

        var baseNodes = [{
            path: '/data/users',
            label: this.context.getMessage('249', ''),
            iconClass: 'icon-user'
        }, {
            path: '/data/repositories',
            label: this.context.getMessage('250', ''),
            iconClass: 'icon-hdd'
        }];
        return _react2['default'].createElement(
            'div',
            { style: { width: '100%', height: '100%' } },
            _react2['default'].createElement(
                ReactMUI.Paper,
                { zDepth: 1, style: { margin: 10 } },
                _react2['default'].createElement(
                    'div',
                    { style: { padding: 10 } },
                    this.context.getMessage('home.67')
                ),
                _react2['default'].createElement(
                    'div',
                    { style: { padding: 10, textAlign: 'center' } },
                    baseNodes.map((function (n) {
                        return this.renderLink(n);
                    }).bind(this)),
                    _react2['default'].createElement('br', null),
                    _react2['default'].createElement(_materialUi.FlatButton, {
                        label: this.context.getMessage('home.68'),
                        secondary: true,
                        onTouchTap: function () {
                            pydio.triggerRepositoryChange("ajxp_home");
                        }
                    })
                )
            )
        );
    }

});

exports['default'] = GroupAdminDashboard;
module.exports = exports['default'];

},{"../util/Mixins":9,"material-ui":"material-ui","react":"react"}],5:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utilMixins = require('../util/Mixins');

var React = require('react');

var _require = require('material-ui/styles');

var muiThemeable = _require.muiThemeable;

var _require2 = require('material-ui');

var Paper = _require2.Paper;
var Card = _require2.Card;
var CardTitle = _require2.CardTitle;
var CardMedia = _require2.CardMedia;
var CardActions = _require2.CardActions;
var CardHeader = _require2.CardHeader;
var CardText = _require2.CardText;
var FlatButton = _require2.FlatButton;
var List = _require2.List;
var ListItem = _require2.ListItem;
var Divider = _require2.Divider;
var IconButton = _require2.IconButton;
var FontIcon = _require2.FontIcon;

var shuffle = require('lodash.shuffle');

var Dashboard = React.createClass({
    displayName: 'Dashboard',

    mixins: [_utilMixins.MessagesConsumerMixin],

    getInitialState: function getInitialState() {
        return { kb: [] };
    },

    componentDidMount: function componentDidMount() {
        var _this = this;

        PydioApi.getClient().loadFile('plugins/access.ajxp_conf/res/i18n/kb.json', function (transport) {
            var data = transport.responseJSON;
            _this.setState({ kb: data });
        });
    },

    getOpenIcon: function getOpenIcon(link) {
        return React.createElement(IconButton, {
            iconClassName: 'mdi mdi-arrow-right',
            iconStyle: { color: 'rgba(0,0,0,.33)' },
            tooltip: 'Open in new window',
            tooltipPosition: 'bottom-left',
            onTouchTap: function () {
                window.open(link);
            }
        });
    },

    getDocButton: function getDocButton(icon, message, link) {
        return React.createElement(
            'div',
            { style: { width: 120 }, key: icon },
            React.createElement(FlatButton, {
                primary: true,
                style: { height: 110, lineHeight: '20px' },
                label: React.createElement(
                    'div',
                    null,
                    React.createElement('div', { style: { fontSize: 36 }, className: "mdi mdi-" + icon }),
                    React.createElement(
                        'div',
                        null,
                        message
                    )
                ),
                fullWidth: true,
                onTouchTap: function () {
                    window.open(link);
                }
            })
        );
    },

    welcomeClick: function welcomeClick(e) {
        if (e.target.getAttribute('data-path')) {
            var p = e.target.getAttribute('data-path');
            this.props.pydio.goTo(p);
        }
    },

    render: function render() {
        var _this2 = this;

        var horizontalFlex = { display: 'flex', width: '100%' };
        var verticalFlex = { display: 'flex', flexDirection: 'column', height: '100%' };
        var flexFill = { flex: 1 };
        var flexFillNo = { width: 120 };

        var paperStyle = { width: 500, marginLeft: 12, marginTop: 12 };
        var flexContainerStyle = _extends({}, verticalFlex);
        var _props$muiTheme$palette = this.props.muiTheme.palette;
        var primary1Color = _props$muiTheme$palette.primary1Color;
        var accent1Color = _props$muiTheme$palette.accent1Color;
        var accent2Color = _props$muiTheme$palette.accent2Color;

        var textLinkStyle = { cursor: 'pointer', color: accent1Color };

        var MEDIA_TEST_CARD = React.createElement(
            Card,
            { style: paperStyle },
            React.createElement(
                CardMedia,
                {
                    overlay: React.createElement(CardTitle, { title: 'Want to contribute?', subtitle: 'Pydio is Open Source and will always be' })
                },
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { style: { backgroundColor: '#b0bec5', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 } },
                        React.createElement('div', { className: 'mdi mdi-github-circle', style: { fontSize: 200, paddingBottom: 60 } })
                    )
                )
            ),
            React.createElement(
                CardActions,
                null,
                React.createElement(FlatButton, { label: 'Get Started' })
            )
        );

        var pydio = this.props.pydio;

        var message = function message(id) {
            return pydio.MessageHash['admin_dashboard.' + id];
        };
        var OPEN_IN_NEW_ICON = React.createElement(IconButton, { iconClassName: 'mdi mdi-arrow-right', iconStyle: { color: 'rgba(0,0,0,.33)' }, tooltip: 'Open in new window' });

        // ADMIN GUIDE BUTTONS
        var guidesButtons = [{ icon: 'clock-start', id: 'start', link: 'https://pydio.com/en/docs/v8/getting-started' }, { icon: 'network', id: 'ws', link: 'https://pydio.com/en/docs/v8/setup-workspaces-and-users' }, { icon: 'account-multiple', id: 'users', link: 'https://pydio.com/en/docs/v8/groups-admin-and-delegation' }, { icon: 'settings', id: 'parameters', link: 'https://pydio.com/en/docs/v8/pydio-advanced-configuration' }, { icon: 'professional-hexagon', id: 'advanced', link: 'https://pydio.com/en/docs/v8/pydio-advanced-configuration' }];

        // DOCS LIST
        var kbItems = [];
        shuffle(this.state.kb).forEach(function (object) {
            kbItems.push(React.createElement(ListItem, { key: object.title, primaryText: object.title, secondaryText: object.desc, rightIconButton: _this2.getOpenIcon(object.link), secondaryTextLines: 2, disabled: true }));
            kbItems.push(React.createElement(Divider, { key: object.title + '-divider' }));
        });
        // Remove last divider
        if (kbItems.length) kbItems.pop();

        return React.createElement(
            'div',
            { style: { height: '100%', overflow: 'auto', backgroundColor: '#ECEFF1' } },
            React.createElement(
                'div',
                { style: { display: 'flex', alignItems: 'top', flexWrap: 'wrap' } },
                React.createElement(
                    Card,
                    { style: paperStyle },
                    React.createElement(CardTitle, {
                        title: message('welc.title'),
                        subtitle: message('welc.subtitle')
                    }),
                    React.createElement(
                        CardText,
                        null,
                        React.createElement('style', { dangerouslySetInnerHTML: { __html: '.doc-link{color: ' + accent2Color + ';cursor: pointer;}' } }),
                        React.createElement('span', { dangerouslySetInnerHTML: { __html: message('welc.intro') }, onClick: this.welcomeClick })
                    ),
                    React.createElement(
                        CardText,
                        null,
                        message('welc.guide'),
                        React.createElement(
                            'div',
                            { style: _extends({}, horizontalFlex, { flexWrap: 'wrap', justifyContent: 'center', padding: '10px 20px 0' }) },
                            guidesButtons.map(function (object) {
                                return _this2.getDocButton(object.icon, message('welc.btn.' + object.id), object.link);
                            })
                        )
                    )
                ),
                React.createElement(
                    Card,
                    { style: paperStyle, containerStyle: flexContainerStyle },
                    React.createElement(CardTitle, {
                        title: message('kb.title'),
                        subtitle: message('kb.subtitle')
                    }),
                    React.createElement(
                        CardText,
                        null,
                        message('kb.intro')
                    ),
                    React.createElement(
                        List,
                        { style: { overflow: 'auto', flex: 1, maxHeight: 320 } },
                        kbItems
                    ),
                    React.createElement(Divider, null),
                    React.createElement(
                        CardActions,
                        { style: { textAlign: 'right' } },
                        React.createElement(FlatButton, { label: message('kb.btn.alldocs'), primary: true, onTouchTap: function () {
                                window.open('https://pydio.com/en/docs/');
                            } }),
                        React.createElement(FlatButton, { label: message('kb.btn.forum'), primary: true, onTouchTap: function () {
                                window.open('https://pydio.com/forum/f/');
                            } })
                    )
                ),
                React.createElement(
                    Card,
                    { style: paperStyle, containerStyle: flexContainerStyle },
                    React.createElement(CardTitle, { title: message('cont.title'), subtitle: message('cont.subtitle') }),
                    React.createElement(
                        CardText,
                        { style: flexFill },
                        React.createElement('div', { className: 'mdi mdi-github-circle', style: { fontSize: 60, display: 'inline-block', float: 'left', marginRight: 10, marginBottom: 10 } }),
                        message('cont.intro'),
                        React.createElement(
                            List,
                            null,
                            React.createElement(ListItem, { disabled: true, primaryText: message('cont.topic.translate'), rightIconButton: this.getOpenIcon('https://pydio.com/en/community/contribute/adding-translation-pydio') }),
                            React.createElement(Divider, null),
                            React.createElement(ListItem, { disabled: true, primaryText: message('cont.topic.report'), rightIconButton: this.getOpenIcon('https://pydio.com/forum/f/') }),
                            React.createElement(Divider, null),
                            React.createElement(ListItem, { disabled: true, primaryText: message('cont.topic.report.2'), rightIconButton: this.getOpenIcon('https://github.com/pydio/pydio-core') }),
                            React.createElement(Divider, null),
                            React.createElement(ListItem, { disabled: true, primaryText: message('cont.topic.pr'), rightIconButton: this.getOpenIcon('https://github.com/pydio/pydio-core') })
                        )
                    ),
                    React.createElement(Divider, null),
                    React.createElement(
                        CardActions,
                        { style: { textAlign: 'center' } },
                        React.createElement(FlatButton, { label: message('cont.btn.github'), primary: true, icon: React.createElement(FontIcon, { className: 'mdi mdi-github-box' }), onTouchTap: function () {
                                window.open('https://github.com/pydio/pydio-core');
                            } }),
                        React.createElement(FlatButton, { label: message('cont.btn.tw'), primary: true, icon: React.createElement(FontIcon, { className: 'mdi mdi-twitter-box' }), onTouchTap: function () {
                                window.open('https://twitter.com/Pydio');
                            } }),
                        React.createElement(FlatButton, { label: message('cont.btn.fb'), primary: true, icon: React.createElement(FontIcon, { className: 'mdi mdi-facebook-box' }), onTouchTap: function () {
                                window.open('https://facebook.com/Pydio/');
                            } })
                    )
                ),
                React.createElement(
                    Card,
                    { style: paperStyle },
                    React.createElement(
                        CardMedia,
                        {
                            overlay: React.createElement(CardTitle, { title: message('ent.title'), subtitle: message('ent.subtitle') })
                        },
                        React.createElement('div', { style: { height: 230, backgroundImage: 'url(plugins/access.ajxp_conf/res/images/dashboard.png)', backgroundSize: 'cover', borderRadius: 3 } })
                    ),
                    React.createElement(
                        List,
                        null,
                        React.createElement(ListItem, { leftIcon: React.createElement(FontIcon, { style: { color: accent2Color }, className: 'mdi mdi-certificate' }), primaryText: message('ent.features'), secondaryText: message('ent.features.legend') }),
                        React.createElement(Divider, null),
                        React.createElement(ListItem, { leftIcon: React.createElement(FontIcon, { style: { color: accent2Color }, className: 'mdi mdi-chart-areaspline' }), primaryText: message('ent.advanced'), secondaryText: message('ent.advanced.legend') }),
                        React.createElement(Divider, null),
                        React.createElement(ListItem, { leftIcon: React.createElement(FontIcon, { style: { color: accent2Color }, className: 'mdi mdi-message-alert' }), primaryText: message('ent.support'), secondaryText: message('ent.support.legend') })
                    ),
                    React.createElement(Divider, null),
                    React.createElement(
                        CardActions,
                        { style: { textAlign: 'right' } },
                        React.createElement(FlatButton, { label: message('ent.btn.more'), primary: true, onTouchTap: function () {
                                window.open('https://pydio.com/en/pydio-7-overview');
                            } }),
                        React.createElement(FlatButton, { label: message('ent.btn.contact'), primary: true, onTouchTap: function () {
                                window.open('https://pydio.com/en/get-pydio/contact');
                            } })
                    )
                )
            )
        );
    }

});

exports['default'] = Dashboard = muiThemeable()(Dashboard);
exports['default'] = Dashboard;
module.exports = exports['default'];

},{"../util/Mixins":9,"lodash.shuffle":1,"material-ui":"material-ui","material-ui/styles":"material-ui/styles","react":"react"}],6:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _boardAdminDashboard = require('./board/AdminDashboard');

var _boardAdminDashboard2 = _interopRequireDefault(_boardAdminDashboard);

var _boardSimpleDashboard = require('./board/SimpleDashboard');

var _boardSimpleDashboard2 = _interopRequireDefault(_boardSimpleDashboard);

var _boardGroupAdminDashboard = require('./board/GroupAdminDashboard');

var _boardGroupAdminDashboard2 = _interopRequireDefault(_boardGroupAdminDashboard);

var _utilMixins = require('./util/Mixins');

var _utilNavigationHelper = require('./util/NavigationHelper');

var _utilNavigationHelper2 = _interopRequireDefault(_utilNavigationHelper);

var _utilMenuItemListener = require('./util/MenuItemListener');

var _utilMenuItemListener2 = _interopRequireDefault(_utilMenuItemListener);

var _utilDNDActionsManager = require('./util/DNDActionsManager');

var _utilDNDActionsManager2 = _interopRequireDefault(_utilDNDActionsManager);

window.AdminComponents = {
  MessagesConsumerMixin: _utilMixins.MessagesConsumerMixin,
  PydioConsumerMixin: _utilMixins.PydioConsumerMixin,
  NavigationHelper: _utilNavigationHelper2['default'],
  MenuItemListener: _utilMenuItemListener2['default'],
  DNDActionsManager: _utilDNDActionsManager2['default'],

  AdminDashboard: _boardAdminDashboard2['default'],
  SimpleDashboard: _boardSimpleDashboard2['default'],
  GroupAdminDashboard: _boardGroupAdminDashboard2['default']
};

},{"./board/AdminDashboard":2,"./board/GroupAdminDashboard":4,"./board/SimpleDashboard":5,"./util/DNDActionsManager":7,"./util/MenuItemListener":8,"./util/Mixins":9,"./util/NavigationHelper":10}],7:[function(require,module,exports){
(function (global){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DNDActionsManager = (function () {
    function DNDActionsManager() {
        _classCallCheck(this, DNDActionsManager);
    }

    _createClass(DNDActionsManager, null, [{
        key: "canDropNodeOnNode",

        /**
         * Check if a source can be dropped on a target.
         * Throws an exception if not allowed
         *
         * @param source AjxpNode
         * @param target AjxpNode
         */
        value: function canDropNodeOnNode(source, target) {
            var sourceMime = source.getAjxpMime();
            var targetMime = target.getAjxpMime();
            if (sourceMime == "role" && source.getMetadata().get("role_id") == "AJXP_GRP_/") {
                throw new Error('Cannot drop this!');
            }
            var result;
            if (sourceMime == "role" && targetMime == "user_editable") {
                result = true;
            }
            if (sourceMime == "user_editable" && (targetMime == "group" || targetMime == "users_zone")) {
                result = true;
            }
            if (!result) {
                throw new Error('Cannot drop this!');
            }
        }

        /**
         * Apply a successful drop of Source on Target
         * @param source AjxpNode
         * @param target AjxpNode
         */
    }, {
        key: "dropNodeOnNode",
        value: function dropNodeOnNode(source, target) {
            //global.alert('Dropped ' + source.getPath() + ' on ' + target.getPath());
            var sourceMime = source.getAjxpMime();
            var targetMime = target.getAjxpMime();
            if (sourceMime == "user_editable" && (targetMime == "group" || targetMime == "users_zone")) {
                if (PathUtils.getDirname(source.getPath()) == target.getPath()) {
                    global.alert('Please drop user in a different group!');
                    return;
                }
                // update_user_group

                PydioApi.getClient().request({
                    get_action: 'user_update_group',
                    file: source.getPath().substr("/data/users".length),
                    group_path: targetMime == "users_zone" ? "/" : target.getPath().substr("/data/users".length)
                }, function () {
                    if (source.getParent()) {
                        source.getParent().reload();
                    }
                    target.reload();
                });
            } else if (sourceMime == "role" && targetMime == "user_editable") {
                PydioApi.getClient().request({
                    get_action: 'edit',
                    sub_action: 'user_add_role',
                    user_id: PathUtils.getBasename(target.getPath()),
                    role_id: PathUtils.getBasename(source.getPath())
                }, function () {
                    if (target.getParent()) {
                        target.getParent().reload();
                    }
                });
            }
        }
    }]);

    return DNDActionsManager;
})();

exports["default"] = DNDActionsManager;
module.exports = exports["default"];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItemListener = (function (_Observable) {
    _inherits(MenuItemListener, _Observable);

    function MenuItemListener() {
        _classCallCheck(this, MenuItemListener);

        _get(Object.getPrototypeOf(MenuItemListener.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(MenuItemListener, null, [{
        key: "getInstance",
        value: function getInstance() {
            if (!MenuItemListener.INSTANCE) {
                MenuItemListener.INSTANCE = new MenuItemListener();
            }
            return MenuItemListener.INSTANCE;
        }
    }]);

    return MenuItemListener;
})(Observable);

exports["default"] = MenuItemListener;
module.exports = exports["default"];

},{}],9:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var MessagesConsumerMixin = {
    contextTypes: {
        messages: React.PropTypes.object,
        getMessage: React.PropTypes.func
    }
};

var MessagesProviderMixin = {

    childContextTypes: {
        messages: React.PropTypes.object,
        getMessage: React.PropTypes.func
    },

    getChildContext: function getChildContext() {
        var messages = this.props.pydio.MessageHash;
        return {
            messages: messages,
            getMessage: function getMessage(messageId) {
                var namespace = arguments.length <= 1 || arguments[1] === undefined ? 'ajxp_admin' : arguments[1];

                try {
                    return messages[namespace + (namespace ? "." : "") + messageId] || messageId;
                } catch (e) {
                    return messageId;
                }
            }
        };
    }

};

var PydioConsumerMixin = {
    contextTypes: {
        pydio: React.PropTypes.instanceOf(Pydio)
    }
};

var PydioProviderMixin = {
    childContextTypes: {
        pydio: React.PropTypes.instanceOf(Pydio)
    },

    getChildContext: function getChildContext() {
        return {
            pydio: this.props.pydio
        };
    }
};

exports.MessagesConsumerMixin = MessagesConsumerMixin;
exports.MessagesProviderMixin = MessagesProviderMixin;
exports.PydioConsumerMixin = PydioConsumerMixin;
exports.PydioProviderMixin = PydioProviderMixin;

},{}],10:[function(require,module,exports){
/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _require = require('react');

var Component = _require.Component;

var _require2 = require('material-ui');

var MenuItem = _require2.MenuItem;
var Divider = _require2.Divider;
var Subheader = _require2.Subheader;
var FontIcon = _require2.FontIcon;

var DOMUtils = require('pydio/util/dom');

function renderItem(palette, node) {
    var text = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var icon = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    var iconStyle = {
        fontSize: 20,
        lineHeight: '20px',
        color: palette.primary1Color,
        padding: 2
    };
    var flagStyle = {
        display: 'inline',
        backgroundColor: palette.accent1Color,
        color: 'white',
        height: 22,
        borderRadius: 10,
        padding: '0 5px',
        marginLeft: 5
    };

    var label = text || node.getLabel();
    if (node.getMetadata().get('flag')) {
        label = React.createElement(
            'span',
            null,
            node.getLabel(),
            ' ',
            React.createElement(
                'span',
                { style: flagStyle },
                node.getMetadata().get('flag')
            ),
            ' '
        );
    }

    return React.createElement(MenuItem, {
        value: node,
        primaryText: label,
        rightIcon: React.createElement(FontIcon, { className: icon || node.getMetadata().get('icon_class'), style: iconStyle })
    });
}

var NavigationHelper = (function () {
    function NavigationHelper() {
        _classCallCheck(this, NavigationHelper);
    }

    _createClass(NavigationHelper, null, [{
        key: 'buildNavigationItems',
        value: function buildNavigationItems(pydio, rootNode, palette) {

            var items = [];

            if (rootNode.getMetadata().get('component')) {
                items.push(renderItem(palette, rootNode, pydio.MessageHash['ajxp_admin.menu.0']));
            }
            rootNode.getChildren().forEach(function (header) {
                if (!header.getChildren().size && header.getMetadata().get('component')) {
                    items.push(renderItem(palette, header));
                } else {
                    if (header.getLabel()) {
                        items.push(React.createElement(Divider, null));
                        items.push(React.createElement(
                            Subheader,
                            { style: { transition: DOMUtils.getBeziersTransition() }, className: 'hideable-subheader' },
                            header.getLabel()
                        ));
                    }
                    header.getChildren().forEach(function (child) {
                        if (!child.getLabel()) return;
                        items.push(renderItem(palette, child));
                    });
                }
            });

            return items;
        }
    }]);

    return NavigationHelper;
})();

exports['default'] = NavigationHelper;
module.exports = exports['default'];

},{"material-ui":"material-ui","pydio/util/dom":"pydio/util/dom","react":"react"}]},{},[6]);
