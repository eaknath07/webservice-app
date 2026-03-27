import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/log", (req, res) => {
  const randomValue = Math.floor(Math.random() * 1000);
  console.log("🎲 Random value:", randomValue);

  res.send("Generated random log");

  console.log("✅ Response sent for /log");
});

app.get("/user-vault/health", (req, res) => {
  res.json({
    success: true,
    env: "preview",
  });
});

app.listen(8080, () => {
  console.log("🚀 Server running on port 8080");
});
