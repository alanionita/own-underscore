const _ = {};

// Helpers 
const { shuffler, returnObjectValues } = require('./helpers');

// Functions
_.identity = function (args) {
    return args;
};

_.first = function (collection, n = null) {
    return n === null ? collection[0] : Object.entries(collection).slice(0, n).map(key => key[1]) || collection.slice(0, n);
};

_.last = function (collection, n = null) {
    if (collection instanceof Object && !Array.isArray(collection)) return undefined;
    return n === null ? collection.slice(-1, collection.length).toString() : collection.slice(-n);
};

_.each = function (list, iteratee, context) {
    if (Array.isArray(list) || typeof list === 'string') {
        for (let i = 0; i < list.length; i++) {
            iteratee.call(context || list, list[i], i, list);
        }
    } else if (typeof list === 'object') {
        for (let key in list) {
            iteratee.call(context || list, list[key], key, list);
        }
    }
    return list;
};

_.indexOf = function (collection, target, isSorted = null) {
    if (isSorted === null) {
        let result = -1;
        _.each(collection, (item, index) => {
            return item === target ? result = index : result;
        });
        return result;
    } else {
        return binaryIndexOf(collection, target);
    }

    function binaryIndexOf(array, searchElement) {
        let start = 0;
        let stop = array.length - 1;
        let guess;

        while (start <= stop) {
            guess = Math.floor((start + stop) / 2, 10);
            if (array[guess] === searchElement) {
                return guess;
            } else {
                if (array[guess] < searchElement) {
                    start = guess + 1;
                } else {
                    stop = guess - 1;
                }
            }
        }
        return -1;
    }
};

_.filter = function (list, predicate, context) {
    let result = [];
    const iteratee = function (elem) {
        if (predicate.call(context || list, elem)) {
            result.push(elem);
        }
    };
    _.each(list, iteratee);
    return result;
};

_.reject = function (list, predicate, context) {
    return _.filter(list, (item) => {
        return predicate.call(context || list, item) === false;
    });
};

_.uniq = function (array, isSorted, iteratee = null) {
    const result = [];
    let arrayValue;

    if (iteratee === null) {
        arrayValue = array;
    } else {
        arrayValue = _.filter(array, iteratee);
    }
    _.each(arrayValue, (item) => {
        if (result.indexOf(item) === -1) {
            result.push(item);
        }
    });
    return result;
};

_.map = function (list, iteratee, context) {
    const result = [];
    _.each(list, function (value, index) {
        result.push(iteratee.call(context, value, index, list));
    });
    return result;
};

_.contains = function (list, value, fromIndex = null) {
    return _.reduce(list, (acc, element, index) => {
        if (fromIndex === null) {
            element === value;
            acc = true;
        } else {
            if (index >= fromIndex) {
                element === value;
                acc = true;
            }
        }
        return acc;
    }, false);
};

_.pluck = function (collection, key) {
    return _.map(collection, function (element) {
        if (element.hasOwnProperty(key) === true) {
            return element[key];
        }
    });
};

_.every = function (collection, predicate, context) {
    for (let i = 0; i < collection.length; i++) {
        if (predicate.call(context || collection, collection[i]) === false) {
            return false;
        }
    }
    return true;
};

_.some = function (collection, predicate, context) {
    for (let i = 0; i < collection.length; i++) {
        if (predicate.call(context || collection, collection[i]) === true) {
            return true;
        }
    }
    return false;
};

_.extend = function (destination, ...sources) {
    _.each(sources, function (source) {
        _.each(source, function (value, key) {
            destination[key] = value;
        });
    });
    return destination;
};

_.defaults = function (object, ...defaults) {
    _.each(defaults, function (defaultObj) {
        _.each(defaultObj, function (value, key) {
            if (object[key] === undefined) {
                object[key] = value;
            }
        });
    });
    return object;
};

_.reduce = function (list, iteratee, memo) {
    let noMemo = memo === undefined;
    _.each(list, function (item) {
        if (noMemo === true) {
            memo = item;
            noMemo = false;
        } else {
            memo = iteratee(memo, item);
        }
    });
    return memo;
};

_.once = function (func) {
    let invoked = false;
    let result;

    const innerFunc = () => {
        if (invoked === false) {
            result = func();
            invoked = true;
        }
        return result;
    };

    return innerFunc;
};

_.shuffle = function (list) {
    if (list instanceof Array) {
        return shuffler(list);
    } else if (list instanceof Object) {
        return shuffler(returnObjectValues(list));
    }
};

_.invoke = function (list, method, ...args) {
    return _.map(list, function (elem) {
        if (elem[method]) {
            elem[method].apply(elem, args);
            return elem;
        } else {
            return elem[method];
        }
    });
};

_.delay = function (func, wait, ...args) {
    setTimeout(function () {
        func.apply(this, args);
    }, wait);
};

_.intersection = function (...args) {
    let result = [];
    _.each(args[0], function (arrayElem) {
        let isShared = false;
        for (let i = 1; i < args.length; i++) {
            _.each(args[i], function (check) {
                if (arrayElem === check) {
                    isShared = true;
                }
            });
        }

        if (isShared) {
            result.push(arrayElem);
        }
    });

    return result;
};

_.difference = function (...args) {
    let result = [];
    _.each(args[0], function (arrayElem) {
        let isUnique = true;
        for (let i = 1; i < args.length; i++) {
            _.each(args[i], function (check) {
                if (arrayElem === check) {
                    isUnique = false;
                }
            });
        }

        if (isUnique) {
            result.push(arrayElem);
        }
    });

    return result;
};

_.flatten = function (arr, shallow = false) {
    return shallow === false ? deepFlatten(arr) : shallowFlatten(arr);

    function deepFlatten(array) {
        return _.reduce(array, function (acc, element) {
            return acc.concat(Array.isArray(element) ? deepFlatten(element) : element);
        }, []);
    }

    function shallowFlatten(array) {
        return array.reduce(function (acc, element) {
            if (Array.isArray(element) === true) {
                return acc.concat(element);
            } else {
                acc.push(element);
            }
            return acc;
        }, []);
    }
};

_.sortedIndex = function (list, value) {
    var startIndex = 0;
    var stopIndex = list.length - 1;
    var index = (startIndex + stopIndex) >> 1;

    while (list[index] != value && startIndex < stopIndex) {
        if (value < list[index]) {
            stopIndex = index - 1;
        } else if (value > list[index]) {
            startIndex = index + 1;
        }

        return index = (startIndex + stopIndex) >> 1;
    }
};

_.zip = function (...args) {
    return Object.keys(args[0]).map(function (key) {
        return args.map(function (array) {
            return array[key];
        });
    });
};

_.sortBy = function (list, iteratee) {
    if (typeof iteratee === 'function') {
        return list.sort(
            function (a, b) {
                return iteratee(a) - iteratee(b);
            }
        );
    } else {
        return list.sort(
            function (a, b) {
                return a[iteratee] - b[iteratee];
            }
        );
    }
};

_.memoize = function (func) {
    const storage = {};
    return function () {
        const args = JSON.stringify(arguments);
        if (storage[args] !== true) {
            storage[args] = func.apply(this, arguments);
        }
        return storage[args];
    };
};

_.throttle = function (func, wait) {
    let canCall = true;
    return (...args) => {
        if (canCall === true) {
            func.apply(null, args);
            canCall = false;
            setTimeout(() => {
                canCall = true;
            }, wait);
        }
    };
};

if (typeof module !== 'undefined') {
    module.exports = _;
}