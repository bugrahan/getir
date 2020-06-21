const express = require('express')
const Record = require('../models/record')
const router = new express.Router()

router.get('/records', async (req, res) => {
    
    const records = await Record.find({}).then((records) => {
        res.status(200).send({records})
    }).catch((e) => {
        res.status(400).send()
    })
})

router.post('/records', async (req, res) => {

    const records = await Record.aggregate([
        {
            $project: {
                key: '$key',
                createdAt : '$createdAt',
                totalNumber: {
                    $sum: '$counts'
                },
                _id: 0
            }
        },
        {
            $match: {
                createdAt: {
                    $gte: new Date(req.body.startDate),
                    $lte: new Date(req.body.endDate)
                },
                totalNumber: {
                    $gte: req.body.minCount,
                    $lte: req.body.maxCount
                }
            }
            
        }
    ]).then((recordsData) => {
        console.log(req.body)
        console.log(recordsData)
        res.status(200).send({
            code: 1,
            msg: 'Success',
            records: recordsData
        })
    }).catch((e) => {
        console.log(e)
        res.status(400).send()
    })

})

module.exports = router