const sinon = require('sinon')
const assert = require('assert')

const Fibonacci = require('./fibonacci');
const fibonacci = new Fibonacci()

;(async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
      )
      
      // Numero de sequencias: 3
      // [0] input = 5, current = 0, next = 1 = resultado 0
      // [1] input = 4, current = 1, next = 1 = resultado 1
      // [2] input = 3, current = 1, next = 2 = resultado 1
      // [3] input = 2, current = 2, next = 3 = -> PARA
      
      // for (const sequencia of fibonacci.execute(3)){}
      const results = [...fibonacci.execute(3)]

      const expectedCallCount = 4
      assert.strictEqual(spy.callCount, expectedCallCount)
      const { args } = spy.getCall(2)
      const expectedParams = [1, 1, 2]
      assert.deepStrictEqual(args, expectedParams, "os arrays não são iguais")

      const expectedResults = [0, 1, 1]
      assert.deepStrictEqual(results, expectedResults)
  }
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
      )
      
      // Numero de sequencias: 5
      // [0] input = 5, current = 0, next = 1 = resultado 0
      // [1] input = 4, current = 1, next = 1 = resultado 1
      // [2] input = 3, current = 1, next = 2 = resultado 1
      // [3] input = 2, current = 2, next = 3 = resultado 2
      // [4] input = 1, current = 3, next = 5 = resultado 3
      // [5] input = 0 -> PARA 
      // for (const sequencia of fibonacci.execute(5)){}
      
      const results = [...fibonacci.execute(5)]
      
      const expectedCallCount = 6
      assert.strictEqual(spy.callCount, expectedCallCount)
      const { args } = spy.getCall(2)
      const expectedParams = [3, 1, 2]
      assert.deepStrictEqual(args, expectedParams, "os arrays não são iguais")

      const expectedResults = [0, 1, 1, 2, 3]
      assert.deepStrictEqual(results, expectedResults)
  }
  })()
  
  
  // const Fibonacci = require('./fibonacci');
// const sinon = require('sinon');
// const { deepStrictEqual } = require('assert');

// //Fibonacci: o próximo valor corresponde à soma dos dois anteriores
// (async () => {

//   {
//     const fibonacci = new Fibonacci()
//     const spy = sinon.spy(fibonacci, fibonacci.execute.name);
//     //generators retornam iterators,(.next)
//     //existem 3 formas de ler os dados
//     // usando as funcoes .next, for await e rest/spread


//     for await (const i of fibonacci.execute(3)) {}
//     // nosso algoritmo vai sempre começar do zero
//     const expectedCallCount = 4
//     deepStrictEqual(spy.callCount, expectedCallCount)
//   }
  
//   {
//     const fibonacci = new Fibonacci()
//     const spy = sinon.spy(fibonacci, fibonacci.execute.name);
//     const [...results] = fibonacci.execute(5);
//     // [0] input = 5, current = 0, next = 1
//     // [1] input = 4, current = 1, next = 1
//     // [2] input = 3, current = 1, next = 2
//     // [3] input = 2, current = 2, next = 3
//     // [4] input = 1, current = 3, next = 5
//     // [5] input = 0 -> PARA 
    
//     const { args } = spy.getCall(2);
//     const expectedResult = [0, 1, 1, 2, 3]
//     const expectedParams = Object.values({
//       input: 3,
//       current: 1,
//       next: 2
//     })
    
//     deepStrictEqual(args, expectedParams);
//     deepStrictEqual(results, expectedResult);
//   }

// })()