const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')
const db=cloud.database()

cloud.init({
  env: "test-50v2n"
})

exports.main = async (event, context) => {
    console.log(event);
//   const fileStream = fs.createReadStream(path.join(__dirname, 'demo.jpg'))
//   return await cloud.uploadFile({
//     cloudPath: 'demo.jpg',
//     fileContent: fileStream,
//   })
}
