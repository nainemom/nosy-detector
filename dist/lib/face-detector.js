"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _opencv = _interopRequireDefault(require("opencv"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  detect: function (media) {
    return new Promise((resolve, reject) => {
      _opencv.default.readImage(media, function (err, im) {
        im.detectObject(_opencv.default.FACE_CASCADE, {}, (err, faces) => {
          if (err) {
            return reject(err);
          } // for (let i = 0; i < faces.length; i++) {
          //   var x = faces[i]
          //   im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
          // }
          // im.save('./out.jpg');


          resolve(faces.length);
        });
      });
    });
  }
};
exports.default = _default;