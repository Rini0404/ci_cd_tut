require('events').EventEmitter.defaultMaxListeners = 20; 

require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const googleAuth = require("./api/routes/google_auth")

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
})

app.use("/api/v1", googleAuth);

app.listen(PORT, () => console.log("Server running on port " + PORT));
