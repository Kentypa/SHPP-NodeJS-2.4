import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Items } from "../types/items.ts";
const app = express();
const port = 3005;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(bodyParser.json());

let items: Items = {
  items: [],
};

let currentLatestID = 1;

app.get("/api/v1/items", (req, res) => {
  res.json(items);
  req.on("error", () => {
    console.log("error");
  });
});

app.post("/api/v1/items", (req, res) => {
  console.log("Received request body:", req.body);
  items.items.push({
    id: ++currentLatestID,
    text: req.body.text,
    checked: false,
  });
  res.json({ id: currentLatestID });
});

app.put("/api/v1/items", (req, res) => {
  const item = items.items.find((value) => value.id === req.body.id);

  if (item) {
    item.text = req.body.text;
    item.checked = req.body.checked;
    res.json({ ok: true });
  } else {
    res.json({ ok: false });
  }
});

app.delete("/api/v1/items", (req, res) => {
  const index = items.items.findIndex((value) => value.id === req.body.id);

  if (index !== -1) {
    items.items.splice(index, 1);
    res.json({ ok: true });
  } else {
    res.status(404).json({ ok: false, error: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
