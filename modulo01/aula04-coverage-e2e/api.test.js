const { describe, it, after, before } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

describe('API Suite test', () => {
  let app;
  before((done) => {
    app = require('./api')
    app.once('listening', done)
  })

  after((done) => app.close(done))
  describe('/contact', () => {
    it('should request the contact route and return HTTP Status 200', async () => {
      const response = await supertest(app)
        .get('/contact')
        .expect(200)
      assert.deepStrictEqual(response.text, 'contact us page')
    })
  })

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await supertest(app)
        .get('/invalid')
        .expect(404)
      assert.deepStrictEqual(response.text, 'Not Found!');
    })
  });

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'PatrickMonteiro', password: "123" })
        .expect(200)

      assert.deepStrictEqual(response.text, 'Logging has succeeded!');
    })
  });

  describe('/login', () => {
    it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'PatrickMonteir', password: "123" })
        .expect(401)
      assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, 'Logging has failed!');
    })
  });
})