const express = require('express')
const Record = require('../models/record')
const router = new express.Router()
const {check, validationResult} = require('express-validator')



router.post('/records', [
    check('startDate', 'startDate should be a date.').isDate(),
    check('endDate', 'endDate should be a date.').isDate(),
    check('maxCount', 'maxCount should be an integer').toInt().isInt(),
    check('minCount', 'minCount should be an integer').toInt().isInt()

], async (req, res) => {
    const errors = await validationResult(req);
    
    if (errors.array().length !== 0) {
        return res.status(400).send({
            code: 2,
            msg: errors.array()
        })
    }

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
                    $lt: new Date(req.body.endDate)
                },
                totalNumber: {
                    $gte: req.body.minCount,
                    $lte: req.body.maxCount
                }
            }
            
        }
    ]).then((recordsData) => {
        res.status(200).send({
            code: 0,
            msg: 'Success',
            records: recordsData
        })
    }).catch((e) => {
        res.status(500).send({
            code: 1,
            msg: 'Error: ' + e
        })
    })

})

module.exports = router