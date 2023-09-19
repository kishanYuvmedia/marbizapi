'use strict';
const app = require('../../server/server');
const loopback = require('loopback');
const {sendEmail} = require('../../utils/methods');
const _ = require('lodash');
module.exports = function(MtHelpDesk) {
  var MtSystemList = loopback.getModel('MtSystemList');
  var MtProfile = loopback.getModel('MtProfile');
  var smsService = app.dataSources.smsService;
  let userBusinessProfile, systemRecord;
  MtHelpDesk.observe('after save', function(context, next) {
    if (!context.isNewInstance) return next();
    var helpDeskObject = context.instance;
    //DLT Message Not change Message Contect checked Message Send
    var dltTemplateId="1207162340054142363";
    var message=`Dear moverstrip user, There is an issue raised regarding with vehicle no. ${helpDeskObject.vehicleNumber} with title ${helpDeskObject.title}.\nProvided contact no is ${helpDeskObject.phoneNumber}`;
    let toPhoneNumber = app.get('debugPhoneNumber');
        // let toPhoneNumber='8860608123'
    smsService.sendSMS(toPhoneNumber, message,dltTemplateId, (err, response) => {
      if (err) throw err; // error making request
      if (response.error) {
        console.error('> response error: ' + response.error.stack);
      }
      console.log(`Send message:${message} to ${toPhoneNumber}`);
      console.log('SMS sent', response);
    });
    sendEmail('moverstrip@gmail.com', `Issue raised at help desk by ${helpDeskObject.phoneNumber}`, message);
    next();
  });
};
