import express from "express";

const app = express();

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("hello world")
);

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
