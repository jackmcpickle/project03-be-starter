const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  bufferCommands: false, // Disable mongoose buffering
  bufferMaxEntries: 0, // and MongoDB driver buffering
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
