import express from "express";
// import ws from 'web-server';
let app = express();
app.get("/", function (req, res) {
  res.send("Dockerize the node app");
});


app.get("/log", function (req, res) {
  const randomValue = Math.floor(Math.random() * 1000);
  console.log("🎲 Random value:", randomValue);
  res.send("Generated random log");
  console.log("✅ Response sent for /log");
});

app.get("/user-vault/health", function (req, res) {
  res.json({
    project1: true,
    app1: true,
    success: true,
    env: "preview",
  });
});
const server = app.listen(8080, function () {
  console.log("app listening on port 8080");
  console.log("entered into something");
});
