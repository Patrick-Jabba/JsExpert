// true + 2
// 3
// true - 2
// -1
// '21' + true
// '21true'
// '21' - true
// 20
// 99999999999999999
// 100000000000000000
// 0.1 + 0.2 === 0.3
// false
// 3 > 2
// true
//  2 > 1
// true
//  3 > 2 > 1
// false
//  '21' - - 1
// 22
//  '1' == 1
// true
//  '1' === 1
// false
//  3 > 2 >= 1
// true

// -------------------------
// console.assert(String(123) === '123', "explicit convertion to string")
// console.assert(123 + '' === '123', "implicit convertion to string")

// console.assert(('hello' || 123) === 'hello', "|| returns the first element when true")
// console.assert(('hello' && 123) === 123, "&& returns the last element when both are true")

// const r = 'hello' || 1
// console.log('r', r)
// if(r) {
//   console.log('ae')
// }

const item = { 
  name: 'Patrick Monteiro',
  age: 34,
  // string: primeiro se não for primitivo, chama o valueOf
  toString() {
    console.log("hey!")
    return `Name: ${this.name}, Age: ${this.age}`
  },
  // number: primeiro se não for primitivo, chama o toString
  valueOf() {
    return { hey: 'dude'}
    // return 007
  },
  // ele tem prioridade na parada!
  [Symbol.toPrimitive](coercionType) {
    // console.log('trying to convert to', coercionType)
    const types = {
      string: JSON.stringify(this),
      number: '0007'
    }
    return types[coercionType] || types.string
  }
}

// console.log('toString', String(item))

// vai retornar NaN pois o toString retornou a string
// console.log('valueOf', Number(item))

// depois de adicionar o toPrimitive
// console.log('String', String(item))
// console.log('Number', Number(item))
// //chama a conversão default
// console.log('Date', new Date(item))


console.assert(item + 0 === '{"name": Patrick Monteiro","age": 34}0')
// console.log('!!item is true?', !!item)
console.assert(!!item)

// console.log('string.concat', 'Ae'.concat(item))
console.log('Ae'.concat(item) === 'Ae{"name":"Patrick Monteiro","age":34}')

// console.log('implicit + explicit coercion (using ==)', item == String(item))
console.assert(item == String(item))

const item2 = { ...item, name: "Zézin", age:20 }
// console.log('New Object', String(item2))
console.assert(item2.name === 'Zézin' && item2.age === 20)
