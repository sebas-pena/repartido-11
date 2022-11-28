const app = require("./app")
const mongoose = require("mongoose")


mongoose.connect(process.env.MONGO_DB_URI || "mongodb://localhost:27017").then(() => {
  console.log("*** DATABASE CONNECTED ***")
  app.listen(8080, () => {
    console.log("SERVER LISTENING ON PORT 8080")
  })
})
