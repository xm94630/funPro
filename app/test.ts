//common
const toSlug = input => encodeURIComponent(
  input.split(' ')
    .map(str => str.toLowerCase())
    .join('-')
);

//curry
import { curry } from 'lodash/fp';
const map = curry((fn, arr) => arr.map(fn));
const join = curry((str, arr) => arr.join(str));
const toLowerCase = str => str.toLowerCase();
const split = curry((splitOn, str) => str.split(splitOn));
const toSlug = input => encodeURIComponent(
  join('-')(
    map(toLowerCase)(
      split(' ')(
        input
      )
    )
  )
);
console.log(toSlug('Zhang Shanfeng')); 
