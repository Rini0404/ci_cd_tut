
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());


app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
})

app.listen(PORT, () => console.log("Server running on port " + PORT));
