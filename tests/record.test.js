const request = require('supertest')
const app = require('../src/app')


test('Successful request', async () => {
    const response = await request(app).post('/records').send({
        "startDate": "2016-12-12",
        "endDate": "2016-12-13",
        "minCount": 153,
        "maxCount": 153
    }).expect(200)
    expect(response.body).toEqual({
        code: 0,
        msg: "Success",
        records: [
            {
                key: "vFxMiAmY",
                createdAt: "2016-12-12T16:53:02.506Z",
                totalNumber: 153
            }
        ]
    })
})


test('Missing parameters', async () => {
    const response = await request(app).post('/records').send({
    }).expect(400)

    expect(response.body.code).toEqual(2)
})

test('Missing parameter - maxCount', async () => {
    const response = await request(app).post('/records').send({
        "startDate": "2016-12-12",
        "endDate": "2016-12-13",
        "minCount": 153
    }).expect(400)

    expect(response.body.code).toEqual(2)
    expect(response.body.msg).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                msg: 'maxCount should be an integer.'
            })
        ])
    )
})

test('Missing parameter - minCount', async () => {
    const response = await request(app).post('/records').send({
        "startDate": "2016-12-12",
        "endDate": "2016-12-13",
        "maxCount": 153
    }).expect(400)

    expect(response.body.code).toEqual(2)
    expect(response.body.msg).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                msg: 'minCount should be an integer.'
            })
        ])
    )})

test('Missing parameter - startDate', async () => {
    const response = await request(app).post('/records').send({
        "endDate": "2016-12-13",
        "minCount": 153,
        "maxCount": 1530
    }).expect(400)

    expect(response.body.code).toEqual(2)
    expect(response.body.msg).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                msg: 'startDate should be a date.'
            })
        ])
    )
})

test('Missing parameter - endDate', async () => {
    const response = await request(app).post('/records').send({
        "startDate": "2016-12-12",
        "minCount": 153,
        "maxCount": 1530
    }).expect(400)

    expect(response.body.code).toEqual(2)
    expect(response.body.msg).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                msg: 'endDate should be a date.'
            })
        ])
    )})

test('Wrong type of parameters -', async () => {
    const response = await request(app).post('/records').send({
        "startDate": 155,
        "endDate": "2016-12-13",
        "minCount": "not a number",
        "maxCount": 1530
    }).expect(400)

    expect(response.body.code).toEqual(2)
})

test('Zero result', async () => {
    const response = await request(app).post('/records').send({
        "startDate": "2016-12-12",
        "endDate": "2016-12-12",
        "minCount": 0,
        "maxCount": 1000
    }).expect(200)

    expect(response.body.records).toEqual([])

})