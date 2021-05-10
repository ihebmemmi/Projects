const mongoose = require("mongoose");
const URI =
  "mongodb+srv://DbPressing:DbPressing@pfecluster.at7ej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDb = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  console.log("db connected..");
};
module.exports = connectDb;
