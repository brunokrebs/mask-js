[![mask-js build status][travis-image]][travis-url]
[![Code Coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![NPM version][npm-image]][npm-url]

## mask-js

A library that exposes functions to masks strings. To use it, it's pretty simple. First, you need to install it:

```bash
npm i mask-js
```

Then, you can import its functions and use at will:

```javascript
import {maskJs, maskCurrency} from 'mask-js';

console.log(maskJs('(99) 99', '0123456') === '(01) 23'); // true
console.log(maskCurrency('12345') === 123.45); // true
```

The library also supports optional digits. For example:

```javascript
import maskJs from 'mask-js';

console.log(maskJs('(99) 9999?9', '0123456') === '(01) 23456'); // true
console.log(maskJs('(99) 999-9?9', '012345') === '(01) 234-5'); // true
console.log(maskJs('(99) 99?9-9?9', '012345') === '(01) 23-45'); // true
console.log(maskJs('(99) 9999?9-9999', '0123456789') === '(01) 2345-6789'); // true
console.log(maskJs('(99) 9999?9-9999', '01234567890') === '(01) 23456-7890'); // true
```

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

<!-- vars -->
[codecov-image]: https://img.shields.io/codecov/c/github/brunokrebs/mask-js/master.svg
[codecov-url]: https://codecov.io/github/brunokrebs/mask-js?branch=master
[license-image]: http://img.shields.io/npm/l/mask-js.svg
[license-url]: #license
[travis-image]: https://api.travis-ci.org/brunokrebs/mask-js.svg?branch=master
[travis-url]: https://travis-ci.org/brunokrebs/mask-js
[npm-image]: https://img.shields.io/npm/v/mask-js.svg
[npm-url]: https://npmjs.org/package/mask-js
