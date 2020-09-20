const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:admin@cluster0.otije.gcp.mongodb.net/r-clothing?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connects database successfully!");
  })
  .catch((error) => {
    console.log(error);
  });
