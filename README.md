# own-underscore

My own rendition of [underscore.js](http://underscorejs.org), using it's functionality as a design pattern and plain ES6 javascript to enable the same methods.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

#### node.js

node.js must be installed on your machine (any versions will work; v7.10.0 was used for this project)

```
$ node -v // v7.10.0
```

To install node follow this guide -  https://nodejs.org/en/download/package-manager/#osx

#### npm

npm is also required (any versions will work; v4.2.0 was used for this project)

```
$ npm -v // 4.2.0
```

To install npm follow this guide - https://docs.npmjs.com/getting-started/installing-node

### Installing

Create a new folder on your machine and clone / fork + clone the repo. 

Open terminal and navigate to the folder storing the code

Install all of the required packages using npm

```
$ npm i  
```
The functions are exported as methods on the _ object. This allows us to use it in the same way as underscore: _.each().

To get a good summary of what is available please run the test suite below.


## Running the tests

The test are built using Mocha, Chai, and Sinon

To run the tests, type the following command in your terminal

```
$ npm t
```

The tests give a good summary of all of the functions and what features they have.

### Testing patterns

The tests were integral to writing the functions since I used TDD to write the library. 

They follow this pattern:

```javascript
it('should give an example of the test blocks', () => {
    const input; // what goes into the function
    const actual; // what the function returns
    const expect; // what we would expect the function to return

    expect(actual).to.eql(expected); // will run the evaluation
});
```

The tests cover both synchronous functions and async functions. 

```javascript
// synchronous function 

_.identity = function (args) {
    return args;
};

// test

it('works with arrays, strings, and objects', function () {
        const input1 = {
            '0': 1,
            '1': 2,
            '2': 3
        };
        const input2 = [1, 2, 3];
        const input3 = '123';
        const actual1 = _.filter(input1, function (num) { return num % 2 === 0; });
        const actual2 = _.filter(input2, function (num) { return num % 2 === 0; });
        const actual3 = _.filter(input3, function (num) { return num % 2 === 0; });
        
        expect(actual1).to.be.eql([2]);
        expect(actual2).to.be.eql([2]);
        expect(actual3).to.be.eql(['2']);
    });
```

```javascript
// async function
_.throttle = function (fn, wait) {
    let canCall = true;
    return (...args) => {
        if (canCall === true) {
            fn.apply(null, args);
            canCall = false;
            setTimeout(() => {
                canCall = true;
            }, wait);
        }
    };
};

// test

it('calls the passed function once per waiting period', () => {
        const clock = sinon.useFakeTimers();
        _.throttle(spy, 100);

        clock.tick(1); // clock = 1

        expect(spy.callCount).to.eql(0);

        clock.tick(150); // clock = 151

        expect(spy.callCount).to.eql(0); // 1

        clock.tick(50); // clock = 201

        expect(spy.callCount).to.eql(0);
    });
```

The Sinon library was used for Async functions: I mainly used the clock and spy methods from Sinon.

## Built With

* [Mocha](https://mochajs.org) - Javascript test framework
* [Chai](http://chaijs.com/guide/) - Test assertion library
* [Sinon](http://sinonjs.org) - Test spies, stubs, and fakeClocks
* [Husky](https://github.com/typicode/husky) - Git hooks made easy, used to chain linting and tests before commits
* [ESLint](http://eslint.org) - Linting utility

## Authors

* **Alan Ionita** - https://github.com/alanionita

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* The underscore.js team for amazing documentation 🙌
