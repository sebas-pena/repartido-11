const express = require("express")
const app = express()
const path = require("path")

app.use(express.static(path.join(__dirname, '../public'), { extensions: ['html'] }));
app.use(express.json())
app.use("/api", require("./router"))

module.exports = app