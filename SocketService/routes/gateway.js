const express = require('express');
const router = express.Router();

router.get('/sendMessage', (req, res) => {
    res.sendStatus(200);
});


module.exports = router;