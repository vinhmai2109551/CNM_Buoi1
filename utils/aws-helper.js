const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const s3 = new AWS.S3();// Khởi tạo S3 service object
const dynamodb = new AWS.DynamoDB.DocumentClient(); // Khởi tạo DynamoDB service object

module.exports = {s3, dynamodb};
