const express = require('express');
const cron = require('node-cron');
const router = express.Router();
const _ = require('lodash');
const helper = require('../models/schedulerHelper');
const scheduleModel = require('../models/scheduleModel');

router.use(express.json());
/***********************************Create Scheduler */
router.post('/CreateScheduler', (req, res) => {
    scheduleModel.scheduleModel.CreateScheduler();
    res.sendStatus(200);
});

router.get('/mySchedules/:userId', (req, res) => {
    scheduleModel.readSchedules(req.params.userId).then((value) => {
        res.send(value);
    });
});
router.get('/deleteSchedule/:scheduleId', (req, res) => {
    scheduleModel.deleteSchedule(req.params.scheduleId).then((value) => {
        return value;
    });
});
/******************************End create scheduler */
router.post('/setActivation', (req, res) => {
    const { scheduleId, isScheduled } = req.body;//we have to get token and some validation here
    scheduleModel.setScheduleActivation(scheduleId, isScheduled).then((value) => {
        return value;
    });
});


/**********************************Start Schedule and Connect to mqtt Service */



cron.schedule('*/10 * * * * *', async () => {

    const schedules = await scheduleModel.scheduleModel.find({ isScheduled: true });
    schedules.forEach(element => {
        var scheTime = JSON.parse(element.scheduleTime);
        //Scheduler run once
        if (scheTime.isOnce) {// it is not repeater
            var now = new Date();
            if (now.getHours === scheTime.hour && now.getMinutes === scheTime.minute) {
                helper.createMqttMessageRequest(element._id);
            }
        }
        else {
            var now = new Date();
            if (now.getHours === scheTime.hour && now.getMinutes === scheTime.minute && scheTime.weekDays.includes(now.getDay()) || true) {
                helper.createMqttMessageRequest(element._id);
            }
        }
    })
}, { scheduled: true });



module.exports = router;