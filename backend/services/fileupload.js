const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const S3 = new S3Client({
    region: "auto",
    endpoint: "https://786cf2a4bdbfa538c324ec2bd98343b8.r2.cloudflarestorage.com/",
    credentials: {
        accessKeyId: process.env.S3_ACCESS_ID,
        secretAccessKey: process.env.S3_ACCESS_KEY
    },
});

const fileFilter = (req, file, cb) => {
    console.log("filter")
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3: S3,
        bucket: "campusconnect",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: "TESTING_METADATA" });
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString());
        },
        contentType: multerS3.AUTO_CONTENT_TYPE, // specify content type as auto-detected
    }),
});

module.exports = upload;
module.exports = upload;
