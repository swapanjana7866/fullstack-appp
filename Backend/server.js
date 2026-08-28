require('dotenv').config()
const app = require("./src/app")
const connectTodb = require("./src/confing/database")
connectTodb()





app.listen(3000,()=>{
  console.log("server is running on the port no 3000")
})