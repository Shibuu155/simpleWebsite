const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_INFO, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connection Successfuly`);
  })
  .catch((e) => {
    console.log(`Error occur while connecting with database: ${e}`);
  });
