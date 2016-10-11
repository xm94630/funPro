
//curry
/*import { curry } from 'lodash/fp';*/
/* 
*/

/*******************************
* 第一章 启程
********************************/

//console.log的快捷键，这里自己运用了下“...args”，真是利索
const l = (...args) => console.log.call(console,...args); 

let bee = null;
bee = ((bee) => {

  /* 
   * 研究案例1: curry
   * 这是Eric的关于函数式编程文章中所写的curry，因为用的是typeScript所以我也专门学习下
   * 一上来就是curry这么有挑战的练习
   * 而且用ts写居然这么精炼！！
   * 好在我对函数式编程还比较数据，所以马上就掌握了
   */
  bee.case01 = () => {
    const curry = fn => (...args) => fn.bind(null, ...args);
    const add = (a,b) => a+b;
    const add10 = curry(add)(10);
    l(add10(5));
  };

  /* 
   * 研究案例2: 函数式编程 普通
   * 目标：把用户名转为
   * convert user’s full names to URL slugs to give each of your users a profile page.
   * 常规实现
   */
  bee.case02 = () => {

    const toSlug = input => encodeURIComponent(
      input.split(' ')
        .map(str => str.toLowerCase())
        .join('-')
    );
    l(toSlug('Zhang San'));
  };


  /* 
   * 研究案例3: 函数式编程 curry实现
   */
  bee.case03 = () => {

    const curry = fn => (...args) => fn.bind(null, ...args);
    const map = curry((fn, arr) => arr.map(fn));
    const join = curry((str, arr) => arr.join(str));
    const toLowerCase = str => str.toLowerCase();
    const split = curry((splitOn, str) => str.split(splitOn));
    
    const toSlug = input => encodeURIComponent(
      //这个写法，看上去有很多的嵌套，而且有一点点难读
      join('-')(
        map(toLowerCase)(
          split(' ')(
            input
          )
        )
      )
    );
    console.log(toSlug('Li Si'));
  };


  /* 
   * 研究案例4: 函数式编程 
   * 使用 import，不过这里不支持es6的模块
   */
  bee.case04 = () => {

    /*import { curry, map, join, split } from 'lodash/fp';
    const toLowerCase = str => str.toLowerCase();
    const toSlug = input => encodeURIComponent(
      join('-')(
        map(toLowerCase)(
          split(' ')(
            input
          )
        )
      )
    );
    console.log(toSlug('Li Si'));*/
  };


  /* 
   * 研究案例5: 函数式编程 reduceRight 
   */
  bee.case05 = () => {

    /* 这里要认识reduceRight（reduce同理），是es5新增的内容
     * 第一个参数是回调函数，包含四个参数，分别是上次累积值，当前元素值，当前元素索引，数组
     * 第二个参数是累积的初始值
     * 例如：[1,2,3].reduce(function(a,b){return a+b},10) 结果为16
     *
     * 另外，值得注意的是，...fns
     * ...fns 和之前的 ...args 正好是相关类似的一对儿
     * 后者是离散参数集合，前者是参数数组
     */
    const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

    const curry = fn => (...args) => fn.bind(null, ...args);
    const map = curry((fn, arr) => arr.map(fn));
    const join = curry((str, arr) => arr.join(str));
    const toLowerCase = str => str.toLowerCase();
    const split = curry((splitOn, str) => str.split(splitOn));

    //使用compose把原来的嵌套的结构展平了
    const toSlug = compose(
      encodeURIComponent,
      join('-'),
      map(toLowerCase),
      split(' ')
    );

    console.log(toSlug('Sun Liu'));

  };


  /* 
   * 研究案例6: 函数式编程 pipe 
   * 这个和案例5的实现非常的相似，只是reduce的方向改成从左到右
   * 注意最后调用的时候，作为参数的几个方法也要改下顺序
   * 以为这四个函数参数，并不是可以随便交换顺序的那种：比如先要把字符串转成数组，才能有后续的数组操作，顺序错了就要报错
   */
  bee.case06 = () => {

    const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

    const curry = fn => (...args) => fn.bind(null, ...args);
    const map = curry((fn, arr) => arr.map(fn));
    const join = curry((str, arr) => arr.join(str));
    const toLowerCase = str => str.toLowerCase();
    const split = curry((splitOn, str) => str.split(splitOn));

    const newFunc = pipe(      
      split(' '),
      map(toLowerCase),      
      join('-'),      
      encodeURIComponent,
    );
    const result = newFunc('Wang Ba'); 
    l(result)
  };

  /* 
   * 研究案例7: 函数式编程 pipe 
   * 案例6的扩展（实现了的是不同的功能），这里没有使用curry，也是没有问题的
   */
  bee.case07 = () => {

    const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

    const fn1 = s => s.toLowerCase();
    const fn2 = s => s.split('').reverse().join('');
    const fn3 = s => s + '!'

    const newFunc = pipe(fn1, fn2, fn3);
    const result = newFunc('清晨我上马');
    l(result)
  };


  /* 
   * 研究案例8: 函数式编程 trace 【BOSS】
   * 这个是非常重要的操作，可以在任何一个流程中切入，进行追踪
   * 在 underscore 中也有类似的实现：_.chain 中的 tap(似乎这里的实现更加的先进，是链式调用[利用了返回对象])
   */
  bee.case08 = () => {

    const curry = fn => (...args) => fn.bind(null, ...args);
    //trace
    const trace = curry((label, x) => {
      console.log(`== ${ label }:  ${ x }`);
      return x;
    });

    const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

    const fn1 = s => s.toLowerCase();
    const fn2 = s => s.split('').reverse().join('');
    const fn3 = s => s + '!'

    const newFunc = pipe(
      trace('最初的进来值是'),
      fn1, 
      fn2, 
      trace('倒序之后'),
      fn3
    );
    const result = newFunc('清晨我上马');
    l(result)
  };







  return bee;
})(bee||{});

//bee.case08();







