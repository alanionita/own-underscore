const _ = {};
// Tasks
// 5. indexOf 
// 6. filter 
// 7. reject
// 8. uniq
// 9. map
// 10. contains

_.identity = function (args) {
    return args;
};

_.first = function (...theArgs) {
    if (theArgs[1]) {
        if (Array.isArray(theArgs[0])) {
            return theArgs[0].slice(0, theArgs[1]);
        }
    } else {
        if (Array.isArray(theArgs[0])) {
            return theArgs[0][0];
        }
    }
};

_.last = function (...theArgs) {
    if (theArgs[1]) {
        if (Array.isArray(theArgs[0])) {
            return theArgs[0].slice(-theArgs[1]);
        }
    } else {
        if (Array.isArray(theArgs[0])) {
            return theArgs[0].pop();
        }
    }
};

_.each = function (...theArgs) {
    let list = theArgs[0];
    let iteratee = theArgs[1];

    if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            iteratee(list[i], i, list);
        }
    } else if (typeof list === 'object') {
        for (let key in list) {
            iteratee(list[key], key, list);
        }
    }
    return list;
};

_.indexOf = function (...theArgs) {
    let array = theArgs[0];
    let value = theArgs[1];
    if (Array.isArray(array)) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return i;
            }
        }
    }
};

if (typeof module !== 'undefined') {
    module.exports = _;
}