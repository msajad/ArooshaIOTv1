const express = require('express');
const router = express.Router();

router.get('/getMyScheduleList', (req, res) => {
    res.sendStatus(200);
});
router.get('/CreateSchedule', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;