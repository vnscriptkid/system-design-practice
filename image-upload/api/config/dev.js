// Don't be like me and commit this file!
// These keys have been disabled, but remain here for reference purposes.
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI:
    process.env.MONGO_URI ||
    "mongodb://mongo:27017/test?directConnection=true&authSource=admin&retryWrites=true&w=majority",
  // "mongodb://root:123456@localhost:27017/code4share?directConnection=true&authSource=admin&retryWrites=true&w=majority",
  cookieKey: "123123123",
  redisUrl: process.env.REDIS_URL || "redis://redis:6379",
  // "redis://127.0.0.1:6379",
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY_ID,
};
