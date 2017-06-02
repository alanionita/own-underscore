const _ = {};
// Tasks
// 3. last 
// 4. each 
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

if (typeof module !== 'undefined') {
    module.exports = _;
}