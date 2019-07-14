"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeWebcam = _interopRequireDefault(require("node-webcam"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  getPicture() {
    return new Promise((resolve, reject) => {
      _nodeWebcam.default.capture('photo', {
        callbackReturn: 'buffer'
      }, function (err, data) {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
  }

};
exports.default = _default;