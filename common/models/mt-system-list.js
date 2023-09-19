"use strict";
module.exports = function (Mtsystemlist) {
  Mtsystemlist.pingMe = (callback) => {
    Mtsystemlist.findOne({ where: { listType: "pingMe" } })
      .then((data) => {
        callback(null, data.value);
      })
      .catch((e) => {
        callback(e.message);
      });
  };
};
