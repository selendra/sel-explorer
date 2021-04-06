module.exports = {
  mongo: {
    url: "mongodb+srv://piset:piset123@cluster0.g2npi.mongodb.net/scan-app?retryWrites=true&w=majority",
    db: "scan-app" // api server will connect to
  },
  server: {
    port: 5000
  }
};
