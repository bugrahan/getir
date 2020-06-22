const request = require('supertest')
const app = require('../src/app')


test('Should signup a new user', async (t) => {
    const response = await request(app).post('/records').send({
        "startDate": "2016-12-12",
        "endDate": "2016-12-13",
        "minCount": 153,
        "maxCount": 153
    }).expect(200)

   
})
