/*******************************
* 第二章 
********************************/

bee = ((bee) => {

  /* 
   * 研究案例1: 普通的函数组合
   */
  bee.caseB01 = () => {

    const add10 = value => value + 10;
    const mult5 = value => value * 5;
    const mult5AfterAdd10 = value => mult5(add10(value));
    l(mult5AfterAdd10(10));
  };

  /* 
   * 研究案例2: 普通的函数组合
   * 当add的参数变成两个时候
   * This isn’t point-free
   */
  bee.caseB02 = () => {

    const add = (x,y) => x + y;
    const mult5 = value => value * 5;
    const mult5AfterAdd10 = value => mult5(add(10,20));
    l(mult5AfterAdd10(10));
  };

  /* 
   * 研究案例3: curry
   * using the point-free version.
   * 要实现 point-free 的形式，解决办法是 curry 
   * A Curried Function is a function that only takes a single parameter at a time.
   * add提供一个参数，然后mult5AfterAdd10再提供一个参数
   * putting the parameters that were most likely to change（把最有可能改变的参数放在最后）
   */
  bee.caseB03 = () => {

    const add = x => y => x+y;
    const mult5 = value => value * 5;
    const compose = (f,g) => x => f(g(x));
    const mult5AfterAdd10 = compose(mult5,add(10));
    l(mult5AfterAdd10(10));
  };

  /* 
   * 研究案例4: map(有突变)
   * 避免这种做法，有突变（改变了原来的数据）
   */
  bee.caseB04 = () => {

    var things = [1, 2, 3, 4];
    for (var i = 0; i < things.length; ++i) {
        things[i] = things[i] * 10; // MUTATION ALERT !!!!
    }
    l(things); // [10, 20, 30, 40]
  };

  /* 
   * 研究案例5: map(无突变)
   * 这个是实现方式，可以抽象成map函数
   */
  bee.caseB05 = () => {

    var things = [1, 2, 3, 4];
    var newThings = [];
    for (var i = 0; i < things.length; ++i) {
        newThings[i] = things[i] * 10;
    }
    l(newThings); // [10, 20, 30, 40]
  };




  return bee;
})(bee||{});

//bee.caseB02();







