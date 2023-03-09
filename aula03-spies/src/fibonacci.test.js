const Fibonacci = require('./fibonacci');
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');

//Fibonacci: o próximo valor corresponde à soma dos dois anteriores
(async () => {

  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    //generators retornam iterators,(.next)
    //existem 3 formas de ler os dados
    // usando as funcoes .next, for await e rest/spread


    for (const i of fibonacci.execute(3)) {}
    // nosso algoritmo vai sempre começar do zero
    const expectedCallCount = 4
    deepStrictEqual(spy.callCount, expectedCallCount)
  }

  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(5);
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1, next = 2
    // [3] input = 2, current = 2, next = 3
    // [4] input = 1, current = 3, next = 5
    // [5] input = 0 -> PARA 
    
    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3]
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    })

    deepStrictEqual(args, expectedParams);
    deepStrictEqual(results, expectedResult);
  }

})()