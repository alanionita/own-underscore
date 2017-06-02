const _ = {};
// Tasks
// 1. identity
// 2. first 
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

if (typeof module !== 'undefined') {
    module.exports = _;
}