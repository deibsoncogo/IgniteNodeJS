const express = require("express");

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Hello word!" });
});

app.listen(3333, () => console.log("Server running on port 3333!"));
