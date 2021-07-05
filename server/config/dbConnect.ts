import mongoose from "mongoose"

const connectMongodb = async () => {
  return await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err, "Error connecting to DB"))
}

export { connectMongodb }
