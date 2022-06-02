const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");

console.log(keys.accessKeyId, keys.secretAccessKey);

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
});

module.exports = (app) => {
  app.get("/api/upload", requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      "putObject",
      {
        Bucket: process.env.S3_BUCKET_NAME,
        ContentType: "image/jpeg",
        Key: key,
      },
      (err, url) => res.send({ key, url })
    );
  });
};
