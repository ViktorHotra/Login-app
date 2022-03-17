const express = require('express');
const router = express.Router();

router.get(`/`, (req, res) => {
    res.json(process.env.SUCCESS_RESPONSE)
})

module.exports = router;
