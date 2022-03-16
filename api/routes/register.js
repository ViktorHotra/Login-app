const express = require('express');
const router = express.Router

const success = {success: true}

router.get(`/`, (req, res) => {
    res.json(success)
})

module.exports = router
