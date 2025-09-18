import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 8080;

app.get("/run", async (req, res) => {
  try {
    const [aRes, bRes] = await Promise.all([
      axios.get("http://worker-a:8080/process"),
      axios.get("http://worker-b:8080/process"),
    ]);

    res.json({
      orchestrator: "ok",
      workerA: aRes.data,
      workerB: bRes.data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error communicating with workers");
  }
});

app.listen(port, () => console.log(`Orchestrator running on ${port}`));
