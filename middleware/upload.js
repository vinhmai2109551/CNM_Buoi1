const multer = require("multer");

const storage = multer.memoryStorage();

// Giới hạn dung lượng 5MB
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    // Có thể thêm kiểm tra loại file tại đây nếu muốn
    cb(null, true);
  },
}).single("image"); 
// ⚠️ "image" phải trùng với key bên Postman hoặc form HTML

module.exports = upload;