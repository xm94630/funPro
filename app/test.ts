/*******************************
* 第一章 启程
* 第二章 
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


  /* 
   * 研究案例9: 函数式编程 tap 【BOSS】
   */
  bee.case09 = () => {

    const curry = fn => (...args) => fn.bind(null, ...args);
    //tap
    const tap = curry((fn, x) => {
      fn(x);
      return x;
    });

    const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

    const fn1 = s => s.toLowerCase();
    const fn2 = s => s.split('').reverse().join('');
    const fn3 = s => s + '!'

    const newFunc = pipe(
      fn1, 
      fn2, 
      tap((x)=>l(`我可以随意地接入，做我想做的，比如获取当前的值----> ${x}`)),
      fn3
    );
    const result = newFunc('清晨我上马');
    l(result)
  };


  /********************************************
   * refactoring(重构)  
   ********************************************/
  /*
   * 研究案例10: 初始
   */
  bee.case10 = () => {

    function validateSsn(ssn) {
        if (/^\d{3}-\d{2}-\d{4}$/.exec(ssn))
            console.log('Valid SSN');
        else
            console.log('Invalid SSN');
    }
    function validatePhone(phone) {
        if (/^\(\d{3}\)\d{3}-\d{4}$/.exec(phone))
            console.log('Valid Phone Number');
        else
            console.log('Invalid Phone Number');
    }
    l('=>验证成功')
    validateSsn('123-45-6789');
    validatePhone('(111)222-3333');
    l('=>失败成功')
    validateSsn('123-123-123');
    validatePhone('123456-123');
  };

  /*
   * 研究案例11: 1级重构
   * 在学函数式编程之前，这样子的改进是我常用的
   * 注意：参数中没有传入函数
   */
  bee.case11 = () => {

    function validateValue(value, regex, type) {
        if (regex.exec(value))
            console.log('Valid ' + type);
        else
            console.log('Invalid ' + type);
    }
    l('=>验证成功')
    validateValue('123-45-6789',/^\d{3}-\d{2}-\d{4}$/,'Phone Number');
  };

  /*
   * 研究案例12: 初始
   * 这里和上面的略有不同
   */
  bee.case12 = () => {
    //注意这里parseAddress、parseFullName是随便定义的
    function parseAddress(address){return true;}
    function parseFullName(name){return true;}

    function validateAddress(address) {
        if (parseAddress(address))
            console.log('Valid Address');
        else
            console.log('Invalid Address');
    }
    function validateName(name) {
        if (parseFullName(name))
            console.log('Valid Name');
        else
            console.log('Invalid Name');
    }
  };

  /*
   * 研究案例13: 2级别重构（高阶函数）
   * 参数中有函数，有函数会更加的灵活和通用！这个在《函数式》书上也说了
   */
  bee.case13 = () => {

    //注意这里parseAddress、parseName就不定义了
    function parseAddress(){}
    function parseName(){}

    function validateValueWithFunc(value, parseFunc, type) {
        if (parseFunc(value))
            console.log('Invalid ' + type);
        else
            console.log('Valid ' + type);
    }
    //可以这样子使用  
    validateValueWithFunc('123-45-6789', /^\d{3}-\d{2}-\d{4}$/.exec, 'SSN');
    validateValueWithFunc('(123)456-7890', /^\(\d{3}\)\d{3}-\d{4}$/.exec, 'Phone');
    //这里没有定义parseAddress、parseName就不开了
    //validateValueWithFunc('123 Main St.', parseAddress, 'Address');
    //validateValueWithFunc('Joe Mama', parseName, 'Name');
  };

  /*
   * 研究案例14: 3级别重构（高阶函数）
   * 
   */
  bee.case14 = () => {

    function validateValueWithFunc(value, parseFunc, type) {
        if (parseFunc(value))
            console.log('Invalid ' + type);
        else
            console.log('Valid ' + type);
    }
    //主要优化了这个
    //虽然是小小的改变，却使用了返回函数的告诫函数，意义就不一样了
    function makeRegexParser(regex) {
        return regex.exec;
    }
    var parseSsn = makeRegexParser(/^\d{3}-\d{2}-\d{4}$/);
    var parsePhone = makeRegexParser(/^\(\d{3}\)\d{3}-\d{4}$/);
    validateValueWithFunc('123-45-6789', parseSsn, 'SSN');
    validateValueWithFunc('(123)456-7890', parsePhone, 'Phone');
  };


  return bee;
})(bee||{});

//bee.case13();







