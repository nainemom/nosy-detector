#!/usr/bin/env node
"use strict";

var _argv = _interopRequireDefault(require("./lib/argv.js"));

var _webcam = _interopRequireDefault(require("./lib/webcam.js"));

var _faceDetector = _interopRequireDefault(require("./lib/face-detector.js"));

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const maxPersons = _argv.default.is('--max') ? parseInt(_argv.default.get('--max')) : 1;
const command = _argv.default.get('--command') || 'echo "oo oo"';

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator(function* () {
    let facesLength = 0;
    let tryTimes = 0;

    const loop =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* () {
        const pic = yield _webcam.default.getPicture();
        const faces = yield _faceDetector.default.detect(pic);

        if (faces !== facesLength && tryTimes < 5) {
          tryTimes++;
        } else {
          facesLength = faces;
          tryTimes = 0;
        }

        if (facesLength > maxPersons) {
          (0, _child_process.exec)(command, (err, stdout, strerr) => {
            console.log(stdout);
          });
        }

        setTimeout(() => {
          setImmediate(loop);
        }, 300);
      });

      return function loop() {
        return _ref.apply(this, arguments);
      };
    }();

    loop();
  });
  return _main.apply(this, arguments);
}

main();