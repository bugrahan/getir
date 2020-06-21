const express = require('express')
const Record = require('../models/record')
const router = new express.Router()

router.get('/records', async (req, res) => {
    
    console.log('geldim')
    const records = await Record.find({}).then((records) => {
        console.log(records)
    }).catch((e) => {
        console.log(e)
    })
})

module.exports = router