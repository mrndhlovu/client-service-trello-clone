import mongoose, { ConnectOptions } from "mongoose"

type IDatabaseUri = string

const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

const dbStart = (uri: IDatabaseUri) => {
  return mongoose.createConnection(uri, options)
}

const dbAuth = dbStart("mongodb://localhost:27017/tusks-ui-auth-dev")
const dbTusks = dbStart("mongodb://localhost:27017/tusks-ui-dev")

export { dbAuth, dbTusks }
