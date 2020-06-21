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

module.exports = router