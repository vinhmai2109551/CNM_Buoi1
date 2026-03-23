require("dotenv").config();
const { s3 } = require("../utils/aws-helper");

// Tạo chuỗi random để đặt tên file
const randomString = (numberCharacter) => {
  return Math.random()
    .toString(36)
    .substring(2, numberCharacter + 2);
};

// Các loại file cho phép upload
const FILE_TYPE_MATCH = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "video/mp3",
  "video/mp4",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.rar",
  "application/zip",
];

const uploadFile = async (file) => {
  // 1️⃣ Kiểm tra file tồn tại
  if (!file) {
    throw new Error("File is required");
  }

  // 2️⃣ Kiểm tra loại file
  if (!FILE_TYPE_MATCH.includes(file.mimetype)) {
    throw new Error(`${file.originalname} is invalid!`);
  }

  // 3️⃣ Tạo tên file mới
  const filePath = `${randomString(4)}-${Date.now()}-${file.originalname}`;

  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: filePath,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(uploadParams).promise();

    console.log("Upload success:", data.Location);

    // Link trả về từ CloudFront
    return `${process.env.CLOUDFRONT_URL}${data.Key}`;

  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Upload file to S3 failed");
  }
};

module.exports = {
  uploadFile,
};