//common
/*const toSlug = input => encodeURIComponent(
  input.split(' ')
    .map(str => str.toLowerCase())
    .join('-')
);*/
//curry
/*import { curry } from 'lodash/fp';*/
/*const curry = fn => (...args) => fn.bind(null, ...args);
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
*/

/*******************************
* 第一章 启程
********************************/

//console.log的快捷键，这里自己运用了下“...args”，真是利索
const l = (...args) => console.log.call(console,...args); 

const bee = ((bee) => {

  /* 
   * 研究案例1: curry
   * 这是Eric的关于函数式编程文章中所写的curry，因为用的是typeScript所以我也专门学习下
   * 一上来就是curry这么有挑战的练习
   * 而且用ts写居然这么精炼！！
   * 好在我对函数式编程还比较数据，所以马上就掌握了
   */
  bee.case01 = x => {
    const curry = fn => (...args) => fn.bind(null, ...args);
    const add = (a,b) => a+b;
    const add10 = curry(add)(10);
    l(add10(5));
  };


  return bee;
})(bee||{});

bee.case01();





