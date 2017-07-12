exports.shuffler = (input) => {
    let i = 0,
        j = 0,
        temp = null;

    for (i = input.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = input[i];
        input[i] = input[j];
        input[j] = temp;
    }
    return input;
};

exports.returnObjectValues = (input) => {
    const tempList = [];
    let key;
    for (key in input) {
        tempList.push(input[key]);
    }
    return tempList;
};