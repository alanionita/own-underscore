const _ = {};
// Tasks
// 7. reject
// 8. uniq
// 9. map
// 10. contains

_.identity = function (args) {
    return args;
};

_.first = function (array, n) {
    if (n) {
        if (Array.isArray(array)) {
            return array.slice(0, n);
        }
    } else {
        if (Array.isArray(array)) {
            return array[0];
        }
    }
};

_.last = function (array, n) {
    if (n) {
        if (Array.isArray(array)) {
            return array.slice(-n);
        }
    } else {
        if (Array.isArray(array)) {
            return array.pop();
        }
    }
};

_.each = function (list, iteratee, context) {
    if (!context) {
        if (Array.isArray(list)) {
            for (let i = 0; i < list.length; i++) {
                iteratee(list[i], i, list);
            }
        } else if (typeof list === 'object') {
            for (let key in list) {
                iteratee(list[key], key, list);
            }
        }
    } else {
        if (Array.isArray(list)) {
            for (let i = 0; i < list.length; i++) {
                iteratee.call(context, list[i], i, list);
            }
        } else if (typeof list === 'object') {
            for (let key in list) {
                iteratee.call(context, list[key], key, list);
            }
        }
    }
    return list;
};

_.indexOf = function (array, target, isSorted) {
    if (!isSorted) {
        if (Array.isArray(array) && (target)) {
            let index;
            for (let i = 0; i < array.length; i++) {
                if (array[i] === target) {
                    index = i;
                } else {
                    index = -1;
                }
            }
            return index;
        }
    } else {
        return binaryIndexOf(array, target);
    }

    function binaryIndexOf(array, searchElement) {

        let minIndex = 0;
        let maxIndex = array.length - 1;
        let currentIndex;
        let currentElement;

        while (minIndex <= maxIndex) {
            currentIndex = (minIndex + maxIndex) / 2 | 0;
            currentElement = this[currentIndex];

            if (currentElement < searchElement) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > searchElement) {
                maxIndex = currentIndex - 1;
            }
            else {
                return currentIndex;
            }
        }

        return -1;
    }
};

_.filter = function (list, predicate) {
    if (Array.isArray(list) || typeof list === 'object') {
        let result = [];
        _.each(list, function (elem) {
            if (predicate(elem)) {
                result.push(elem);
            }
        });
        return result;
    }
};

if (typeof module !== 'undefined') {
    module.exports = _;
}