const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')

const mocks = {
  validCustomers: require('../mocks/valid-customers.json')
}
describe('API Suite test', () => {
  let app;
  before((done) => {
    app = require('../../src/service/api')
    app.once('listening', done)
  })

  after((done) => app.close(done))
  it('should return all the customers from the database', async () => {
    const response = await supertest(app)
      .get('/customers')
      .expect(200)
      assert.deepStrictEqual(response.text, 'customers get' )
  })
})