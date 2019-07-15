import cv from 'opencv'
import fs from 'fs'
import path from 'path'

export default {
  FACE_CASCADE: undefined,
  init: function () {
    this.FACE_CASCADE = path.join(__dirname, '../../cascade/haarcascade_frontalface_default.xml')
  },
  detect: function (media) {
    return new Promise((resolve, reject) => {
      cv.readImage(media, (err, im) => {
        if (err) {
          return reject(err)
        }
        im.detectObject(this.FACE_CASCADE, {}, (err, faces) => {
          if (err) {
            return reject(err)
          }
          resolve(faces.length)
        })
      })
    })
  }
}