import express from "express";
const app = express();
const port = process.env.PORT || 8080;

app.get("/process", (req, res) => {
  res.json({ worker: "A", result: "Processed successfully" });
});

app.listen(port, () => console.log(`Worker A running on ${port}`));