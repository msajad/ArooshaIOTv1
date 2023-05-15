const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.dbAddress)
    .then(() => console.log('Connected to database'))
    .catch(err => console.log('Error ' + err));
const deviceSchema = new mongoose.Schema({
    userId: String,
    deviceName: String,
    deviceModel: String,
    Topic: String,
    MacAddress : String
})
const DeviceDocument = mongoose.model('DeviceDocument', deviceSchema);




// const testDevice = new DeviceDocument({
//     userId: 'sajad',
//     deviceName: 'loostere Icerock',
//     deviceModel: 'ICEROCK0585',
//     Topic: 'ArooshaIOT/sajad/h1/r1',
//     MacAddress :'0253'
// });
//testDevice.save();


function getDeviceTopic(deviceId){
    var singleDeviceindb = DeviceDocument.findById(deviceId);
    return singleDeviceindb.Topic;
     
 }
  function getDeviceMac(deviceId){
     var singleDeviceindb = DeviceDocument.findById(deviceId);
     return singleDeviceindb.MacAddress;
      
  }

  module.exports.getDeviceMac = getDeviceMac;
  module.exports.getDeviceTopic = getDeviceTopic;
  module.exports.DeviceModel = mongoose.model('DeviceDocument',deviceSchema)